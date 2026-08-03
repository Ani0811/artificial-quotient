import Link from "next/link";
import { Clock, PlayCircle } from "lucide-react";

export default function BlogHub() {
  const posts = [
    {
      id: 1,
      slug: "how-to-automate-your-youtube-shorts",
      title: "How to Automate Your YouTube Shorts with Make.com & Revid.AI",
      excerpt: "A complete step-by-step breakdown of how we generate, edit, and publish 30 shorts a month on autopilot.",
      date: "Oct 24, 2023",
      readTime: "8 min read"
    },
    {
      id: 2,
      slug: "building-an-ai-sales-agent",
      title: "Building an AI Sales Agent that Books Meetings (Full Tutorial)",
      excerpt: "Learn how to connect Voiceflow with your calendar to qualify leads and book meetings 24/7.",
      date: "Oct 18, 2023",
      readTime: "12 min read"
    }
  ];

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

        <div className="flex flex-col gap-8">
          {posts.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-brand-card dark:bg-zinc-900 rounded-xl border border-brand-border dark:border-zinc-800 p-6 shadow-sm hover:shadow-md hover:border-brand-blue/50 dark:hover:border-brand-blue/50 transition-all">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-64 aspect-video bg-gray-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-4xl group-hover:scale-[1.02] transition-transform overflow-hidden relative">
                  📝
                  <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition-colors"></div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="font-heading font-bold text-2xl mb-2 text-brand-text dark:text-white group-hover:text-brand-blue dark:group-hover:text-brand-blue transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-brand-muted dark:text-zinc-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm font-medium text-brand-muted dark:text-zinc-500 mt-auto pt-4 border-t border-brand-border/50 dark:border-zinc-800">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                    <span className="ml-auto flex items-center gap-1 text-brand-blue"><PlayCircle className="w-4 h-4"/> Video Included</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
