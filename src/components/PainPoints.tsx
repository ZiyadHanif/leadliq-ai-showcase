import { motion } from "framer-motion";
import painBg from "@/assets/pain-bg.jpg";

const pains = [
  "Manual tasks draining hours your team should spend on revenue-generating work.",
  "Your website isn't converting visitors — it's just an expensive digital business card.",
  "No content engine means competitors outrank you on Google, YouTube, and social.",
  "Paying for ads and tools with no AI system to follow up, nurture, and close 24/7.",
];

export function PainPoints() {
  return (
    <section className="relative py-32 md:py-48 px-6 lg:px-10 overflow-hidden">
      <img
        src={painBg}
        alt=""
        aria-hidden
        loading="lazy"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="font-mono text-xs tracking-widest text-primary uppercase mb-6">— The Hard Truth</div>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tighter">
            Your business is <span className="text-gradient italic font-light">bleeding</span> time & money every day.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl">
            If your business still runs on manual processes, a static website, and zero AI — you're not
            competing. You're slowly falling behind businesses that have already automated everything.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {pains.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-start gap-5 glass rounded-2xl p-6 md:p-8 hover:border-destructive/40 transition-all"
            >
              <div className="shrink-0 w-12 h-12 rounded-full border border-destructive/40 bg-destructive/10 flex items-center justify-center text-destructive font-bold text-xl group-hover:rotate-90 transition-transform">
                ✕
              </div>
              <p className="text-lg text-foreground/85 leading-relaxed">{p}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
