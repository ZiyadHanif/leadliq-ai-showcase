import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const cases = [
  {
    industry: "E-commerce",
    metric: "+412%",
    label: "qualified leads / mo",
    quote: "LeadLiq replaced our entire SDR team with one AI agent that out-converts them.",
    author: "B. Marquez, Ops Director",
  },
  {
    industry: "B2B SaaS",
    metric: "-68%",
    label: "support cost",
    quote: "Their AI handles 9 of 10 tickets before a human touches them. Game over.",
    author: "S. Patel, COO",
  },
  {
    industry: "Real Estate",
    metric: "$2.1M",
    label: "deals attributed",
    quote: "We closed 11 listings in 60 days from one workflow they built. Insane ROI.",
    author: "J. Carter, Broker",
  },
];

export function Results() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section id="results" ref={ref} className="relative py-32 md:py-48 px-6 lg:px-10 overflow-hidden">
      <motion.div
        style={{ rotate }}
        className="absolute -right-40 top-1/2 w-[600px] h-[600px] rounded-full border border-primary/10 pointer-events-none"
      >
        <div className="absolute inset-12 rounded-full border border-primary/10" />
        <div className="absolute inset-24 rounded-full border border-primary/10" />
        <div className="absolute top-0 left-1/2 w-3 h-3 rounded-full bg-primary shadow-glow -translate-x-1/2" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-20"
        >
          <div className="font-mono text-xs tracking-widest text-primary uppercase mb-6">— Results</div>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">
            Numbers that <span className="text-gradient italic font-light">don't lie.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, rotateY: 5, rotateX: -5 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="glass rounded-3xl p-8 md:p-10 hover:border-primary/40 transition-all"
            >
              <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6">
                {c.industry}
              </div>
              <div className="font-display text-6xl md:text-7xl font-bold text-gradient mb-2">{c.metric}</div>
              <div className="text-sm text-muted-foreground mb-8">{c.label}</div>
              <blockquote className="text-foreground/90 leading-relaxed border-l-2 border-primary pl-4 mb-4">
                "{c.quote}"
              </blockquote>
              <div className="text-sm text-muted-foreground">— {c.author}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
