import { getKnex } from "@/lib/db";

export interface PerformItem {
  id: string;
  title: string;
  views: string;
  clicks: string;
  type: string;
  thumb?: string;
  thumbnail?: string;
  ytUrl?: string;
  highlight?: string;
  hidden?: boolean;
}

export async function createWhatPerformsTable() {
  const k = getKnex();
  if (!(await k.schema.hasTable("what_performs_cards"))) {
    await k.schema.createTable("what_performs_cards", (t) => {
      t.string("id", 64).primary();
      t.string("title", 255).notNullable();
      t.string("views", 64).notNullable();
      t.string("clicks", 64).notNullable();
      t.string("type", 64).notNullable();
      t.string("thumb", 32);
      t.string("thumbnail", 255);
      t.string("yt_url", 255);
      t.string("highlight", 64);
      t.boolean("is_hidden").defaultTo(false);
      t.integer("display_order").defaultTo(0);
      t.timestamp("updated_at").defaultTo(k.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
  } else {
    try {
      if (!(await k.schema.hasColumn("what_performs_cards", "is_hidden"))) {
        await k.schema.alterTable("what_performs_cards", (t) => {
          t.boolean("is_hidden").defaultTo(false);
        });
      }
    } catch {
      // Ignore alter errors if already modified
    }
  }
}

export async function getWhatPerforms(): Promise<PerformItem[]> {
  const k = getKnex();
  const rows = await k("what_performs_cards").orderBy("display_order", "asc");

  return rows.map((r: any) => ({
    id: r.id,
    title: r.title,
    views: r.views || "",
    clicks: r.clicks || "",
    type: r.type || "Integration",
    thumb: r.thumb || "⚡",
    thumbnail: r.thumbnail || "",
    ytUrl: r.yt_url || "",
    highlight: r.highlight || "",
    hidden: Boolean(r.is_hidden || r.hidden),
  }));
}

export async function syncWhatPerforms(items: any[]) {
  const k = getKnex();
  await k("what_performs_cards").delete();

  if (items && Array.isArray(items) && items.length > 0) {
    const rows = items.map((item: any, i: number) => ({
      id: String(item.id || `wp-${i + 1}`),
      title: item.title || "Campaign",
      views: item.views || "10k+",
      clicks: item.clicks || "1k+",
      type: item.type || item.category || "Integration",
      thumb: item.thumb || "⚡",
      thumbnail: item.thumbnail || "",
      yt_url: item.ytUrl || item.yt_url || "",
      highlight: item.highlight || "",
      is_hidden: Boolean(item.hidden || item.isHidden),
      display_order: i,
    }));
    await k("what_performs_cards").insert(rows);
  }
}
