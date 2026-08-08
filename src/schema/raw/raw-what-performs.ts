import { getKnex } from "@/lib/db";

export async function getRawWhatPerforms() {
  const k = getKnex();
  const res: any = await k.raw("SELECT * FROM what_performs_cards ORDER BY display_order ASC");
  const rows = res[0] || [];

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
  }));
}

export async function syncRawWhatPerforms(items: any[]) {
  const k = getKnex();
  await k.raw("TRUNCATE TABLE what_performs_cards;");

  if (items && Array.isArray(items) && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      await k.raw(
        `INSERT INTO what_performs_cards
          (id, title, views, clicks, type, thumb, thumbnail, yt_url, highlight, display_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          String(item.id || `wp-${i + 1}`),
          item.title || "Campaign",
          item.views || "10k+",
          item.clicks || "1k+",
          item.type || item.category || "Integration",
          item.thumb || "⚡",
          item.thumbnail || "",
          item.ytUrl || item.yt_url || "",
          item.highlight || "",
          i,
        ]
      );
    }
  }
}
