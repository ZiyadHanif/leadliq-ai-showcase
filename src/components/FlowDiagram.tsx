import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Sparkles, Check, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export type FlowStep = {
  label: string;
  sub: string;
  Icon: LucideIcon;
  aiAction?: string;
  outcomes?: readonly string[];
};

type Props = {
  steps: readonly FlowStep[];
  activeKey: string;
};

export function FlowDiagram({ steps, activeKey }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    loop: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  // Reset to first step when workflow changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(0, true);
      setSelectedIndex(0);
    }
    setOpenIndex(null);
  }, [activeKey, emblaApi]);

  const openStep = openIndex !== null ? steps[openIndex] : null;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur-xl md:p-10">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative mb-8 flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          → Live flow diagram · tap a step
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
            <div className="absolute left-[6%] right-[6%] top-[40px] h-px bg-border" />
            <motion.div
              key={`line-${activeKey}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="absolute left-[6%] right-[6%] top-[40px] h-px bg-gradient-to-r from-primary via-primary-glow to-primary shadow-glow"
            />

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
              className="absolute top-[40px] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-glow"
            />

            <div
              className="relative grid gap-3"
              style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
            >
              {steps.map((step, i) => {
                const Icon = step.Icon;
                return (
                  <motion.button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    aria-label={`Open details for ${step.label}`}
                    key={step.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                    whileHover={{ y: -3 }}
                    className="group relative flex flex-col items-center text-center outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
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
                      className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/40 bg-background transition-colors group-hover:border-primary group-hover:bg-primary/5"
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
                    <span className="mt-2 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Details <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Mobile: swipeable horizontal carousel */}
          <div className="relative md:hidden">
            {/* Step counter */}
            <div className="mb-4 flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Step {selectedIndex + 1} / {steps.length}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary">
                Tap card for details
              </div>
            </div>

            {/* Embla viewport */}
            <div className="overflow-hidden -mx-2" ref={emblaRef}>
              <div className="flex">
                {steps.map((step, i) => {
                  const Icon = step.Icon;
                  const isActive = i === selectedIndex;
                  return (
                    <div
                      key={step.label}
                      className="min-w-0 flex-[0_0_85%] px-2"
                    >
                      <motion.button
                        type="button"
                        onClick={() => {
                          if (isActive) setOpenIndex(i);
                          else emblaApi?.scrollTo(i);
                        }}
                        animate={{
                          scale: isActive ? 1 : 0.94,
                          opacity: isActive ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.3 }}
                        className="relative flex w-full flex-col items-center rounded-2xl border border-border bg-background/60 p-6 text-center backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <motion.div
                          animate={
                            isActive
                              ? {
                                  boxShadow: [
                                    "0 0 0px oklch(0.92 0.22 130 / 0)",
                                    "0 0 40px oklch(0.92 0.22 130 / 0.6)",
                                    "0 0 0px oklch(0.92 0.22 130 / 0)",
                                  ],
                                }
                              : {}
                          }
                          transition={{ duration: 2.4, repeat: Infinity }}
                          className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/40 bg-background"
                        >
                          <Icon className="h-8 w-8 text-primary" />
                          <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary font-mono text-[11px] font-bold text-primary-foreground">
                            {i + 1}
                          </div>
                        </motion.div>
                        <div className="mt-5 font-display text-base font-semibold text-foreground">
                          {step.label}
                        </div>
                        <div className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                          {step.sub}
                        </div>
                        {isActive && (
                          <span className="mt-4 inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                            Tap to expand <ArrowUpRight className="h-3 w-3" />
                          </span>
                        )}
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controls + dot indicators */}
            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canPrev}
                aria-label="Previous step"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-background/70 text-foreground transition active:scale-95 disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex flex-1 items-center justify-center gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => emblaApi?.scrollTo(i)}
                    aria-label={`Go to step ${i + 1}`}
                    className="group flex h-8 items-center justify-center px-1"
                  >
                    <span
                      className={`h-2 rounded-full transition-all ${
                        i === selectedIndex
                          ? "w-8 bg-primary shadow-glow"
                          : "w-2 bg-border group-active:bg-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canNext}
                aria-label="Next step"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary transition active:scale-95 disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Detail drawer */}
      <Sheet
        open={openIndex !== null}
        onOpenChange={(o) => !o && setOpenIndex(null)}
      >
        <SheetContent
          side="right"
          className="w-full overflow-y-auto border-l border-border bg-background sm:max-w-lg"
        >
          {openStep && openIndex !== null && (
            <>
              <SheetHeader className="text-left">
                <div className="mb-4 flex items-center gap-3">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-primary/5">
                    <openStep.Icon className="h-6 w-6 text-primary" />
                    <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary font-mono text-[10px] font-bold text-primary-foreground">
                      {openIndex + 1}
                    </div>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Step {openIndex + 1} of {steps.length} · {openStep.sub}
                  </div>
                </div>
                <SheetTitle className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {openStep.label}
                </SheetTitle>
                {openStep.aiAction && (
                  <SheetDescription className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {openStep.aiAction}
                  </SheetDescription>
                )}
              </SheetHeader>

              <div className="mt-8 space-y-6">
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">
                    <Sparkles className="h-3.5 w-3.5" /> AI action
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                    {openStep.aiAction ?? "AI orchestrates this step end-to-end."}
                  </p>
                </div>

                {openStep.outcomes && openStep.outcomes.length > 0 && (
                  <div>
                    <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Expected outcomes
                    </div>
                    <ul className="space-y-2.5">
                      {openStep.outcomes.map((o) => (
                        <li
                          key={o}
                          className="flex items-start gap-3 rounded-xl border border-border bg-surface/40 p-3 text-sm text-foreground/90"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-border pt-5">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex((i) => (i !== null && i > 0 ? i - 1 : i))
                    }
                    disabled={openIndex === 0}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition hover:text-foreground disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" /> Prev step
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex((i) =>
                        i !== null && i < steps.length - 1 ? i + 1 : i,
                      )
                    }
                    disabled={openIndex === steps.length - 1}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary transition hover:text-primary-glow disabled:opacity-30"
                  >
                    Next step <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
