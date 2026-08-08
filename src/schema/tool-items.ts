import { getKnex } from "@/lib/db";

export interface ToolItem {
  id: string;
  name: string;
  logo?: string;
  category: string;
  discount?: string;
  desc?: string;
  tryUrl?: string;
}

export async function createToolItemsTable() {
  const k = getKnex();
  if (!(await k.schema.hasTable("tool_items"))) {
    await k.schema.createTable("tool_items", (t) => {
      t.string("id", 64).primary();
      t.string("name", 128).notNullable();
      t.string("logo", 255);
      t.string("category", 64).notNullable();
      t.string("discount", 128);
      t.text("description");
      t.string("try_url", 255);
      t.integer("display_order").defaultTo(0);
      t.timestamp("updated_at").defaultTo(k.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
  }
}

export async function getToolItems(): Promise<ToolItem[]> {
  const k = getKnex();
  const rows = await k("tool_items").orderBy("display_order", "asc");

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

export async function syncToolItems(items: any[]) {
  const k = getKnex();
  await k("tool_items").truncate();

  if (items && Array.isArray(items) && items.length > 0) {
    const rows = items.map((item: any, i: number) => ({
      id: String(item.id || `tool-${i + 1}`),
      name: item.name,
      logo: item.logo || "",
      category: item.category,
      discount: item.discount || "",
      description: item.desc || item.description || "",
      try_url: item.tryUrl || "",
      display_order: i,
    }));
    await k("tool_items").insert(rows);
  }
}
