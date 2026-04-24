import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    num: "01 / Core",
    icon: "🤖",
    title: "AI Integration & Automation",
    desc: "We connect AI directly into your existing business tools and workflows. Slash operational costs, eliminate manual work, and let intelligent systems run your operations 24/7.",
    tags: ["GPT Agents", "n8n + Make", "CRM + API"],
  },
  {
    num: "02 / Foundation",
    icon: "🌐",
    title: "AI-Optimized WordPress Build",
    desc: "High-converting WordPress sites built from scratch or rebuilt — wired to your AI stack from day one. Includes debugging, security hardening, and ongoing hands-on maintenance.",
    tags: ["AI Chatbot", "Security", "Maintenance"],
  },
  {
    num: "03 / Visibility",
    icon: "📈",
    title: "AI-Driven SEO & Digital Presence",
    desc: "Rank on Google and dominate local search with AI-assisted technical SEO, on-page optimization, and Google Business Profile — building lasting digital authority.",
    tags: ["Technical SEO", "Local Rank", "GBP"],
  },
  {
    num: "04 / Content",
    icon: "✍️",
    title: "AI Content & Marketing",
    desc: "AI-powered content across every channel — social posts, email campaigns, blog articles, ad creatives, and UGC that attracts, nurtures, and converts your ideal customers.",
    tags: ["Email Drips", "Social", "UGC"],
  },
  {
    num: "05 / Video",
    icon: "📱",
    title: "YouTube & TikTok Monetization",
    desc: "We build, grow, and monetize your video presence with AI-driven scripting, SEO optimization, and monetization setup on the platforms your customers actually use.",
    tags: ["Scripting AI", "Short-form", "Monetization"],
  },
  {
    num: "06 / Paid Growth",
    icon: "🎯",
    title: "Precision AI Ad Campaigns",
    desc: "Google and Meta ad campaigns managed for maximum ROI. AI-driven targeting, real-time bid optimization, retargeting sequences, and full funnel tracking — zero wasted spend.",
    tags: ["Google Ads", "Meta", "Retargeting"],
  },
];

function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

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
          <div>
            <div className="text-4xl mb-3">{s.icon}</div>
            <span className="font-mono text-xs text-primary tracking-widest uppercase">{s.num}</span>
          </div>
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
          <div className="font-mono text-xs tracking-widest text-primary uppercase mb-6">— What We Do</div>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tighter">
            Everything your business needs to <span className="text-gradient italic font-light">grow online.</span> Under one roof.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl">
            AI integration is the spine of everything we ship — website, content, SEO, ads, and video,
            all working together as one intelligent growth machine.
          </p>
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
