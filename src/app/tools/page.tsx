import { Search, ExternalLink, PlaySquare } from "lucide-react";

export default function ToolsVault() {
  const tools = [
    { 
      id: 1,
      name: "Make.com", 
      category: "Automation", 
      desc: "The ultimate visual automation platform for building advanced workflows without code.", 
      discount: "20% OFF 1st Year", 
      ytUrl: "#" 
    },
    { 
      id: 2,
      name: "Revid.AI", 
      category: "Video", 
      desc: "Turn scripts into highly engaging short form videos automatically.", 
      discount: "Use Code ARTIFICIAL", 
      ytUrl: "#" 
    },
    { 
      id: 3,
      name: "Cursor", 
      category: "Coding", 
      desc: "AI-first code editor that dramatically speeds up development time.", 
      discount: null, 
      ytUrl: "#" 
    },
    { 
      id: 4,
      name: "Claude Pro", 
      category: "Productivity", 
      desc: "The best LLM for writing, coding, and complex reasoning tasks.", 
      discount: null, 
      ytUrl: null 
    }
  ];

  const categories = ["All", "Automation", "Video", "Coding", "Productivity"];

  return (
    <div className="w-full py-16 px-4 bg-brand-bg dark:bg-zinc-950 min-h-screen transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-text dark:text-white mb-4">
            AI Tool Vault
          </h1>
          <p className="text-brand-muted dark:text-zinc-400 font-medium text-lg max-w-2xl mx-auto">
            A curated directory of the exact tools we use and recommend for building AI workflows.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div className="flex gap-2 overflow-x-auto w-full pb-2 md:pb-0 hide-scrollbar">
            {categories.map((cat, i) => (
              <button 
                key={cat} 
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${i === 0 ? 'bg-brand-blue text-white' : 'bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted dark:text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search tools..." 
              className="w-full bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-brand-text dark:text-white focus:outline-none focus:border-brand-blue"
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <div key={tool.id} className="bg-brand-card dark:bg-zinc-900 rounded-xl border border-brand-border dark:border-zinc-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-brand-bg dark:bg-zinc-950 border border-brand-border dark:border-zinc-800 rounded-lg flex items-center justify-center font-bold text-brand-text dark:text-white text-xl">
                  {tool.name.charAt(0)}
                </div>
                {tool.discount && (
                  <span className="bg-brand-green/10 text-brand-green text-xs font-bold px-3 py-1 rounded-full">
                    {tool.discount}
                  </span>
                )}
              </div>
              
              <h3 className="font-heading font-bold text-xl mb-2 text-brand-text dark:text-white">{tool.name}</h3>
              <p className="text-sm text-brand-muted dark:text-zinc-400 mb-6 flex-grow">{tool.desc}</p>
              
              <div className="flex flex-col gap-3 mt-auto border-t border-brand-border dark:border-zinc-800 pt-4">
                <button className="w-full flex items-center justify-center gap-2 bg-brand-bg dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-800 border border-brand-border dark:border-zinc-800 text-brand-text dark:text-white font-bold text-sm py-2 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4" /> Try {tool.name}
                </button>
                {tool.ytUrl && (
                  <button className="w-full flex items-center justify-center gap-2 text-brand-blue hover:text-brand-blue-hover font-bold text-sm py-2 transition-colors">
                    <PlaySquare className="w-4 h-4" /> Watch Tutorial
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
