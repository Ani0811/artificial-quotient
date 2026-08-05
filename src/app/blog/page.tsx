"use client";

import Link from "next/link";
import { Clock, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface BlogPost {
  id: string | number;
  slug?: string;
  title: string;
  excerpt: string;
  category?: string;
  cover?: string;
  ytUrl?: string;
  author?: string;
  date?: string;
  readTime?: string;
}

export default function BlogHub() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/data");
        if (res.ok) {
          const data = await res.json();
          if (data.blog) {
            setPosts(data.blog.map((b: BlogPost, idx: number) => ({
              ...b,
              slug: b.slug || `post-${b.id || idx + 1}`,
              date: b.date || "Recent",
              readTime: b.readTime || "5 min read"
            })));
          }
        }
      } catch {
        // Ignore error
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-16 px-4 bg-brand-bg dark:bg-zinc-950 min-h-screen transition-colors">
        <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
          <div className="h-10 bg-emerald-500/10 rounded-lg w-64 mx-auto"></div>
          <div className="h-6 bg-emerald-500/10 rounded-lg w-96 mx-auto"></div>
          <div className="space-y-6">
            <div className="h-32 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl"></div>
            <div className="h-32 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-16 px-4 bg-brand-bg dark:bg-zinc-950 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-text dark:text-white mb-4">
            Script-to-Blog Hub
          </h1>
          <p className="text-brand-muted dark:text-zinc-400 font-medium text-lg">
            Deep-dives, tutorials, and full video scripts converted into readable guides.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl shadow-sm text-brand-muted dark:text-zinc-400">
            No articles found. Check back soon!
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {posts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug || `post-${post.id}`}`} className="group bg-brand-card dark:bg-zinc-900 rounded-xl border border-brand-border dark:border-zinc-800 p-6 shadow-sm hover:shadow-md hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-64 aspect-video bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-4xl group-hover:scale-[1.02] transition-transform overflow-hidden relative border border-brand-border/30">
                    {post.cover ? (
                      <img src={post.cover} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <span>📝</span>
                    )}
                    <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition-colors"></div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between h-full">
                    <div>
                      <h2 className="font-heading font-bold text-2xl mb-2 text-brand-text dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-brand-muted dark:text-zinc-400 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-semibold text-brand-muted dark:text-zinc-400">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-500" /> {post.readTime}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      {post.category && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-500 font-bold">{post.category}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
