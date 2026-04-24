import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type FlowStep = {
  label: string;
  sub: string;
  Icon: LucideIcon;
};

type Props = {
  steps: readonly FlowStep[];
  activeKey: string;
};

export function FlowDiagram({ steps, activeKey }: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur-xl md:p-10">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative mb-8 flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          → Live flow diagram
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-primary" />
          </span>
          Running
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="relative"
        >
          {/* Desktop: horizontal flow */}
          <div className="relative hidden md:block">
            {/* connector line behind nodes */}
            <div className="absolute left-[6%] right-[6%] top-1/2 h-px -translate-y-1/2 bg-border" />
            <motion.div
              key={`line-${activeKey}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="absolute left-[6%] right-[6%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-primary via-primary-glow to-primary shadow-glow"
            />

            {/* traveling pulse */}
            <motion.div
              key={`pulse-${activeKey}`}
              initial={{ left: "6%", opacity: 0 }}
              animate={{ left: "94%", opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2.6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.4,
              }}
              className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-glow"
            />

            <div
              className="relative grid gap-3"
              style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
            >
              {steps.map((step, i) => {
                const Icon = step.Icon;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                    className="relative flex flex-col items-center text-center"
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0px oklch(0.92 0.22 130 / 0)",
                          "0 0 30px oklch(0.92 0.22 130 / 0.5)",
                          "0 0 0px oklch(0.92 0.22 130 / 0)",
                        ],
                      }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-background"
                    >
                      <Icon className="h-6 w-6 text-primary" />
                      <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary font-mono text-[10px] font-bold text-primary-foreground">
                        {i + 1}
                      </div>
                    </motion.div>
                    <div className="mt-4 font-display text-sm font-semibold text-foreground">
                      {step.label}
                    </div>
                    <div className="mt-1 max-w-[140px] font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {step.sub}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile: vertical flow */}
          <div className="relative space-y-4 md:hidden">
            <div className="absolute bottom-4 left-7 top-4 w-px bg-border" />
            <motion.div
              key={`v-line-${activeKey}`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top" }}
              className="absolute bottom-4 left-7 top-4 w-px bg-gradient-to-b from-primary via-primary-glow to-primary"
            />
            {steps.map((step, i) => {
              const Icon = step.Icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.45 }}
                  className="relative flex items-center gap-4"
                >
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-background">
                    <Icon className="h-5 w-5 text-primary" />
                    <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-mono text-[9px] font-bold text-primary-foreground">
                      {i + 1}
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-sm font-semibold text-foreground">
                      {step.label}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {step.sub}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
