import mysql from "mysql2/promise";
import knex, { Knex } from "knex";
import fs from "fs/promises";
import path from "path";

// MySQL Connection Pool Configuration
const rawHost = process.env.MYSQL_HOST || "127.0.0.1";
const host = rawHost === "localhost" ? "127.0.0.1" : rawHost;

const poolConfig = {
  host: host,
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "AQ_Dashboard",
};

let db: Knex | null = null;
let isInitialized = false;

export function getKnex(): Knex {
  if (!db) {
    db = knex({
      client: "mysql2",
      connection: {
        host: poolConfig.host,
        port: poolConfig.port,
        user: poolConfig.user,
        password: poolConfig.password,
        database: poolConfig.database,
        charset: "utf8mb4",
      },
      pool: { 
        min: 0, 
        max: 5,
        acquireTimeoutMillis: 3000,
        createTimeoutMillis: 3000,
        idleTimeoutMillis: 10000,
      },
    });
  }
  return db;
}

export async function checkDatabaseConnection(): Promise<{ connected: boolean; message: string }> {
  try {
    const k = getKnex();
    await k.raw("SELECT 1");
    return { connected: true, message: `Connected to MySQL (${poolConfig.database})` };
  } catch (err: any) {
    return {
      connected: false,
      message: `MySQL Error (${err.code || err.message}): Ensure database '${poolConfig.database}' exists.`,
    };
  }
}

export async function ensureDatabaseExists(): Promise<void> {
  try {
    const rootConn = await mysql.createConnection({
      host: poolConfig.host,
      port: poolConfig.port,
      user: poolConfig.user,
      password: poolConfig.password,
      connectTimeout: 2000,
    }).catch(() => null);

    if (!rootConn) return;

    await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${poolConfig.database}\``).catch(() => {});
    await rootConn.end().catch(() => {});
  } catch {
    // Ignore error
  }
}

import { 
  createAdminUsersTable, 
  createSiteConfigTable, 
  createSponsorCaseStudiesTable, 
  createWhatPerformsTable, 
  createToolItemsTable,
  createBrandItemsTable,
  createCountriesTable,
  seedCountriesTable,
  syncWhatPerforms,
  syncSponsorCaseStudies,
  syncToolItems,
  syncBrandItems,
  upsertSiteConfig
} from "@/schema";

import defaultSiteData from "@/data/site-data.json";
import defaultAdminUsers from "@/data/admin-users.json";

export async function initDatabase(): Promise<boolean> {
  if (isInitialized) return true;

  try {
    await ensureDatabaseExists();
    const k = getKnex();

    // 1. Create tables if not exist using Knex Schema Builder from @/schema modules
    await createAdminUsersTable();
    await createSiteConfigTable();
    await createSponsorCaseStudiesTable();
    await createWhatPerformsTable();
    await createToolItemsTable();
    await createBrandItemsTable();
    await createCountriesTable();

    // 2. Always sync/seed admin users, countries, and site data from JSON if needed
    await seedAdminUsersFromJSON();
    await seedCountriesTable();

    const configCount = await k("site_config").count("id as cnt").first();
    if (Number(configCount?.cnt || 0) === 0) {
      await seedSiteDataFromJSON();
    } else {
      // Check if what_performs_cards table has outdated placeholder entries (e.g. Revid.AI, Flashloop AI, Marky Agent)
      try {
        const currentWp = await k("what_performs_cards").select("id", "title");
        const hasOutdatedData = currentWp.some(
          (r: any) => r.title === "Revid.AI" || r.title === "Flashloop AI" || r.title === "Marky Agent"
        );
        if (hasOutdatedData || currentWp.length === 0) {
          await syncWhatPerforms(defaultSiteData.whatPerforms);
        }
      } catch (err) {
        console.warn("Could not check/sync what_performs_cards:", err);
      }
    }

    isInitialized = true;
    return true;
  } catch (err) {
    console.error("Database initialization warning:", err);
    return false;
  }
}

export async function seedAdminUsersFromJSON(): Promise<void> {
  try {
    const k = getKnex();
    let users = defaultAdminUsers;

    try {
      const filePath = path.join(process.cwd(), "src", "data", "admin-users.json");
      const jsonStr = await fs.readFile(filePath, "utf8");
      users = JSON.parse(jsonStr);
    } catch {
      // Use imported defaultAdminUsers
    }

    for (const u of users) {
      await k("admin_users")
        .insert({
          id: u.id,
          name: u.name ? u.name.trim() : "",
          email: u.email ? u.email.trim() : "",
          password: u.password,
          role: u.role,
          permissions_json: JSON.stringify(u.permissions || []),
          recovery_key: u.recoveryKey,
          status: u.status || "Active",
          last_login: u.lastLogin ? new Date(u.lastLogin) : new Date(),
        })
        .onConflict("id")
        .merge();
    }
  } catch (e) {
    console.error("Error seeding admin users:", e);
  }
}

export async function seedSiteDataFromJSON(): Promise<void> {
  try {
    let data: any = defaultSiteData;
    try {
      const filePath = path.join(process.cwd(), "src", "data", "site-data.json");
      const jsonStr = await fs.readFile(filePath, "utf8");
      data = JSON.parse(jsonStr);
    } catch {
      // Use imported defaultSiteData
    }

    await upsertSiteConfig(data);
    await syncSponsorCaseStudies(data.sponsorResults);
    await syncWhatPerforms(data.whatPerforms);
    await syncToolItems(data.tools);
    if (data.brandItems) await syncBrandItems(data.brandItems);
  } catch (e) {
    console.error("Error seeding site data:", e);
  }
}
