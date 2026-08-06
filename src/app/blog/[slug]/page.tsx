import { CheckCircle2, Copy, ArrowLeft, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function BlogPost() {
  return (
    <article className="w-full py-12 px-4 bg-white dark:bg-zinc-950 min-h-screen transition-colors">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Hub
        </Link>
        
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-brand-blue/10 text-brand-blue text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Tutorial
            </span>
            <span className="text-sm font-medium text-brand-muted dark:text-zinc-400">Oct 24, 2023</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-brand-text dark:text-white mb-6 leading-tight">
            How to Automate Your YouTube Shorts with Make.com & Revid.AI
          </h1>
          
          <div className="flex items-center gap-4 border-b border-brand-border dark:border-zinc-800 pb-8">
            <div className="w-12 h-12 bg-brand-dark dark:bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden border border-emerald-500/30">
              <img src="/logo/logo.jpeg" alt="Artificial Quotient Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-brand-text dark:text-white">Adarsh Pillai</p>
              <p className="text-sm text-brand-muted dark:text-zinc-400">Founder, Artificial Quotient</p>
            </div>
          </div>
        </header>

        {/* Video Embed */}
        <div className="aspect-video bg-gray-100 dark:bg-zinc-900 rounded-xl mb-12 flex items-center justify-center text-brand-muted dark:text-zinc-500 relative overflow-hidden border border-brand-border dark:border-zinc-800 shadow-sm">
           <PlayCircle className="w-16 h-16 opacity-50" />
           <p className="absolute bottom-4 font-medium text-sm">YouTube Player Embed Placeholder</p>
        </div>

        {/* What You'll Learn */}
        <div className="bg-brand-bg dark:bg-zinc-900 rounded-xl p-8 mb-12 border border-brand-border dark:border-zinc-800">
          <h3 className="font-heading font-bold text-xl mb-4 text-brand-text dark:text-white">What You&apos;ll Learn</h3>
          <ul className="space-y-3 text-brand-text dark:text-zinc-200">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
              <span>How to scrape trending topics automatically.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
              <span>The exact ChatGPT prompt we use for script generation.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
              <span>Connecting Make.com to Revid.AI API.</span>
            </li>
          </ul>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg dark:prose-invert max-w-none text-brand-text dark:text-zinc-300 mb-12">
          <p>
            Welcome back to the blog. Today, we&apos;re diving deep into the exact workflow that runs the YouTube Shorts strategy for Artificial Quotient. This isn&apos;t theoretical; this is the production pipeline we use every single day.
          </p>
          <h2 className="font-heading font-bold text-2xl mt-8 mb-4 text-brand-text dark:text-white">Step 1: The Script Generation Prompt</h2>
          <p>
            The secret to good AI videos is a highly constrained prompt. We don&apos;t just ask ChatGPT to &quot;write a script&quot;. We give it a strict framework.
          </p>
          
          {/* Copy Prompt Block */}
          <div className="bg-brand-dark dark:bg-zinc-900 rounded-xl overflow-hidden my-8 border border-white/10 dark:border-zinc-800">
            <div className="bg-white/10 dark:bg-zinc-800/50 px-4 py-2 flex justify-between items-center border-b border-white/10 dark:border-zinc-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider">System Prompt</span>
              <button className="text-gray-300 hover:text-white flex items-center gap-1 text-xs font-medium transition-colors">
                <Copy className="w-3 h-3" /> Copy
              </button>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="text-gray-300 dark:text-zinc-300 text-sm font-mono leading-relaxed">
{`You are an expert short-form video scriptwriter. 
Your goal is to write a 45-second script about [TOPIC].

Constraints:
1. Start with a 3-second hook that creates curiosity.
2. Use short, punchy sentences.
3. No jargon unless explained immediately.
4. End with a strong call to action to subscribe.`}
              </pre>
            </div>
          </div>
          
          <p>
            Once you have this prompt loaded into your Make.com scenario, you can start feeding it topics from an RSS feed or a Google Sheet.
          </p>
        </div>
        
        {/* Author Signature */}
        <div className="border-t border-brand-border dark:border-zinc-800 pt-8 mt-12 flex justify-between items-center">
          <div className="font-handwritten text-4xl text-brand-text dark:text-white">
            Adarsh Pillai
          </div>
          <div className="bg-brand-blue/10 text-brand-blue font-bold px-4 py-2 rounded-lg text-sm">
            Subscribe on YouTube
          </div>
        </div>
      </div>
    </article>
  );
}
