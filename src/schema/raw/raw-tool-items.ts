import { getKnex } from "@/lib/db";

export async function getRawToolItems() {
  const k = getKnex();
  const res: any = await k.raw("SELECT * FROM tool_items ORDER BY display_order ASC");
  const rows = res[0] || [];

  return rows.map((r: any) => ({
    id: r.id,
    name: r.name,
    logo: r.logo,
    category: r.category,
    discount: r.discount,
    desc: r.description,
    tryUrl: r.try_url,
  }));
}

export async function syncRawToolItems(items: any[]) {
  const k = getKnex();
  await k.raw("TRUNCATE TABLE tool_items;");

  if (items && Array.isArray(items) && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      await k.raw(
        `INSERT INTO tool_items
          (id, name, logo, category, discount, description, try_url, display_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          String(item.id || `tool-${i + 1}`),
          item.name,
          item.logo || "",
          item.category,
          item.discount || "",
          item.desc || item.description || "",
          item.tryUrl || "",
          i,
        ]
      );
    }
  }
}
