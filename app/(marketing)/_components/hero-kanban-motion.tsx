"use client";

import { useEffect, useState, useRef } from "react";
import { Check, CheckSquare, Clock, Pause, Play, RotateCcw, Sparkles } from "lucide-react";

export function HeroKanbanMotion() {
  // Step state: 0 = Backlog (highlighted), 1 = Moving to In Progress, 2 = Completing Checklist, 3 = Shipped to Done
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2400);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const stepLabels = [
    { label: "1. Triage", desc: "Backlog prioritisation" },
    { label: "2. Progress", desc: "Moved into active sprint" },
    { label: "3. Tasks", desc: "Checklist completed" },
    { label: "4. Shipped", desc: "Moved to Done & audited" },
  ];

  return (
    <div
      className="relative w-full rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-4 sm:p-5 shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Board Top Bar */}
      <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--landing-line)] pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-none bg-[var(--landing-orange)] opacity-75" />
            <span className="relative inline-flex size-2 rounded-none bg-[var(--landing-orange)]" />
          </span>
          <span className="text-xs font-mono font-bold tracking-wider text-[var(--landing-text)]">
            LIVE KANBAN WORKFLOW
          </span>
          <span className="rounded-none bg-[var(--landing-panel-strong)] px-1.5 py-0.5 text-[9px] font-mono text-[var(--landing-orange)] font-semibold border border-[var(--landing-line)]">
            AUTOPLAY
          </span>
        </div>

        {/* Play / Pause / Reset Controls */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
            className="flex items-center gap-1 rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] px-2 py-1 text-[10px] text-[var(--landing-muted)] hover:text-[var(--landing-text)] hover:border-[var(--landing-orange)] transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="size-2.5 text-[var(--landing-orange)]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="size-2.5 text-[var(--landing-orange)]" />
                <span>Play</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setStep(0)}
            aria-label="Restart animation"
            className="flex items-center gap-1 rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] px-2 py-1 text-[10px] text-[var(--landing-muted)] hover:text-[var(--landing-text)] hover:border-[var(--landing-orange)] transition-colors cursor-pointer"
          >
            <RotateCcw className="size-2.5" />
          </button>
        </div>
      </div>

      {/* 3 Kanban Columns */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* COLUMN 1: BACKLOG */}
        <div className="flex flex-col rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel-strong)]/60 p-3 min-h-[310px]">
          <div className="mb-3 flex items-center justify-between text-[10px] font-mono">
            <span className="font-bold text-[var(--landing-muted)]">BACKLOG</span>
            <span className="rounded-none bg-[var(--landing-panel)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--landing-muted)] border border-[var(--landing-line)]">
              {step === 0 ? "02" : "01"}
            </span>
          </div>

          <div className="space-y-2.5 flex-1">
            {/* The Active Hero Moving Card (Only in Backlog when step === 0) */}
            {step === 0 && (
              <div className="rounded-none border border-[var(--landing-orange)] bg-[var(--landing-panel)] p-3 shadow-md transition-all duration-300 animate-fade-in-up">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="text-[var(--landing-orange)] font-bold">#frontend</span>
                  <span className="rounded-none bg-[var(--landing-orange)]/15 px-1 py-0.5 text-[8px] text-[var(--landing-orange)] font-bold">
                    HIGH
                  </span>
                </div>
                <p className="mt-2 text-xs font-semibold text-[var(--landing-text)]">
                  Launch page polish
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-[var(--landing-muted)]">
                  <span className="flex items-center gap-1">
                    <CheckSquare className="size-3 text-[var(--landing-orange)]" /> 1/2 done
                  </span>
                  <span className="flex items-center gap-0.5 text-[var(--landing-orange)]">
                    <Clock className="size-3" /> Today
                  </span>
                </div>
              </div>
            )}

            {/* Static Card in Backlog */}
            <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-2.5 transition-colors hover:border-[var(--landing-line)]">
              <div className="flex items-center justify-between text-[9px] font-mono text-[var(--landing-muted)]">
                <span>#mobile</span>
                <span>LOW</span>
              </div>
              <p className="mt-1.5 text-xs font-semibold text-[var(--landing-text)]">
                Gesture shortcuts
              </p>
              <div className="mt-2 text-[9px] font-mono text-[var(--landing-muted)]">
                0/2 tasks
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: IN PROGRESS */}
        <div
          className={`flex flex-col rounded-none border p-3 min-h-[310px] transition-colors duration-300 ${
            step === 1 || step === 2
              ? "border-[var(--landing-orange)] bg-[var(--landing-orange-soft)]/20"
              : "border-[var(--landing-line)] bg-[var(--landing-panel-strong)]/60"
          }`}
        >
          <div className="mb-3 flex items-center justify-between text-[10px] font-mono">
            <span
              className={`font-bold ${
                step === 1 || step === 2
                  ? "text-[var(--landing-orange)]"
                  : "text-[var(--landing-muted)]"
              }`}
            >
              IN PROGRESS
            </span>
            <span
              className={`rounded-none px-1.5 py-0.5 text-[10px] font-mono border ${
                step === 1 || step === 2
                  ? "border-[var(--landing-orange)] bg-[var(--landing-panel)] text-[var(--landing-orange)] font-bold"
                  : "border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-muted)]"
              }`}
            >
              {step === 1 || step === 2 ? "02" : "01"}
            </span>
          </div>

          <div className="space-y-2.5 flex-1">
            {/* The Active Hero Moving Card (In Progress when step === 1 or 2) */}
            {(step === 1 || step === 2) && (
              <div className="rounded-none border border-[var(--landing-orange)] bg-[var(--landing-panel)] p-3 shadow-lg transition-all duration-300 animate-fade-in-up">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="text-[var(--landing-orange)] font-bold">#frontend</span>
                  <span className="rounded-none bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] px-1 py-0.5 text-[8px] font-bold">
                    IN FLIGHT
                  </span>
                </div>
                <p className="mt-2 text-xs font-bold text-[var(--landing-text)]">
                  Launch page polish
                </p>

                {/* Animated Checklist & Progress Bar */}
                <div className="mt-2.5 space-y-1.5 rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-2">
                  <div className="flex items-center justify-between text-[9px] font-mono">
                    <span className="text-[var(--landing-muted)]">Execution</span>
                    <span className="text-[var(--landing-orange)] font-bold">
                      {step === 2 ? "100%" : "50%"}
                    </span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-none bg-[var(--landing-line)]">
                    <div
                      className="h-full bg-[var(--landing-orange)] transition-all duration-500 ease-out"
                      style={{ width: step === 2 ? "100%" : "50%" }}
                    />
                  </div>
                  <div className="pt-1 text-[9px] font-mono">
                    <div className="flex items-center gap-1.5 text-[var(--landing-text)]">
                      <span className="size-2.5 rounded-none bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] grid place-items-center text-[7px] font-bold">
                        ✓
                      </span>
                      <span className="line-through opacity-70">7XL layout grid</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-[var(--landing-text)]">
                      {step === 2 ? (
                        <>
                          <span className="size-2.5 rounded-none bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] grid place-items-center text-[7px] font-bold animate-pulse">
                            ✓
                          </span>
                          <span className="line-through text-[var(--landing-orange)] font-semibold transition-all">
                            Responsive typography
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="size-2.5 rounded-none border border-[var(--landing-orange)]" />
                          <span className="text-[var(--landing-muted)]">
                            Responsive typography
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Static Card in Progress */}
            <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-2.5">
              <div className="flex items-center justify-between text-[9px] font-mono text-[var(--landing-muted)]">
                <span>#backend</span>
                <span>URGENT</span>
              </div>
              <p className="mt-1.5 text-xs font-semibold text-[var(--landing-text)]">
                Clerk auth session
              </p>
              <div className="mt-2 text-[9px] font-mono text-[var(--landing-orange)]">
                1/2 tasks
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 3: DONE */}
        <div
          className={`flex flex-col rounded-none border p-3 min-h-[310px] transition-colors duration-300 ${
            step === 3
              ? "border-[var(--landing-orange)] bg-[var(--landing-orange-soft)]/20"
              : "border-[var(--landing-line)] bg-[var(--landing-panel-strong)]/60"
          }`}
        >
          <div className="mb-3 flex items-center justify-between text-[10px] font-mono">
            <span
              className={`font-bold ${
                step === 3 ? "text-[var(--landing-orange)]" : "text-[var(--landing-muted)]"
              }`}
            >
              DONE
            </span>
            <span
              className={`rounded-none px-1.5 py-0.5 text-[10px] font-mono border ${
                step === 3
                  ? "border-[var(--landing-orange)] bg-[var(--landing-panel)] text-[var(--landing-orange)] font-bold"
                  : "border-[var(--landing-line)] bg-[var(--landing-panel)] text-[var(--landing-muted)]"
              }`}
            >
              {step === 3 ? "02" : "01"}
            </span>
          </div>

          <div className="space-y-2.5 flex-1">
            {/* The Active Hero Moving Card (In Done when step === 3) */}
            {step === 3 && (
              <div className="rounded-none border border-[var(--landing-orange)] bg-[var(--landing-panel)] p-3 shadow-lg transition-all duration-300 animate-fade-in-up">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="text-[var(--landing-orange)] font-bold">#frontend</span>
                  <span className="flex items-center gap-1 rounded-none bg-[var(--landing-orange)]/20 px-1.5 py-0.5 text-[8px] font-bold text-[var(--landing-orange)]">
                    <Sparkles className="size-2.5" /> SHIPPED
                  </span>
                </div>
                <p className="mt-2 text-xs font-bold text-[var(--landing-text)] line-through opacity-85">
                  Launch page polish
                </p>
                <div className="mt-2.5 flex items-center justify-between border-t border-[var(--landing-line)] pt-2 text-[9px] font-mono text-[var(--landing-muted)]">
                  <span className="flex items-center gap-1 text-[var(--landing-orange)] font-bold">
                    <Check className="size-3" /> Audit log saved
                  </span>
                  <span>Just now</span>
                </div>
              </div>
            )}

            {/* Static Card in Done */}
            <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-2.5 opacity-80">
              <div className="flex items-center justify-between text-[9px] font-mono text-[var(--landing-muted)]">
                <span>#infra</span>
                <span className="text-[var(--landing-orange)]">✓ DONE</span>
              </div>
              <p className="mt-1.5 text-xs font-semibold text-[var(--landing-text)] line-through">
                Prisma 7 Postgres schema
              </p>
              <div className="mt-2 text-[9px] font-mono text-[var(--landing-muted)]">
                2/2 completed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Step Navigator at Bottom */}
      <div className="relative z-10 mt-4 border-t border-[var(--landing-line)] pt-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {stepLabels.map((s, idx) => (
            <button
              key={s.label}
              type="button"
              onClick={() => {
                setStep(idx);
                setIsPlaying(false);
              }}
              className={`rounded-none border p-2 text-left transition-all duration-200 cursor-pointer ${
                step === idx
                  ? "border-[var(--landing-orange)] bg-[var(--landing-orange-soft)]/30 shadow-xs"
                  : "border-[var(--landing-line)] bg-[var(--landing-panel-strong)]/40 hover:border-[var(--landing-orange)]/50"
              }`}
            >
              <div
                className={`text-[9px] font-mono font-bold ${
                  step === idx ? "text-[var(--landing-orange)]" : "text-[var(--landing-muted)]"
                }`}
              >
                {s.label}
              </div>
              <div className="mt-0.5 truncate text-[10px] font-medium text-[var(--landing-text)]">
                {s.desc}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
