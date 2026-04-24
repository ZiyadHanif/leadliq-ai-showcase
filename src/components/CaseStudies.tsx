import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, X, Check, Clock, Target, Zap } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import realestateImg from "@/assets/case-realestate.jpg";
import healthcareImg from "@/assets/case-healthcare.jpg";
import fitnessImg from "@/assets/case-fitness.jpg";
import ecommerceImg from "@/assets/case-ecommerce.jpg";

type CaseStudy = {
  id: string;
  industry: string;
  client: string;
  headline: string;
  thumb: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  challenge: string;
  solution: string[];
  outcomes: { value: string; label: string }[];
  duration: string;
  stack: string[];
  quote: string;
  author: string;
};

const studies: CaseStudy[] = [
  {
    id: "urbannest",
    industry: "Real Estate",
    client: "UrbanNest Realty",
    headline: "From $3K/mo wasted ad spend to a 4× appointment engine",
    thumb: realestateImg,
    metric: "4×",
    metricLabel: "booked appointments / mo",
    tags: ["AI Chatbot", "WordPress Rebuild", "Email Sequences"],
    challenge:
      "UrbanNest was burning $3,000/month on Google & Meta ads with no system to capture, qualify or follow up with leads. Their site was slow, mobile-broken, and converted under 0.6%.",
    solution: [
      "Rebuilt the entire WordPress site with a conversion-first IA",
      "Deployed an AI chatbot that qualifies buyers/sellers in 60 seconds",
      "Built a 9-touch email + SMS nurture sequence in HubSpot",
      "Wired calendar booking directly into the chat flow",
    ],
    outcomes: [
      { value: "4×", label: "Booked appointments" },
      { value: "3.1%", label: "Site conversion rate" },
      { value: "−42%", label: "Cost per acquisition" },
    ],
    duration: "3 weeks to launch",
    stack: ["WordPress", "OpenAI", "HubSpot", "Calendly"],
    quote:
      "We were spending $3K/mo on ads with zero system behind them. LeadLiq rebuilt our entire site, set up the AI chatbot, and built our email sequences in 3 weeks. We 4×'d our booked appointments within the first month.",
    author: "Sarah K., CEO, UrbanNest Realty",
  },
  {
    id: "novamed",
    industry: "Healthcare",
    client: "NovaMed Clinic",
    headline: "AI patient follow-up that handles 90% of enquiries",
    thumb: healthcareImg,
    metric: "15h",
    metricLabel: "saved per week",
    tags: ["AI Integration", "WordPress", "Patient Automation"],
    challenge:
      "Front-desk staff at NovaMed spent 3+ hours/day answering the same questions and chasing missed appointments. Their old site looked outdated and ranked nowhere on Google.",
    solution: [
      "Rebuilt their WordPress site with HIPAA-conscious architecture",
      "Trained an AI chatbot on every clinical FAQ and intake form",
      "Automated post-visit follow-up + review collection via SMS",
      "Connected booking directly into their EHR calendar",
    ],
    outcomes: [
      { value: "90%", label: "Enquiries handled by AI" },
      { value: "15h", label: "Staff hours saved weekly" },
      { value: "+220%", label: "Online bookings" },
    ],
    duration: "5 weeks to launch",
    stack: ["WordPress", "Claude", "Twilio", "n8n"],
    quote:
      "LeadLiq integrated AI into our patient follow-up and rebuilt our WordPress site from scratch. The AI chatbot handles 90% of initial enquiries and books appointments directly into our calendar.",
    author: "Dr. Michael R., Founder, NovaMed Clinic",
  },
  {
    id: "peakflow",
    industry: "Fitness",
    client: "PeakFlow Fitness",
    headline: "A full revenue machine — not just a website",
    thumb: fitnessImg,
    metric: "−40%",
    metricLabel: "ad cost · 3× leads",
    tags: ["SEO", "Google Ads", "WhatsApp AI", "Content"],
    challenge:
      "PeakFlow was opening a second location with a tiny brand presence and no organic pipeline. Every new member was costing them $87 in paid acquisition.",
    solution: [
      "End-to-end SEO foundation + 24 AI-assisted content pieces",
      "Restructured Google Ads with AI-driven creative testing",
      "WhatsApp AI agent for trial bookings and member onboarding",
      "Monthly content + reporting cadence",
    ],
    outcomes: [
      { value: "−40%", label: "Cost per lead" },
      { value: "3×", label: "Total monthly leads" },
      { value: "$31", label: "New cost per member" },
    ],
    duration: "Ongoing partnership · 4 months",
    stack: ["Google Ads", "GPT-4o", "WhatsApp API", "Make"],
    quote:
      "They didn't just build a website — they built a full revenue machine. SEO, Google Ads, WhatsApp automations, and monthly AI content. Our ad cost dropped 40% while leads tripled.",
    author: "James A., Owner, PeakFlow Fitness",
  },
  {
    id: "lumenlabel",
    industry: "Ecommerce",
    client: "Lumen Label Co.",
    headline: "AI personalisation lifted AOV by 38% in 60 days",
    thumb: ecommerceImg,
    metric: "+58%",
    metricLabel: "monthly revenue",
    tags: ["AI Personalisation", "Email", "Workflow"],
    challenge:
      "A boutique skincare brand stuck at flat $42K/mo. Generic email blasts, no segmentation, and a checkout that haemorrhaged 71% of carts.",
    solution: [
      "AI-driven product recommendations site-wide",
      "Behavioural email + SMS flows powered by Klaviyo + GPT",
      "AI-generated SKU descriptions across 240 products",
      "Automated abandoned cart recovery with dynamic offers",
    ],
    outcomes: [
      { value: "+58%", label: "Monthly revenue" },
      { value: "+38%", label: "Average order value" },
      { value: "−27%", label: "Cart abandonment" },
    ],
    duration: "60 days",
    stack: ["Shopify", "Klaviyo", "GPT-4o", "n8n"],
    quote:
      "The AI work LeadLiq shipped paid for itself in week three. Our flows feel like they were written by our best customer.",
    author: "Priya N., Founder, Lumen Label Co.",
  },
];

export function CaseStudies() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = studies.find((s) => s.id === openId);

  return (
    <section
      id="case-studies"
      className="relative overflow-hidden bg-background py-32"
    >
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[140px]" />

      <div className="container relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Case Studies
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Outcomes, <span className="text-gradient italic font-light">not promises.</span>
            </h2>
          </div>
          <p className="max-w-md text-base text-muted-foreground">
            Tap any card to open the full breakdown — the challenge, what we built, the stack, and the numbers it produced.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {studies.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => setOpenId(s.id)}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface text-left transition-all duration-500 hover:border-primary/50 hover:shadow-elevated"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={s.thumb}
                  alt={`${s.client} case study`}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                {/* Industry tag */}
                <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground backdrop-blur-md">
                  {s.industry}
                </div>

                {/* Metric overlay */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <div className="font-display text-5xl font-bold text-gradient leading-none">
                      {s.metric}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {s.metricLabel}
                    </div>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow">
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8">
                <div className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {s.client}
                </div>
                <h3 className="font-display text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary md:text-2xl">
                  {s.headline}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-background/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Drawer */}
      <Sheet open={!!openId} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent
          side="right"
          className="w-full overflow-y-auto border-l border-border bg-background p-0 sm:max-w-2xl"
        >
          {active && (
            <div className="relative">
              {/* Hero */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={active.thumb}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <button
                  onClick={() => setOpenId(null)}
                  aria-label="Close"
                  className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-background/70 text-foreground backdrop-blur-md transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur-md">
                    {active.industry} · {active.client}
                  </div>
                  <SheetHeader className="space-y-2 text-left">
                    <SheetTitle className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
                      {active.headline}
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                      Detailed case study breakdown for {active.client}.
                    </SheetDescription>
                  </SheetHeader>
                </div>
              </div>

              {/* Body */}
              <div className="space-y-10 p-6 md:p-10">
                {/* Outcome row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="grid grid-cols-3 gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5"
                >
                  {active.outcomes.map((o) => (
                    <div key={o.label} className="text-center">
                      <div className="font-display text-2xl font-bold text-gradient md:text-3xl">
                        {o.value}
                      </div>
                      <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground md:text-[10px]">
                        {o.label}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Meta */}
                <div className="grid grid-cols-2 gap-4 border-y border-border py-5">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Timeline
                      </div>
                      <div className="mt-0.5 text-sm text-foreground">
                        {active.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Stack
                      </div>
                      <div className="mt-0.5 text-sm text-foreground">
                        {active.stack.join(" · ")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Challenge */}
                <div>
                  <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
                    <Target className="h-4 w-4" />
                    The challenge
                  </div>
                  <p className="text-base leading-relaxed text-foreground/85">
                    {active.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
                    <Zap className="h-4 w-4" />
                    What we shipped
                  </div>
                  <ul className="space-y-3">
                    {active.solution.map((step, i) => (
                      <motion.li
                        key={step}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.06 }}
                        className="flex items-start gap-3 text-sm text-foreground/90"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {step}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Quote */}
                <blockquote className="rounded-2xl border-l-2 border-primary bg-surface/50 p-6">
                  <p className="text-base italic leading-relaxed text-foreground/90">
                    "{active.quote}"
                  </p>
                  <footer className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    — {active.author}
                  </footer>
                </blockquote>

                <a
                  href="#contact"
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-mono text-xs uppercase tracking-widest text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
                >
                  Get an outcome like this
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}
