import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroOrb from "@/assets/hero-orb.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const yNeg = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const line1 = ["We", "Build", "the"];
  const line2 = ["Digital", "Engine."];
  const line3 = ["You", "Run", "the", "Business."];

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] flex items-center overflow-hidden grid-bg noise pt-32 pb-20">
      {/* 3D AI orb visual */}
      <motion.img
        src={heroOrb}
        alt=""
        aria-hidden
        style={{ y, opacity, scale: useTransform(scrollYProgress, [0, 1], [1, 1.15]), rotate: useTransform(scrollYProgress, [0, 1], [0, 25]) }}
        className="absolute top-[8%] right-[-10%] md:right-[-5%] w-[600px] md:w-[850px] max-w-none pointer-events-none mix-blend-screen opacity-80"
      />
      <motion.div
        style={{ y, opacity }}
        className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px] pointer-events-none animate-pulse-glow"
      />
      <motion.div
        style={{ y: yNeg }}
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[100px] pointer-events-none"
      />

      <motion.div style={{ scale, opacity }} className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 glass px-4 py-2 rounded-full mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
            AI-Powered Growth Agency · 30+ Businesses Scaled
          </span>
        </motion.div>

        <h1 className="font-display text-[clamp(2.5rem,8.5vw,8rem)] leading-[0.9] font-bold tracking-tighter">
          {[line1, line2, line3].map((line, li) => (
            <div key={li} className="block">
              {line.map((w, i) => {
                const delayBase = li === 0 ? 0 : li === 1 ? line1.length : line1.length + line2.length;
                const isAccent = w === "Digital" || w === "Engine.";
                return (
                  <motion.span
                    key={`${li}-${i}`}
                    initial={{ opacity: 0, y: 80, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.3 + (delayBase + i) * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className={`inline-block mr-[0.2em] ${isAccent ? "text-gradient italic font-light" : ""}`}
                  >
                    {w}
                  </motion.span>
                );
              })}
            </div>
          ))}
        </h1>

        <div className="mt-12 grid md:grid-cols-2 gap-12 items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
          >
            LeadLiq integrates AI into your business, rebuilds your online presence, creates content
            machines, and automates your entire growth operation — so you scale faster with less effort
            and lower costs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-4 md:justify-end"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:shadow-glow transition-all hover:-translate-y-1"
            >
              Get your free audit
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 glass px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              See what we build
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/50 rounded-2xl overflow-hidden glass"
        >
          {[
            { v: "58%", l: "avg. ops cost reduction" },
            { v: "3.2x", l: "revenue growth / client" },
            { v: "90%", l: "tasks fully automated" },
            { v: "25h+", l: "hours saved / week" },
          ].map((s, i) => (
            <div key={i} className="bg-background/40 p-6 md:p-8">
              <div className="font-display text-3xl md:text-5xl font-bold text-gradient">{s.v}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-2 font-mono uppercase tracking-wider">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
