"use client";

import { ArrowRight, ChevronRight, Radio, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const heroTasks = [
  "Research competitors",
  "Landing page",
  "Authentication",
  "Database schema",
];

function Task({
  title,
  done = false,
  accent = false,
}: {
  title: string;
  done?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`border p-2.5 ${
        accent
          ? "border-[var(--landing-orange)]"
          : "border-[var(--landing-line)]"
      } bg-[var(--landing-panel)]`}
    >
      <div className="flex items-center justify-between text-[9px] font-mono text-[var(--landing-orange)]">
        <span>#work</span>
        {accent && <span className="size-1.5 rounded-full bg-red-500" />}
      </div>
      <p
        className={`mt-1.5 text-[11px] font-semibold leading-tight ${
          done
            ? "line-through text-[var(--landing-muted)]"
            : "text-[var(--landing-text)]"
        }`}
      >
        {title}
      </p>
      <div className="mt-2 text-[9px] font-mono text-[var(--landing-muted)]">
        <span className="text-emerald-500">✓ 2/3</span> &nbsp;◷ Oct 28
      </div>
    </div>
  );
}

function Board({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`${
        compact ? "" : "hero-board"
      } border border-[var(--landing-line)] bg-[var(--landing-panel)] shadow-[0_25px_80px_rgba(0,0,0,0.35)] ${
        compact ? "p-4" : ""
      }`}
    >
      <div className="flex h-10 items-center justify-between border-b border-[var(--landing-line)] px-3 text-[10px] font-mono text-[var(--landing-muted)]">
        <span className="flex items-center gap-2">
          <span className="flex gap-1">
            <i className="size-2 rounded-full bg-red-500" />
            <i className="size-2 rounded-full bg-amber-400" />
            <i className="size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="hidden sm:inline">
            plana.app / workspace / product-launch
          </span>
        </span>
        <span className="text-emerald-500">● live</span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 overflow-hidden p-3 sm:p-4">
        <div className="min-w-[145px] border border-[var(--landing-line)] p-2">
          <div className="mb-2 text-[9px] font-mono text-[var(--landing-text)]">
            BACKLOG{" "}
            <span className="float-right text-[var(--landing-muted)]">2 +</span>
          </div>
          <Task title={heroTasks[0]} />
          <div className="mt-2">
            <Task title="Define requirements" />
          </div>
        </div>
        <div className="min-w-[145px] border border-[var(--landing-orange)] p-2">
          <div className="mb-2 text-[9px] font-mono text-[var(--landing-orange)]">
            TODO <span className="float-right">3 +</span>
          </div>
          <Task title={heroTasks[1]} accent />
          <div className="mt-2">
            <Task title={heroTasks[2]} />
          </div>
          <div className="mt-2">
            <Task title={heroTasks[3]} />
          </div>
        </div>
        <div className="min-w-[145px] border border-[var(--landing-line)] p-2">
          <div className="mb-2 text-[9px] font-mono text-emerald-500">
            DONE <span className="float-right">2 +</span>
          </div>
          <Task title="Project setup" done />
          <div className="mt-2">
            <Task title="Design system" done />
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--landing-line)] px-4 py-2 text-[9px] font-mono text-[var(--landing-muted)]">
        <span className="text-[var(--landing-orange)]">●</span> Click a card to
        inspect · Drag to advance columns
      </div>
    </div>
  );
}

function HeroPhotoCollage() {
  return (
    <div className="hero-collage" aria-label="A calm, organized workspace with notes and a laptop">
      <div
        className="hero-photo hero-photo-left"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85)",
        }}
      >
        <span className="hero-photo-label">01 / focus</span>
      </div>
      <div
        className="hero-photo hero-photo-main"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1400&q=85)",
        }}
      >
        <div className="hero-photo-note">
          <span className="hero-photo-note-dot" />
          <span>make space for good work</span>
        </div>
      </div>
      <div
        className="hero-photo hero-photo-right"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1100&q=85)",
        }}
      >
        <span className="hero-photo-label">02 / flow</span>
      </div>
      <div className="hero-collage-caption">
        <span>Plana workspace</span>
        <span>clear / calm / moving</span>
      </div>
    </div>
  );
}

const workspaces = [
  {
    name: "Product Launch",
    tasks: 6,
    desc: "Cross-functional roadmap, sprint milestones, and launch readiness.",
    lists: [
      { name: "BACKLOG", items: ["Competitor benchmarking", "User persona interviews"] },
      { name: "IN PROGRESS", items: ["Stripe webhook handling", "Onboarding flow"] },
      { name: "DONE", items: ["Design system", "Landing page"] },
    ],
  },
  {
    name: "Website Redesign",
    tasks: 5,
    desc: "High-conversion marketing site, new branding, and performance audits.",
    lists: [
      { name: "IDEAS", items: ["Interactive workflow diagram", "Dark mode preview"] },
      { name: "BUILDING", items: ["Hero 3D perspective plate", "Responsive nav"] },
      { name: "DEPLOYED", items: ["Font Montserrat setup"] },
    ],
  },
  {
    name: "Mobile App",
    tasks: 6,
    desc: "Native iOS & Android experience with offline caching and biometric auth.",
    lists: [
      { name: "TODO", items: ["Push notification service", "Biometric unlock"] },
      { name: "IN DEV", items: ["Offline SQLite cache", "Card gestures"] },
      { name: "SHIPPED", items: ["OAuth token refresh", "App icon pack"] },
    ],
  },
  {
    name: "Personal Tasks",
    tasks: 4,
    desc: "Focused daily execution, reading list, and developer workflow notes.",
    lists: [
      { name: "TODAY", items: ["Merge pull request #42", "Audit log query index"] },
      { name: "THIS WEEK", items: ["Turbopack build optimizations"] },
      { name: "DONE", items: ["Prisma schema push"] },
    ],
  },
];

export function LandingPage() {
  const [active, setActive] = useState(0);
  const currentWorkspace = workspaces[active];

  return (
    <div className="relative overflow-hidden">
      <div className="mesh-flow pointer-events-none absolute inset-0" />
      <div className="landing-grid pointer-events-none absolute inset-0" />

      {/* Hero */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-20 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14 lg:pb-28 lg:pt-28">
        <div>
          <div className="mb-7 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--landing-orange)]">
            <span className="size-1.5 bg-[var(--landing-orange)]" /> Kanban workspace
          </div>
          <h1 className="max-w-xl text-5xl font-bold leading-[0.98] tracking-[-0.07em] sm:text-7xl">
            Organize work.
            <br />
            <span className="text-[var(--landing-orange)]">Move it forward.</span>
          </h1>
          <p className="mt-7 max-w-md text-base font-medium leading-7 text-[var(--landing-text)]/80 sm:text-lg">
            A focused workspace for turning projects, tasks, and ideas into clear workflows. Less noise. More momentum.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/sign-up"
              className="inline-flex h-11 items-center gap-2 bg-[var(--landing-orange)] px-5 text-xs font-bold text-[var(--landing-orange-foreground)] transition hover:brightness-110"
            >
              Get started <ArrowRight className="size-4" />
            </Link>
            <a
              href="#product"
              className="inline-flex h-11 items-center gap-2 border border-[var(--landing-line)] bg-[var(--landing-panel)] px-5 text-xs font-semibold text-[var(--landing-text)] transition hover:border-[var(--landing-orange)]"
            >
              Explore the workspace <Sparkles className="size-3.5 text-[var(--landing-orange)]" />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-[10px] font-mono text-[var(--landing-muted)]">
            <span>Boards</span>
            <span>·</span>
            <span>Lists</span>
            <span>·</span>
            <span>Cards</span>
            <span>·</span>
            <span className="text-[var(--landing-orange)]">Movement</span>
            <span>·</span>
            <span>Progress</span>
          </div>
        </div>
        <HeroPhotoCollage />
      </section>

      {/* 01. Boards */}
      <section
        id="product"
        className="relative scroll-mt-20 border-y border-[var(--landing-line)] bg-[var(--landing-panel)]/50 px-5 py-20"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="order-2 lg:order-1">
            <div className="mb-5 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--landing-orange)]">
              01. Boards
            </div>
            <h2 className="max-w-lg text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
              Everything starts with a board
              <span className="text-[var(--landing-orange)]">.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[var(--landing-muted)]">
              Give every project a visible structure. Shape a workflow that makes the next step obvious to every designer, developer, and product owner.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-2 text-[10px] font-mono text-[var(--landing-muted)]">
              <span className="border border-[var(--landing-line)] bg-[var(--landing-panel)] px-3 py-2">
                Idea → Backlog
              </span>
              <ChevronRight className="size-3" />
              <span className="border border-[var(--landing-orange)] bg-[var(--landing-orange-soft)] px-3 py-2 text-[var(--landing-orange)]">
                In progress
              </span>
              <ChevronRight className="size-3" />
              <span className="border border-[var(--landing-line)] bg-[var(--landing-panel)] px-3 py-2">
                Done
              </span>
            </div>
          </div>
          <Board compact />
        </div>
      </section>

      {/* 02. Workflow */}
      <section
        id="workflow"
        className="relative scroll-mt-20 mx-auto max-w-6xl px-5 py-20"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <div className="mb-5 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--landing-orange)]">
              02. Workflow
            </div>
            <h2 className="max-w-md text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
              Turn ideas into an actual workflow
              <span className="text-[var(--landing-orange)]">.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--landing-muted)]">
              Start with raw thoughts in your backlog. Shape them into structured cards, prioritize, and guide them steadily through execution.
            </p>
          </div>
          <div className="border border-[var(--landing-line)] bg-[var(--landing-panel)] p-5">
            <div className="border-b border-[var(--landing-line)] pb-3 text-[10px] font-mono">
              <span className="mr-2 text-[var(--landing-orange)]">■</span> PLAN.01 // CAPTURE
            </div>
            <div className="grid min-h-[230px] place-items-center bg-[linear-gradient(90deg,transparent_49.8%,var(--landing-line)_50%,transparent_50.2%),linear-gradient(0deg,transparent_49.8%,var(--landing-line)_50%,transparent_50.2%)] bg-[size:33.33%_100%,100%_50%]">
              <div className="flex items-center gap-3 sm:gap-7">
                <div className="space-y-4">
                  <div className="w-24 -rotate-3 border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-3 text-[10px] text-[var(--landing-muted)]">
                    ──────<br />────<br />───●
                  </div>
                  <div className="w-24 rotate-2 border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-3 text-[10px] text-[var(--landing-muted)]">
                    ────<br />──────<br />────────
                  </div>
                </div>
                <span className="text-2xl text-[var(--landing-orange)]">→</span>
                <span className="grid size-16 place-items-center bg-[var(--landing-text)] text-2xl text-[var(--landing-bg)] font-mono">
                  ●
                </span>
                <span className="text-2xl text-[var(--landing-orange)]">→</span>
                <div className="w-28 border border-[var(--landing-orange)] bg-[var(--landing-panel-strong)] p-3 text-[10px] text-[var(--landing-muted)]">
                  ━━━━━━<br />──────<br />──□
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Activity */}
      <section
        id="activity"
        className="relative scroll-mt-20 border-y border-[var(--landing-line)] bg-[var(--landing-panel)]/50 px-5 py-20"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border border-[var(--landing-line)] bg-[var(--landing-panel)] p-4">
            <div className="flex items-center justify-between border-b border-[var(--landing-line)] pb-4 text-[10px] font-mono">
              <span className="flex items-center gap-2 font-bold text-[var(--landing-text)]">
                <Radio className="size-3 text-emerald-500" /> WORKSPACE ACTIVITY AUDIT
              </span>
              <span className="text-emerald-500">● STREAM ACTIVE</span>
            </div>
            {[
              "Prashanth moved 'Landing Page' to In Progress.",
              "Aditi completed 'Database Schema' in Done.",
              "Rahul added a checklist to 'Authentication'.",
            ].map((item, i) => (
              <div
                key={item}
                className="flex items-start gap-3 border-b border-[var(--landing-line)] py-4 text-[10px] last:border-b-0"
              >
                <span className="grid size-5 shrink-0 place-items-center bg-[var(--landing-orange)] text-[9px] font-bold text-[var(--landing-orange-foreground)]">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-[var(--landing-text)]">{item}</p>
                  <p className="mt-1 font-mono text-[9px] text-[var(--landing-muted)]">
                    {i * 15 + 5} minutes ago · Product Launch
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="mb-5 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--landing-orange)]">
              03. Timeline
            </div>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
              Know what changed<span className="text-[var(--landing-orange)]">.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--landing-muted)]">
              Never ask “what’s the status of this ticket?” in standup again. Every movement, assignee change, and completion lives in one clear activity stream.
            </p>
          </div>
        </div>
      </section>

      {/* 04. Workspace */}
      <section className="relative mx-auto max-w-6xl px-5 py-20">
        <div className="border border-[var(--landing-line)] bg-[var(--landing-panel)] p-7 sm:p-10">
          <div className="mb-5 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--landing-orange)]">
            04. Workspace
          </div>
          <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
            One workspace. Every project
            <span className="text-[var(--landing-orange)]">.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--landing-muted)]">
            Organize concurrent initiatives under a single cohesive roof. Jump between active releases, design sprints, and personal focus boards.
          </p>

          <div className="mt-8 grid gap-2 sm:grid-cols-4">
            {workspaces.map((ws, i) => (
              <button
                key={ws.name}
                type="button"
                onClick={() => setActive(i)}
                className={`border p-4 text-left transition cursor-pointer ${
                  active === i
                    ? "border-[var(--landing-orange)] bg-[var(--landing-orange-soft)]"
                    : "border-[var(--landing-line)] bg-[var(--landing-panel)] hover:border-[var(--landing-orange)]"
                }`}
              >
                <div className="flex justify-between text-[9px] font-mono text-[var(--landing-orange)]">
                  <span>0{i + 1}</span>
                  <span>{ws.tasks} tasks</span>
                </div>
                <p className="mt-3 text-xs font-bold text-[var(--landing-text)]">{ws.name}</p>
                <p className="mt-1 text-[10px] leading-4 text-[var(--landing-muted)]">
                  {ws.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Interactive Workspace Board Preview */}
          <div className="mt-6 border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-4">
            <div className="mb-3 flex items-center justify-between text-[10px] font-mono text-[var(--landing-muted)]">
              <span className="font-semibold text-[var(--landing-text)]">
                ACTIVE WORKSPACE: <span className="text-[var(--landing-orange)]">{currentWorkspace.name}</span>
              </span>
              <span>{currentWorkspace.tasks} tracked cards</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {currentWorkspace.lists.map((list) => (
                <div
                  key={list.name}
                  className="border border-[var(--landing-line)] bg-[var(--landing-panel)] p-3"
                >
                  <div className="mb-2 flex items-center justify-between text-[9px] font-mono text-[var(--landing-muted)]">
                    <span className="font-bold text-[var(--landing-text)]">{list.name}</span>
                    <span>{list.items.length}</span>
                  </div>
                  <div className="space-y-2">
                    {list.items.map((item) => (
                      <div
                        key={item}
                        className="border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-2 text-[11px] font-medium text-[var(--landing-text)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-[var(--landing-line)] px-5 py-28 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-5 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--landing-orange)]">
            Get started today
          </div>
          <h2 className="text-5xl font-semibold tracking-[-0.07em] sm:text-6xl">
            Put your work in motion
            <span className="text-[var(--landing-orange)]">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[var(--landing-muted)]">
            Plan clearly. Work together. Finish with confidence.
          </p>
          <Link
            href="/sign-up"
            className="mt-8 inline-flex h-11 items-center gap-2 bg-[var(--landing-orange)] px-6 text-xs font-bold text-[var(--landing-orange-foreground)] transition hover:brightness-110"
          >
            Get started <ArrowRight className="size-4" />
          </Link>
          <p className="mt-7 text-[10px] font-mono text-[var(--landing-muted)]">
            No credit card required · Free workspaces · Export anytime
          </p>
        </div>
      </section>
    </div>
  );
}
