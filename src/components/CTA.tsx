import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.05]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  return (
    <section id="contact" ref={ref} className="relative py-32 md:py-48 px-6 lg:px-10 overflow-hidden">
      <motion.div
        style={{ scale, rotate }}
        className="relative max-w-6xl mx-auto rounded-[2.5rem] md:rounded-[3rem] bg-gradient-primary p-12 md:p-24 text-center overflow-hidden noise"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0/0.2),transparent_50%)]" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-60 h-60 opacity-20"
        >
          <svg viewBox="0 0 100 100">
            <defs>
              <path id="circle" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
            </defs>
            <text fill="currentColor" fontSize="9" fontFamily="monospace" letterSpacing="3">
              <textPath href="#circle">LEADLIQ.COM • AI THAT SHIPS REVENUE • LEADLIQ.COM • </textPath>
            </text>
          </svg>
        </motion.div>

        <div className="relative">
          <div className="font-mono text-xs uppercase tracking-widest text-primary-foreground/70 mb-6">
            ◆ Ready when you are
          </div>
          <h2 className="font-display text-5xl md:text-8xl font-bold text-primary-foreground tracking-tighter leading-[0.9]">
            Let's build your <br />
            <span className="italic font-light">unfair advantage.</span>
          </h2>
          <p className="mt-8 text-primary-foreground/80 text-lg max-w-xl mx-auto">
            Free 30-minute AI audit. We'll show you 3 immediate opportunities — no sales pitch, no fluff.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@leadliq.com"
              className="inline-flex items-center justify-center gap-2 bg-background text-foreground px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform"
            >
              hello@leadliq.com
              <span>→</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-background/10 backdrop-blur text-primary-foreground border border-primary-foreground/30 px-8 py-4 rounded-full font-semibold hover:bg-background/20 transition-all"
            >
              Book a call
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-primary" />
          <span className="font-display font-bold">leadliq<span className="text-primary">.</span></span>
        </div>
        <div className="text-sm text-muted-foreground font-mono">
          © {new Date().getFullYear()} LeadLiq — Built in the US 🇺🇸
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
          <a href="mailto:hello@leadliq.com" className="hover:text-foreground transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}
