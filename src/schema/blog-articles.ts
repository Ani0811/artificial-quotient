import { getKnex } from "@/lib/db";

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  ytUrl?: string;
  author?: string;
  cover?: string;
  content?: string;
}

export async function createBlogArticlesTable() {
  const k = getKnex();
  if (!(await k.schema.hasTable("blog_articles"))) {
    await k.schema.createTable("blog_articles", (t) => {
      t.string("id", 64).primary();
      t.string("title", 255).notNullable();
      t.string("category", 64).notNullable();
      t.text("excerpt").notNullable();
      t.string("yt_url", 255);
      t.string("author", 128);
      t.string("cover", 255);
      t.text("content");
      t.integer("display_order").defaultTo(0);
      t.timestamp("updated_at").defaultTo(k.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
  }
}

export async function getBlogArticles(): Promise<BlogArticle[]> {
  const k = getKnex();
  const rows = await k("blog_articles").orderBy("display_order", "asc");

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

export async function syncBlogArticles(items: any[]) {
  const k = getKnex();
  await k("blog_articles").truncate();

  if (items && Array.isArray(items) && items.length > 0) {
    const rows = items.map((item: any, i: number) => ({
      id: String(item.id || `blog-${i + 1}`),
      title: item.title,
      category: item.category,
      excerpt: item.excerpt,
      yt_url: item.ytUrl || "",
      author: item.author || "Artificial Quotient",
      cover: item.cover || "",
      content: item.content || "",
      display_order: i,
    }));
    await k("blog_articles").insert(rows);
  }
}
