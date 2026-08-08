import { getKnex } from "@/lib/db";

export async function getRawBlogArticles() {
  const k = getKnex();
  const res: any = await k.raw("SELECT * FROM blog_articles ORDER BY display_order ASC");
  const rows = res[0] || [];

  return rows.map((r: any) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    excerpt: r.excerpt,
    ytUrl: r.yt_url,
    author: r.author,
    cover: r.cover,
    content: r.content,
  }));
}

export async function syncRawBlogArticles(items: any[]) {
  const k = getKnex();
  await k.raw("TRUNCATE TABLE blog_articles;");

  if (items && Array.isArray(items) && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      await k.raw(
        `INSERT INTO blog_articles
          (id, title, category, excerpt, yt_url, author, cover, content, display_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          String(item.id || `blog-${i + 1}`),
          item.title,
          item.category,
          item.excerpt,
          item.ytUrl || "",
          item.author || "Artificial Quotient",
          item.cover || "",
          item.content || "",
          i,
        ]
      );
    }
  }
}
