import { getKnex } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

export interface DbCountry {
  code: string;
  name: string;
  flag_emoji?: string;
  display_order?: number;
}

export async function createCountriesTable() {
  const k = getKnex();
  const exists = await k.schema.hasTable("countries");
  if (!exists) {
    await k.schema.createTable("countries", (table) => {
      table.string("code", 10).primary();
      table.string("name", 100).notNullable().index();
      table.string("flag_emoji", 10).nullable();
      table.integer("display_order").defaultTo(0);
      table.timestamp("created_at").defaultTo(k.fn.now());
    });
  }
}

export async function seedCountriesTable(): Promise<void> {
  const k = getKnex();
  try {
    const countRes = await k("countries").count("code as cnt").first();
    const count = Number(countRes?.cnt || 0);

    if (count < 200) {
      const filePath = path.join(process.cwd(), "src", "data", "countries.json");
      const jsonStr = await fs.readFile(filePath, "utf8");
      const countries: DbCountry[] = JSON.parse(jsonStr);

      for (let i = 0; i < countries.length; i++) {
        const c = countries[i];
        await k("countries")
          .insert({
            code: c.code,
            name: c.name,
            flag_emoji: c.flag_emoji || "",
            display_order: i,
          })
          .onConflict("code")
          .merge();
      }
    }
  } catch (err) {
    console.error("Error seeding countries table:", err);
  }
}

export async function getCountriesFromDb(): Promise<{ code: string; name: string; flag_emoji?: string }[]> {
  try {
    const k = getKnex();
    const rows = await k("countries")
      .select("code", "name", "flag_emoji")
      .orderBy("name", "asc");

    if (rows && rows.length > 0) {
      return rows;
    }
  } catch {
    // Fall back to JSON file below
  }

  try {
    const filePath = path.join(process.cwd(), "src", "data", "countries.json");
    const jsonStr = await fs.readFile(filePath, "utf8");
    return JSON.parse(jsonStr);
  } catch {
    return [];
  }
}
