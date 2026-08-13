import { getKnex } from "@/lib/db";

export interface SponsorCaseStudy {
  id: string;
  partnerName: string;
  campaignType: string;
  quote: string;
  quoteFont?: string;
  stat1Label: string;
  stat1Value: string;
  stat2Label: string;
  stat2Value: string;
  description?: string;
  deliverables?: string;
  ytUrl?: string;
  roiBreakdown?: string;
  publishDate?: string;
  logoUrl?: string;
  websiteUrl?: string;
}

/**
 * RAW SQL STATEMENTS
 */
export const RAW_SQL = {
  CREATE_TABLE: `
    CREATE TABLE IF NOT EXISTS sponsor_case_studies (
      id VARCHAR(64) PRIMARY KEY,
      partner_name VARCHAR(128) NOT NULL,
      campaign_type VARCHAR(128) NOT NULL,
      quote TEXT NOT NULL,
      quote_font VARCHAR(64),
      stat1_label VARCHAR(64) NOT NULL,
      stat1_value VARCHAR(64) NOT NULL,
      stat2_label VARCHAR(64) NOT NULL,
      stat2_value VARCHAR(64) NOT NULL,
      description TEXT,
      deliverables TEXT,
      yt_url VARCHAR(255),
      roi_breakdown TEXT,
      publish_date VARCHAR(64),
      logo_url VARCHAR(255),
      website_url VARCHAR(255),
      display_order INT DEFAULT 0,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `,
  SELECT_ALL: `SELECT * FROM sponsor_case_studies ORDER BY display_order ASC;`,
  TRUNCATE: `TRUNCATE TABLE sponsor_case_studies;`,
  INSERT: `
    INSERT INTO sponsor_case_studies
      (id, partner_name, campaign_type, quote, quote_font, stat1_label, stat1_value, stat2_label, stat2_value, description, deliverables, yt_url, roi_breakdown, publish_date, logo_url, website_url, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `,
};

export async function createSponsorCaseStudiesTable() {
  const k = getKnex();
  if (!(await k.schema.hasTable("sponsor_case_studies"))) {
    await k.schema.createTable("sponsor_case_studies", (t) => {
      t.string("id", 64).primary();
      t.string("partner_name", 128).notNullable();
      t.string("campaign_type", 128).notNullable();
      t.text("quote").notNullable();
      t.string("quote_font", 64);
      t.string("stat1_label", 64).notNullable();
      t.string("stat1_value", 64).notNullable();
      t.string("stat2_label", 64).notNullable();
      t.string("stat2_value", 64).notNullable();
      t.text("description");
      t.text("deliverables");
      t.string("yt_url", 255);
      t.text("roi_breakdown");
      t.string("publish_date", 64);
      t.string("logo_url", 255);
      t.string("website_url", 255);
      t.integer("display_order").defaultTo(0);
      t.timestamp("updated_at").defaultTo(k.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
  } else {
    // Ensure column types and new columns exist
    try {
      if (!(await k.schema.hasColumn("sponsor_case_studies", "website_url"))) {
        await k.schema.alterTable("sponsor_case_studies", (t) => {
          t.string("website_url", 255);
        });
      }
      await k.schema.alterTable("sponsor_case_studies", (t) => {
        t.text("roi_breakdown").alter();
        t.string("campaign_type", 128).alter();
      });
    } catch {
      // Ignore alter errors if already modified
    }
  }
}

export async function getSponsorCaseStudies(): Promise<SponsorCaseStudy[]> {
  const k = getKnex();
  const rows = await k("sponsor_case_studies").orderBy("display_order", "asc");

  return rows.map((r: any) => ({
    id: r.id,
    partnerName: r.partner_name,
    campaignType: r.campaign_type,
    quote: r.quote,
    quoteFont: r.quote_font,
    stat1Label: r.stat1_label,
    stat1Value: r.stat1_value,
    stat2Label: r.stat2_label,
    stat2Value: r.stat2_value,
    description: r.description,
    deliverables: r.deliverables,
    ytUrl: r.yt_url,
    roiBreakdown: r.roi_breakdown,
    publishDate: r.publish_date,
    logoUrl: r.logo_url || "",
    websiteUrl: r.website_url,
  }));
}

export async function syncSponsorCaseStudies(items: any[]) {
  const k = getKnex();
  await k("sponsor_case_studies").truncate();

  if (items && Array.isArray(items) && items.length > 0) {
    const rows = items.map((item: any, i: number) => ({
      id: String(item.id || `cs-${i + 1}`),
      partner_name: item.partnerName,
      campaign_type: item.campaignType,
      quote: item.quote,
      quote_font: item.quoteFont || "Caveat",
      stat1_label: item.stat1Label,
      stat1_value: item.stat1Value,
      stat2_label: item.stat2Label,
      stat2_value: item.stat2Value,
      description: item.description || "",
      deliverables: item.deliverables || "",
      yt_url: item.ytUrl || "",
      roi_breakdown: item.roiBreakdown || "",
      publish_date: item.publishDate || "",
      logo_url: item.logoUrl || "",
      website_url: item.websiteUrl || "",
      display_order: i,
    }));

    await k("sponsor_case_studies").insert(rows);
  }
}
