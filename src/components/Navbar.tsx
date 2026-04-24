import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.7]);
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <motion.div
        style={{ backgroundColor: `oklch(0.14 0.005 270 / ${bgOpacity.get()})` }}
        className="backdrop-blur-xl border-b border-border/40"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary shadow-glow group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 rounded-xl bg-primary blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              leadliq<span className="text-primary">.</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-glow transition-all hover:-translate-y-0.5"
          >
            Book a call
            <span className="text-base">→</span>
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
          >
            <span className={`w-5 h-0.5 bg-foreground transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-foreground transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-foreground transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="md:hidden overflow-hidden border-t border-border/40"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-foreground">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-2 bg-primary text-primary-foreground px-5 py-3 rounded-full text-center font-semibold">
                Book a call
              </a>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.nav>
  );
}
