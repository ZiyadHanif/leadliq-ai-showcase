import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { n: "01", t: "Discovery", d: "Audit your stack, GTM, and bottlenecks. We map every dollar leaking out of your funnel." },
  { n: "02", t: "Blueprint", d: "Custom AI architecture tailored to your business — not a templated SaaS bolt-on." },
  { n: "03", t: "Build", d: "Two-week sprints. You see real, working automation by day 14. No vapor demos." },
  { n: "04", t: "Scale", d: "Monthly retainer: continuous optimization, new agents, training, and 24/7 support." },
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="process" className="relative py-32 md:py-48 px-6 lg:px-10 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="font-mono text-xs tracking-widest text-primary uppercase mb-6">— Process</div>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">
            From audit to <span className="text-gradient italic font-light">autonomy</span>
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border/50 -translate-x-px md:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-primary to-primary-glow -translate-x-px md:-translate-x-1/2 shadow-glow"
          />

          <div className="space-y-24">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`w-1/2 hidden md:block ${i % 2 === 0 ? "text-right pr-16" : "pl-16"}`}>
                  <div className="font-display text-7xl font-bold text-foreground/10">{s.n}</div>
                </div>

                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-5 h-5 rounded-full bg-primary shadow-glow ring-8 ring-background"
                  />
                </div>

                <div className={`pl-20 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                  <div className="md:hidden font-mono text-sm text-primary mb-2">{s.n}</div>
                  <h3 className="font-display text-3xl md:text-4xl font-bold mb-3">{s.t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
