import { motion } from "framer-motion";

const plans = [
  {
    name: "Spark",
    price: "$2,400",
    cadence: "/mo",
    desc: "For SMBs starting their AI journey.",
    features: ["1 AI workflow", "Lead capture automation", "Monthly strategy call", "Email support"],
    cta: "Start with Spark",
    featured: false,
  },
  {
    name: "Scale",
    price: "$5,900",
    cadence: "/mo",
    desc: "Our most popular package for growing teams.",
    features: [
      "Up to 4 AI workflows",
      "Custom GPT + agents",
      "Brand identity refresh",
      "Bi-weekly optimization",
      "Slack support (24h)",
      "Quarterly strategy",
    ],
    cta: "Scale with us",
    featured: true,
  },
  {
    name: "Sovereign",
    price: "Custom",
    cadence: "",
    desc: "Full transformation for ambitious operators.",
    features: ["Unlimited workflows", "Dedicated AI engineer", "Full brand system", "Weekly war room", "SLA guaranteed"],
    cta: "Talk to founders",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-32 md:py-48 px-6 lg:px-10 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="font-mono text-xs tracking-widest text-primary uppercase mb-6">— Pricing</div>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">
            Built for <span className="text-gradient italic font-light">retainer.</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            No big lump sums. Continuous monthly partnership — cancel anytime after month 3.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 md:p-10 flex flex-col ${
                p.featured
                  ? "bg-gradient-primary text-primary-foreground shadow-glow scale-100 md:scale-105"
                  : "glass"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background text-primary text-xs font-mono px-4 py-1.5 rounded-full uppercase tracking-widest border border-primary">
                  Most picked
                </div>
              )}
              <div className={`font-display text-2xl font-bold mb-2 ${p.featured ? "" : ""}`}>{p.name}</div>
              <p className={`text-sm mb-6 ${p.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {p.desc}
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-display text-5xl font-bold tracking-tighter">{p.price}</span>
                <span className={`text-sm ${p.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {p.cadence}
                </span>
              </div>
              <ul className="space-y-3 mb-10 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className={p.featured ? "text-primary-foreground" : "text-primary"}>✓</span>
                    <span className={p.featured ? "" : "text-foreground/80"}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center py-3.5 rounded-full font-semibold transition-all ${
                  p.featured
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
