import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    num: "01",
    title: "AI Sales Acceleration",
    desc: "Custom AI agents that qualify leads, follow up 24/7, and close deals while your team sleeps.",
    tags: ["GPT Agents", "CRM Integration", "Email Automation"],
  },
  {
    num: "02",
    title: "Lead Generation Engines",
    desc: "Predictive scraping, intent signals and multichannel outreach calibrated to your ICP.",
    tags: ["Apollo + AI", "Cold Outreach", "Intent Data"],
  },
  {
    num: "03",
    title: "Operations Cost Cutting",
    desc: "Replace repetitive workflows with autonomous agents. Cut payroll waste, not your team.",
    tags: ["Workflow AI", "Zapier+n8n", "Custom APIs"],
  },
  {
    num: "04",
    title: "Digital Brand Identity",
    desc: "Logo, voice, web presence and positioning that signals premium to your buyers.",
    tags: ["Visual ID", "Website", "Content Engine"],
  },
  {
    num: "05",
    title: "Continuous Monthly Support",
    desc: "We don't ship and ghost. Optimization, training and new automations every month.",
    tags: ["SLA", "Slack support", "Monthly retros"],
  },
];

function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative glass rounded-3xl p-8 md:p-10 overflow-hidden hover:border-primary/40 transition-all"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/0 group-hover:from-primary/10 group-hover:to-accent/5 transition-all duration-500" />
      <div className="relative">
        <div className="flex items-start justify-between mb-8">
          <span className="font-mono text-sm text-primary tracking-widest">{s.num}</span>
          <div className="w-12 h-12 rounded-full border border-border group-hover:border-primary group-hover:bg-primary/10 flex items-center justify-center transition-all group-hover:rotate-45">
            <span className="text-lg">↗</span>
          </div>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 leading-tight">{s.title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
        <div className="flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-border/50 text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-32 md:py-48 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20"
        >
          <div className="font-mono text-xs tracking-widest text-primary uppercase mb-6">— Services</div>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tighter">
            Five levers to <span className="text-gradient italic font-light">compound</span> your growth.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.num} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
