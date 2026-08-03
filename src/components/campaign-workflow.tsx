import { MessageSquare, ThumbsUp, PenTool, Video, BarChart } from "lucide-react";

export default function CampaignWorkflow() {
  const steps = [
    {
      id: "01",
      title: "Inquiry",
      description: "You reach out via the form below. Share your tool, your goals, and your target audience.",
      icon: <MessageSquare className="w-6 h-6 text-brand-blue transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" />
    },
    {
      id: "02",
      title: "Fit Check",
      description: "We review your product to ensure it's a perfect match for our audience of automation builders.",
      icon: <ThumbsUp className="w-6 h-6 text-brand-blue transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" />
    },
    {
      id: "03",
      title: "Script & Concept",
      description: "We pitch a concept and write the script. You review and approve the integration.",
      icon: <PenTool className="w-6 h-6 text-brand-blue transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
    },
    {
      id: "04",
      title: "Production",
      description: "We record, edit, and polish the video to our high standard of quality.",
      icon: <Video className="w-6 h-6 text-brand-blue transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1" />
    },
    {
      id: "05",
      title: "Publish & Report",
      description: "The video goes live. We track the clicks, conversions, and share the results.",
      icon: <BarChart className="w-6 h-6 text-brand-blue transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6" />
    }
  ];

  return (
    <section className="w-full py-24 px-4 border-t border-brand-border dark:border-zinc-800 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text dark:text-white mb-4">
            How a Campaign Runs
          </h2>
          <p className="text-brand-muted dark:text-zinc-400 font-medium text-lg max-w-2xl mx-auto">
            A seamless, five-step process from your initial inquiry to reported results.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center text-center relative group cursor-pointer">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-brand-border dark:bg-zinc-800 z-0 transition-colors duration-300 group-hover:bg-brand-blue/60"></div>
              )}
              
              {/* Animated Icon Box */}
              <div className="w-20 h-20 bg-brand-bg dark:bg-zinc-950 rounded-2xl border border-brand-border dark:border-zinc-800 flex items-center justify-center mb-6 shadow-sm relative z-10 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-brand-blue/20 group-hover:border-brand-blue/50 dark:group-hover:border-brand-blue/50">
                {step.icon}
                <div className="absolute -top-3 -right-3 bg-brand-text dark:bg-white text-white dark:text-zinc-900 text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white group-hover:scale-110">
                  {step.id}
                </div>
              </div>
              
              <h3 className="font-heading font-bold text-lg mb-3 text-brand-text dark:text-white transition-colors duration-300 group-hover:text-brand-blue">{step.title}</h3>
              <p className="text-sm text-brand-muted dark:text-zinc-400 transition-colors duration-300 group-hover:text-brand-text dark:group-hover:text-zinc-200">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
