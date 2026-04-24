import { motion } from "framer-motion";

const industries = [
  { icon: "🏠", name: "Real Estate", desc: "Agents, brokerages & property managers" },
  { icon: "🏥", name: "Healthcare", desc: "Clinics, dentists & medical practices" },
  { icon: "⚖️", name: "Prof. Services", desc: "Lawyers, accountants & consultants" },
  { icon: "🎓", name: "Education", desc: "Tutoring centres & online courses" },
  { icon: "🛍️", name: "E-Commerce", desc: "DTC brands & online retailers" },
  { icon: "🍽️", name: "Hospitality", desc: "Restaurants, hotels & event venues" },
];

export function Industries() {
  return (
    <section className="relative py-32 md:py-48 px-6 lg:px-10 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-20"
        >
          <div className="font-mono text-xs tracking-widest text-primary uppercase mb-6">— Built For You</div>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">
            Industries we <span className="text-gradient italic font-light">specialise in.</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            Our AI systems, websites, and content engines are purpose-built for local, service-based,
            and online US businesses ready to scale aggressively.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 40, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.02 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="group glass rounded-2xl p-6 md:p-8 hover:border-primary/40 transition-all cursor-default"
            >
              <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform">{ind.icon}</div>
              <div className="font-display text-xl md:text-2xl font-bold mb-2">{ind.name}</div>
              <div className="text-sm text-muted-foreground">{ind.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
