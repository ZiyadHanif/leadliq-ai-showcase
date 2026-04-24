export function Marquee() {
  const items = [
    "AI Sales Agents",
    "Lead Gen Automation",
    "Brand Identity",
    "Workflow AI",
    "Custom GPTs",
    "Data Pipelines",
    "Monthly Support",
    "AI Chatbots",
    "Voice Agents",
  ];
  return (
    <section className="py-12 border-y border-border/50 overflow-hidden bg-background/40">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-8 mx-8">
            <span className="font-display text-3xl md:text-5xl font-bold text-foreground/40 hover:text-primary transition-colors">
              {item}
            </span>
            <span className="text-primary text-3xl">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
