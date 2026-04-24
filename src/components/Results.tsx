import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import resultsChart from "@/assets/results-chart.jpg";

const cases = [
  {
    industry: "Real Estate",
    metric: "4×",
    label: "booked appointments / mo",
    quote:
      "We were spending $3K/mo on ads with zero system behind them. LeadLiq rebuilt our entire site, set up the AI chatbot, and built our email sequences in 3 weeks. We 4×'d our booked appointments within the first month.",
    author: "Sarah K., CEO, UrbanNest Realty",
  },
  {
    industry: "Healthcare",
    metric: "15h",
    label: "saved per week",
    quote:
      "LeadLiq integrated AI into our patient follow-up and rebuilt our WordPress site from scratch. The AI chatbot handles 90% of initial enquiries and books appointments directly into our calendar.",
    author: "Dr. Michael R., Founder, NovaMed Clinic",
  },
  {
    industry: "Fitness",
    metric: "-40%",
    label: "ad cost · 3× leads",
    quote:
      "They didn't just build a website — they built a full revenue machine. SEO, Google Ads, WhatsApp automations, and monthly AI content. Our ad cost dropped 40% while leads tripled.",
    author: "James A., Owner, PeakFlow Fitness",
  },
];

export function Results() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section id="results" ref={ref} className="relative py-32 md:py-48 px-6 lg:px-10 overflow-hidden">
      <img
        src={resultsChart}
        alt=""
        aria-hidden
        loading="lazy"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background pointer-events-none" />
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
          <div className="font-mono text-xs tracking-widest text-primary uppercase mb-6">— Real Results</div>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">
            What our clients <span className="text-gradient italic font-light">actually say.</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            No fluff. No fake reviews. Just real business owners who stopped guessing and started growing.
          </p>
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
              <blockquote className="text-foreground/90 leading-relaxed border-l-2 border-primary pl-4 mb-4 text-sm">
                "{c.quote}"
              </blockquote>
              <div className="text-xs text-muted-foreground">— {c.author}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
