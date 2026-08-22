import { getKnex } from "@/lib/db";

export interface BrandItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  logoText: string;
  ytUrl?: string;
  logoUrl?: string;
  hidden?: boolean;
  displayOrder?: number;
}

export async function createBrandItemsTable() {
  const k = getKnex();
  if (!(await k.schema.hasTable("brand_items"))) {
    await k.schema.createTable("brand_items", (t) => {
      t.string("id", 64).primary();
      t.string("name", 128).notNullable();
      t.string("category", 64).notNullable();
      t.text("tagline");
      t.string("logo_text", 128);
      t.string("yt_url", 255);
      t.string("logo_url", 255);
      t.boolean("is_hidden").defaultTo(false);
      t.integer("display_order").defaultTo(0);
      t.timestamp("updated_at").defaultTo(k.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
  } else {
    try {
      if (!(await k.schema.hasColumn("brand_items", "is_hidden"))) {
        await k.schema.alterTable("brand_items", (t) => {
          t.boolean("is_hidden").defaultTo(false);
        });
      }
    } catch {
      // Ignore alter errors if already modified
    }
  }
}

export async function getBrandItems(): Promise<BrandItem[]> {
  const k = getKnex();
  const rows = await k("brand_items").orderBy("display_order", "asc");

  return rows.map((r: any) => ({
    id: r.id,
    name: r.name,
    category: r.category,
    tagline: r.tagline,
    logoText: r.logo_text,
    ytUrl: r.yt_url,
    logoUrl: r.logo_url,
    hidden: Boolean(r.is_hidden || r.hidden),
    displayOrder: r.display_order,
  }));
}

export async function syncBrandItems(items: any[]) {
  const k = getKnex();
  await k("brand_items").delete();

  if (items && Array.isArray(items) && items.length > 0) {
    const rows = items.map((item: any, i: number) => ({
      id: String(item.id || Date.now() + i),
      name: item.name || "Unnamed Brand",
      category: item.category || "Sponsor",
      tagline: item.tagline || "",
      logo_text: item.logoText || item.name || "",
      yt_url: item.ytUrl || "",
      logo_url: item.logoUrl || "",
      is_hidden: Boolean(item.hidden || item.isHidden),
      display_order: i,
    }));
    await k("brand_items").insert(rows);
  }
}
