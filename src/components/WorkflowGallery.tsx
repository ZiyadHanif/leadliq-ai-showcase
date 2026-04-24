import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  MessageSquare, Workflow, BarChart3, Bot, ArrowUpRight, Check,
  Globe, Filter, Database, Send, FileText, Cpu, GitBranch, Bell,
  LineChart, Sparkles, Mail, Mic, BrainCircuit, PhoneCall, UserCheck,
} from "lucide-react";
import { FlowDiagram } from "./FlowDiagram";
import leadCaptureImg from "@/assets/workflow-leadcapture.jpg";
import automationImg from "@/assets/workflow-automation.jpg";
import reportingImg from "@/assets/workflow-reporting.jpg";
import agentImg from "@/assets/workflow-agent.jpg";

const workflows = [
  {
    id: "capture",
    label: "Lead Capture",
    icon: MessageSquare,
    title: "AI lead capture that never sleeps",
    description:
      "Conversational forms, smart chat widgets, and instant qualification routes hot leads to your sales team within seconds.",
    image: leadCaptureImg,
    bullets: [
      "AI chatbots qualify visitors 24/7",
      "Auto-enrich with firmographic data",
      "Instant CRM sync (HubSpot, Pipedrive, GHL)",
      "Smart routing by intent and territory",
    ],
    metric: { value: "4.7x", label: "more qualified leads" },
    stack: ["OpenAI", "Twilio", "HubSpot"],
    flow: [
      { label: "Visitor lands", sub: "Site or ad", Icon: Globe },
      { label: "AI chat qualifies", sub: "Intent + budget", Icon: MessageSquare },
      { label: "Score & route", sub: "Hot vs cold", Icon: Filter },
      { label: "Sync to CRM", sub: "HubSpot / GHL", Icon: Database },
      { label: "Sales notified", sub: "Slack + SMS", Icon: Send },
    ],
  },
  {
    id: "automation",
    label: "Workflow Automation",
    icon: Workflow,
    title: "Operations that run themselves",
    description:
      "We connect your tools with n8n & Make so repetitive ops, follow-ups, and data entry happen without humans in the loop.",
    image: automationImg,
    bullets: [
      "n8n + Make multi-step workflows",
      "AI document processing & extraction",
      "Auto invoicing, onboarding, ticketing",
      "Slack / email alerts on key events",
    ],
    metric: { value: "25h+", label: "saved per week" },
    stack: ["n8n", "Make", "Zapier"],
    flow: [
      { label: "Trigger event", sub: "Email / form / API", Icon: Bell },
      { label: "Parse with AI", sub: "Extract fields", Icon: FileText },
      { label: "Run logic", sub: "n8n / Make", Icon: Cpu },
      { label: "Branch actions", sub: "Multi-tool", Icon: GitBranch },
      { label: "Notify team", sub: "Slack / email", Icon: Send },
    ],
  },
  {
    id: "reporting",
    label: "AI Reporting",
    icon: BarChart3,
    title: "Insights, not spreadsheets",
    description:
      "Real-time dashboards backed by AI summaries — know exactly which channel, campaign and rep is driving revenue.",
    image: reportingImg,
    bullets: [
      "Unified attribution across channels",
      "Weekly AI-generated executive briefs",
      "Anomaly detection & alerting",
      "Custom KPI dashboards",
    ],
    metric: { value: "100%", label: "pipeline visibility" },
    stack: ["Looker", "Claude", "Postgres"],
    flow: [
      { label: "Pull data", sub: "Ads + CRM + Web", Icon: Database },
      { label: "Unify & clean", sub: "Postgres warehouse", Icon: GitBranch },
      { label: "AI analysis", sub: "Claude insights", Icon: Sparkles },
      { label: "Dashboards", sub: "Live KPIs", Icon: LineChart },
      { label: "Weekly brief", sub: "Email digest", Icon: Mail },
    ],
  },
  {
    id: "agent",
    label: "AI Agents",
    icon: Bot,
    title: "Voice & chat agents that close",
    description:
      "Custom GPT-powered agents handle support, booking, and outbound — trained on your business, brand, and offers.",
    image: agentImg,
    bullets: [
      "Voice AI for inbound & outbound calls",
      "Multi-channel chat (web, SMS, WhatsApp)",
      "Trained on your docs & playbooks",
      "Human handoff when it matters",
    ],
    metric: { value: "90%", label: "tickets auto-resolved" },
    stack: ["GPT-4o", "Vapi", "Claude"],
    flow: [
      { label: "Inbound", sub: "Call / chat / SMS", Icon: PhoneCall },
      { label: "Voice + intent", sub: "Whisper + LLM", Icon: Mic },
      { label: "Reason & retrieve", sub: "Your knowledge", Icon: BrainCircuit },
      { label: "Take action", sub: "Book / quote / refund", Icon: Cpu },
      { label: "Human handoff", sub: "When needed", Icon: UserCheck },
    ],
  },
] as const;

export function WorkflowGallery() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const current = workflows[active];

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative overflow-hidden bg-background py-32"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <motion.div
        style={{ y }}
        className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="container relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Live Workflows
          </div>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            See the <span className="text-gradient">AI engine</span> in motion
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Every system we ship is built on a stack of integrated AI workflows. Tap through to see what we deploy inside your business.
          </p>
        </motion.div>

        {/* Tab navigation */}
        <div className="mb-10 flex flex-wrap justify-center gap-2 md:gap-3">
          {workflows.map((w, i) => {
            const Icon = w.icon;
            const isActive = i === active;
            return (
              <button
                key={w.id}
                onClick={() => setActive(i)}
                className={`group relative flex items-center gap-2 rounded-full border px-4 py-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-500 md:px-5 md:text-sm ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-glow"
                    : "border-border bg-surface text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {w.label}
                {isActive && (
                  <motion.span
                    layoutId="active-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/50 shadow-elevated backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-0 lg:grid-cols-5"
            >
              {/* Visual */}
              <div className="relative lg:col-span-3">
                <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:h-full">
                  <motion.img
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    src={current.image}
                    alt={`${current.label} workflow visualization`}
                    width={1280}
                    height={896}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />

                  {/* Floating metric badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="absolute bottom-6 left-6 rounded-2xl border border-primary/30 bg-background/80 p-5 backdrop-blur-xl"
                  >
                    <div className="font-display text-4xl font-bold text-gradient">
                      {current.metric.value}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {current.metric.label}
                    </div>
                  </motion.div>

                  {/* Live indicator */}
                  <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-primary/30 bg-background/70 px-3 py-1.5 backdrop-blur-xl">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative h-2 w-2 rounded-full bg-primary" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                      Live system
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between gap-8 p-8 md:p-12 lg:col-span-2">
                <div>
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    {current.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {current.description}
                  </p>

                  <ul className="mt-8 space-y-3">
                    {current.bullets.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.08 }}
                        className="flex items-start gap-3 text-sm text-foreground/90"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {current.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-background/50 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:text-primary-glow"
                  >
                    Deploy this in your business
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom progress dots */}
          <div className="flex items-center justify-center gap-1.5 border-t border-border bg-background/40 py-4">
            {workflows.map((w, i) => (
              <button
                key={w.id}
                onClick={() => setActive(i)}
                aria-label={`View ${w.label}`}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === active ? "w-10 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Animated flow diagram — updates with active tab */}
        <div className="mt-8">
          <FlowDiagram steps={current.flow} activeKey={current.id} />
        </div>
      </div>
    </section>
  );
}
