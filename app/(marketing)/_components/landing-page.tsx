"use client";

import { ArrowRight, ChevronRight, Sparkles, CheckSquare, Clock, Layers } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { HeroKanbanMotion } from "./hero-kanban-motion";

/* ── Interactive Workspaces for Section 04 ── */
const workspaces = [
  {
    name: "Product Launch",
    tasks: 9,
    tag: "Core Engineering",
    desc: "Cross-functional roadmap, sprint milestones, and launch readiness.",
    lists: [
      { name: "BACKLOG", items: ["Research competitors", "Define requirements", "User interviews"] },
      { name: "IN PROGRESS", items: ["Landing page redesign", "Dashboard UI", "Authentication flow"] },
      { name: "DONE", items: ["Design tokens", "Database schema", "Project setup"] },
    ],
  },
  {
    name: "Website Redesign",
    tasks: 6,
    tag: "Marketing & Brand",
    desc: "High-conversion marketing site, new branding, and performance audits.",
    lists: [
      { name: "IDEAS", items: ["Interactive workflow diagram", "Dark mode preview"] },
      { name: "BUILDING", items: ["Hero motion visual", "Responsive nav"] },
      { name: "DEPLOYED", items: ["Font Montserrat setup", "SEO metadata"] },
    ],
  },
  {
    name: "Mobile App",
    tasks: 7,
    tag: "Mobile Team",
    desc: "Native iOS & Android experience with offline caching and biometric auth.",
    lists: [
      { name: "TODO", items: ["Push notification service", "Biometric unlock"] },
      { name: "IN DEV", items: ["Offline SQLite cache", "Card gestures", "Token refresh"] },
      { name: "SHIPPED", items: ["App icon pack", "Splash screen"] },
    ],
  },
  {
    name: "Personal Tasks",
    tasks: 5,
    tag: "Individual Focus",
    desc: "Focused daily execution, reading list, and developer workflow notes.",
    lists: [
      { name: "TODAY", items: ["Merge pull request #42", "Audit log query index"] },
      { name: "THIS WEEK", items: ["Turbopack build optimizations", "API caching"] },
      { name: "DONE", items: ["Prisma schema push"] },
    ],
  },
];

export function LandingPage() {
  const [activeWorkspace, setActiveWorkspace] = useState(0);
  const currentWorkspace = workspaces[activeWorkspace];

  return (
    <div className="relative overflow-hidden">
      {/* ── HERO SECTION ── */}
      <section className="relative mx-auto grid max-w-7xl 2xl:max-w-[1440px] items-center gap-10 px-4 sm:px-6 lg:px-8 pb-16 pt-10 sm:pt-14 sm:pb-24 lg:grid-cols-2 lg:gap-12 lg:pt-16">
        <div className="animate-fade-in-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--landing-orange)]">
            <span className="size-1.5 rounded-none bg-[var(--landing-orange)]" />
            Kanban Workspace
          </div>

          <h1 className="max-w-xl text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-[var(--landing-text)]">
            Organize work.
            <br />
            <span className="text-[var(--landing-orange)]">
              Move it forward.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-[var(--landing-muted)]">
            A focused workspace for turning projects, tasks, and ideas into
            clear workflows. Less noise. More momentum.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/sign-up"
              className="inline-flex h-10 items-center gap-2 rounded-none bg-[var(--landing-orange)] px-5 text-sm font-semibold text-[var(--landing-orange-foreground)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,118,25,0.3)]"
            >
              Get started <ArrowRight className="size-4" />
            </Link>
            <a
              href="#product"
              className="inline-flex h-10 items-center gap-2 rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] px-5 text-sm font-semibold text-[var(--landing-text)] transition-all duration-200 hover:border-[var(--landing-orange)] hover:bg-[var(--landing-panel-strong)]"
            >
              Explore demo <Sparkles className="size-4 text-[var(--landing-orange)]" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2.5 text-[11px] font-mono font-medium text-[var(--landing-muted)]">
            <span>BOARDS</span>
            <span>·</span>
            <span>LISTS</span>
            <span>·</span>
            <span>CARDS</span>
            <span>·</span>
            <span className="text-[var(--landing-orange)] font-bold">MOVEMENT</span>
            <span>·</span>
            <span>PROGRESS</span>
          </div>
        </div>

        {/* Right Visual Area: Live Autoplay Kanban Motion */}
        <HeroKanbanMotion />
      </section>

      {/* ── 01. BOARDS SECTION ── */}
      <section
        id="product"
        className="relative scroll-mt-20 px-4 sm:px-6 lg:px-8 py-20 sm:py-24"
      >
        <div className="mx-auto grid max-w-7xl 2xl:max-w-[1440px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Live Crisp Micro-Board Preview (Productivity-First) */}
          <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--landing-line)] pb-3 text-xs font-mono">
              <span className="flex items-center gap-2 font-bold text-[var(--landing-text)]">
                <Layers className="size-3.5 text-[var(--landing-orange)]" /> SPRINT BOARD VIEW
              </span>
              <span className="text-[var(--landing-orange)] font-semibold">WIP: 3 CARDS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Backlog */}
              <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--landing-muted)]">
                  <span>BACKLOG</span>
                  <span className="rounded-none bg-[var(--landing-panel)] px-1.5 py-0.5 text-[10px]">2</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-2.5">
                    <span className="text-[9px] font-mono text-[var(--landing-orange)]">#research</span>
                    <p className="mt-1 text-xs font-semibold text-[var(--landing-text)]">Competitor benchmark</p>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--landing-muted)] font-mono">
                      <span>✓ 2/3 done</span>
                      <span>Oct 28</span>
                    </div>
                  </div>
                  <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-2.5">
                    <span className="text-[9px] font-mono text-[var(--landing-muted)]">#specs</span>
                    <p className="mt-1 text-xs font-semibold text-[var(--landing-text)]">Define v2 roadmap</p>
                  </div>
                </div>
              </div>

              {/* In Progress */}
              <div className="rounded-none border border-[var(--landing-orange)] bg-[var(--landing-orange-soft)]/40 p-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--landing-orange)] font-bold">
                  <span>IN PROGRESS</span>
                  <span className="rounded-none bg-[var(--landing-orange)]/20 px-1.5 py-0.5 text-[10px] text-[var(--landing-orange)]">2</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="rounded-none border border-[var(--landing-orange)] bg-[var(--landing-panel)] p-2.5 shadow-sm">
                    <span className="text-[9px] font-mono text-[var(--landing-orange)] font-bold">#frontend · HIGH</span>
                    <p className="mt-1 text-xs font-semibold text-[var(--landing-text)]">Landing page polish</p>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--landing-muted)] font-mono">
                      <span>✓ 3/3 done</span>
                      <span className="text-[var(--landing-orange)] font-semibold">Today</span>
                    </div>
                  </div>
                  <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-2.5">
                    <span className="text-[9px] font-mono text-[var(--landing-orange)]">#backend</span>
                    <p className="mt-1 text-xs font-semibold text-[var(--landing-text)]">Clerk auth routing</p>
                  </div>
                </div>
              </div>

              {/* Done */}
              <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-[var(--landing-muted)]">
                  <span>DONE</span>
                  <span className="rounded-none bg-[var(--landing-panel)] px-1.5 py-0.5 text-[10px]">2</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-2.5 opacity-80">
                    <span className="text-[9px] font-mono text-[var(--landing-muted)]">#infra</span>
                    <p className="mt-1 text-xs font-semibold text-[var(--landing-text)] line-through">Prisma schema v7</p>
                    <span className="mt-2 block text-[10px] font-mono text-[var(--landing-orange)]">✓ Completed</span>
                  </div>
                  <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-2.5 opacity-80">
                    <span className="text-[9px] font-mono text-[var(--landing-muted)]">#design</span>
                    <p className="mt-1 text-xs font-semibold text-[var(--landing-text)] line-through">Design system</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 inline-block text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--landing-orange)]">
              01. Boards
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-[var(--landing-text)]">
              Everything starts with a board
              <span className="text-[var(--landing-orange)]">.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base font-normal leading-relaxed text-[var(--landing-muted)]">
              Boards give projects a visible structure. Instead of burying action items inside deep spreadsheet rows or buried chat threads, Plana renders your entire delivery pipeline as a crisp horizontal landscape.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-mono font-semibold text-[var(--landing-text)]/80">
              <span className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] px-3.5 py-2">
                Idea → Backlog
              </span>
              <ChevronRight className="size-4 text-[var(--landing-orange)]" />
              <span className="rounded-none border border-[var(--landing-orange)] bg-[var(--landing-orange-soft)] px-3.5 py-2 text-[var(--landing-orange)] font-bold">
                In progress
              </span>
              <ChevronRight className="size-4 text-[var(--landing-orange)]" />
              <span className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] px-3.5 py-2">
                Done
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. WORKFLOW SECTION ── */}
      <section
        id="workflow"
        className="relative scroll-mt-20 mx-auto max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-20 sm:py-24"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="mb-3 inline-block text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--landing-orange)]">
              02. Workflow
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-[var(--landing-text)]">
              Turn ideas into an actual workflow
              <span className="text-[var(--landing-orange)]">.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base font-normal leading-relaxed text-[var(--landing-muted)]">
              Start with raw thoughts in your backlog. Shape them into structured cards, estimate priorities, and glide them steadily through execution toward Done.
            </p>
            <ul className="mt-6 space-y-3 text-sm font-semibold text-[var(--landing-text)]/80">
              <li className="flex items-center gap-2.5">
                <span className="size-1.5 rounded-none bg-[var(--landing-orange)]" />
                Zero bloated forms — write only what is needed
              </li>
              <li className="flex items-center gap-2.5">
                <span className="size-1.5 rounded-none bg-[var(--landing-orange)]" />
                Tactile rectangular cards with sharp edges
              </li>
              <li className="flex items-center gap-2.5">
                <span className="size-1.5 rounded-none bg-[var(--landing-orange)]" />
                Instant drag-and-drop feedback across lists
              </li>
            </ul>
          </div>

          {/* Productivity Pipeline Diagram Component */}
          <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--landing-line)] pb-3 text-xs font-mono">
              <span className="text-[var(--landing-text)] font-bold">PIPELINE EXECUTION MODEL</span>
              <span className="text-[var(--landing-orange)] font-semibold">3-STAGE FLOW</span>
            </div>

            <div className="space-y-3">
              {/* Step 1: Capture */}
              <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-3.5 flex items-start gap-3.5">
                <div className="grid size-7 place-items-center rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] text-xs font-mono font-bold text-[var(--landing-orange)] shrink-0">
                  01
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--landing-text)]">Capture &amp; Triage</h4>
                  <p className="mt-1 text-xs text-[var(--landing-muted)]">Instant single-click card creation without configuration overhead.</p>
                </div>
              </div>

              {/* Step 2: Prioritize */}
              <div className="rounded-none border border-[var(--landing-orange)] bg-[var(--landing-orange-soft)]/35 p-3.5 flex items-start gap-3.5">
                <div className="grid size-7 place-items-center rounded-none bg-[var(--landing-orange)] text-xs font-mono font-bold text-[var(--landing-orange-foreground)] shrink-0">
                  02
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--landing-text)]">Prioritize &amp; Schedule</h4>
                  <p className="mt-1 text-xs text-[var(--landing-muted)]">Set urgent tags, assign due dates, and track delivery deadlines.</p>
                </div>
              </div>

              {/* Step 3: Complete */}
              <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-3.5 flex items-start gap-3.5">
                <div className="grid size-7 place-items-center rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] text-xs font-mono font-bold text-[var(--landing-orange)] shrink-0">
                  03
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--landing-text)]">Ship &amp; Audit</h4>
                  <p className="mt-1 text-xs text-[var(--landing-muted)]">Drag into Done with immutable workspace audit logs recorded in real time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03. ACTIVITY & CARD ANATOMY ── */}
      <section
        id="activity"
        className="relative scroll-mt-20 px-4 sm:px-6 lg:px-8 py-20 sm:py-24"
      >
        <div className="mx-auto grid max-w-7xl 2xl:max-w-[1440px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            {/* Live Audit Log Feed */}
            <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-4 shadow-xl">
              <div className="mb-3 flex items-center justify-between border-b border-[var(--landing-line)] pb-2.5 text-xs font-mono">
                <span className="font-bold text-[var(--landing-text)]">WORKSPACE ACTIVITY AUDIT</span>
                <span className="text-[var(--landing-orange)] font-semibold">● ACTIVE STREAM</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-none bg-[var(--landing-orange)]" />
                    <span className="font-semibold text-[var(--landing-text)]">Keshav moved Landing Page to In Progress</span>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--landing-muted)]">3m ago</span>
                </div>
                <div className="flex items-center justify-between rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-none bg-[var(--landing-orange)]" />
                    <span className="font-semibold text-[var(--landing-text)]">Ozair completed Database Schema in Done</span>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--landing-muted)]">18m ago</span>
                </div>
                <div className="flex items-center justify-between rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 rounded-none bg-[var(--landing-muted)]" />
                    <span className="font-semibold text-[var(--landing-text)]">Raj added checklist to Authentication</span>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--landing-muted)]">45m ago</span>
                </div>
              </div>
            </div>

            {/* Live Card Anatomy Component */}
            <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-4 shadow-xl">
              <div className="mb-3 flex items-center justify-between border-b border-[var(--landing-line)] pb-2.5 text-xs font-mono">
                <span className="text-[var(--landing-orange)] font-bold">#backend / TASK-04</span>
                <span className="rounded-none bg-[var(--landing-orange)]/15 px-2 py-0.5 text-[10px] text-[var(--landing-orange)] font-bold">HIGH PRIORITY</span>
              </div>
              <h3 className="text-sm font-bold text-[var(--landing-text)]">Authentication &amp; Organization Roles</h3>
              <div className="mt-3 rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--landing-muted)]">
                  <span className="flex items-center gap-1.5 font-semibold text-[var(--landing-text)]">
                    <CheckSquare className="size-3 text-[var(--landing-orange)]" /> Checklist (2/4)
                  </span>
                  <span>50%</span>
                </div>
                <div className="mt-2 space-y-1.5 text-xs text-[var(--landing-text)]">
                  <div className="flex items-center gap-2 text-[var(--landing-muted)] line-through">
                    <span className="size-3 rounded-none bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] grid place-items-center text-[8px]">✓</span>
                    Configure OAuth 2.0 PKCE flow
                  </div>
                  <div className="flex items-center gap-2 text-[var(--landing-muted)] line-through">
                    <span className="size-3 rounded-none bg-[var(--landing-orange)] text-[var(--landing-orange-foreground)] grid place-items-center text-[8px]">✓</span>
                    Define workspace role access control
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-none border border-[var(--landing-line)]" />
                    Audit session token expiration
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-[var(--landing-muted)]">
                <span>Owner: Keshav (Lead)</span>
                <span className="flex items-center gap-1 text-[var(--landing-orange)] font-semibold">
                  <Clock className="size-3" /> Due Oct 28
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 inline-block text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--landing-orange)]">
              03. Timeline &amp; Cards
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-[var(--landing-text)]">
              Know what changed
              <span className="text-[var(--landing-orange)]">.</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base font-normal leading-relaxed text-[var(--landing-muted)]">
              Never ask for status updates in standup again. Plana logs every card movement, assignee change, and task completion into an immutable workspace activity stream.
            </p>
            <p className="mt-3 text-sm sm:text-base font-normal leading-relaxed text-[var(--landing-muted)]">
              Click any card to reveal its full execution anatomy: interactive subtask checklists, assigned owners, due date warnings, and live revision histories.
            </p>
          </div>
        </div>
      </section>

      {/* ── 04. DYNAMIC INTERACTIVE WORKSPACES ── */}
      <section id="workspaces" className="relative scroll-mt-20 mx-auto max-w-7xl 2xl:max-w-[1440px] px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-6 sm:p-8 shadow-2xl">
          <div className="mb-3 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--landing-orange)]">
            04. Dynamic Workspaces
          </div>
          <h2 className="max-w-xl text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-[var(--landing-text)]">
            One workspace. Every project
            <span className="text-[var(--landing-orange)]">.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base font-normal leading-relaxed text-[var(--landing-muted)]">
            Organize multiple concurrent initiatives under a single cohesive roof. Click any project tab below to preview live boards and lists.
          </p>

          {/* Interactive Workspace Selectors */}
          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            {workspaces.map((ws, i) => (
              <button
                key={ws.name}
                type="button"
                onClick={() => setActiveWorkspace(i)}
                className={`rounded-none border p-3.5 text-left transition-all duration-200 cursor-pointer ${
                  activeWorkspace === i
                    ? "border-[var(--landing-orange)] bg-[var(--landing-orange-soft)] shadow-[0_0_16px_rgba(255,118,25,0.15)]"
                    : "border-[var(--landing-line)] bg-[var(--landing-panel-strong)] hover:border-[var(--landing-orange)]/60"
                }`}
              >
                <div className="flex justify-between text-xs font-mono font-bold text-[var(--landing-orange)]">
                  <span>0{i + 1}</span>
                  <span>{ws.tasks} tasks</span>
                </div>
                <p className="mt-2 text-sm font-bold text-[var(--landing-text)]">
                  {ws.name}
                </p>
                <p className="mt-1 text-xs font-medium leading-relaxed text-[var(--landing-muted)]">
                  {ws.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Interactive Dynamic Board Preview */}
          <div
            key={activeWorkspace}
            className="mt-6 rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-4 sm:p-5 animate-fade-in-up"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--landing-line)] pb-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-none bg-[var(--landing-orange)]" />
                <span className="text-sm font-bold text-[var(--landing-text)]">
                  ACTIVE BOARD:{" "}
                  <span className="text-[var(--landing-orange)]">
                    {currentWorkspace.name}
                  </span>
                </span>
                <span className="rounded-none bg-[var(--landing-panel)] px-2 py-0.5 text-[11px] font-mono text-[var(--landing-muted)]">
                  {currentWorkspace.tag}
                </span>
              </div>
              <span className="text-xs font-mono text-[var(--landing-muted)]">
                {currentWorkspace.tasks} tracked cards · Live
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {currentWorkspace.lists.map((list) => (
                <div
                  key={list.name}
                  className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel)] p-3 shadow-sm transition-colors duration-200 hover:border-[var(--landing-orange)]/70"
                >
                  <div className="mb-3 flex items-center justify-between text-xs font-mono font-bold text-[var(--landing-text)]">
                    <span>{list.name}</span>
                    <span className="rounded-none bg-[var(--landing-panel-strong)] px-2 py-0.5 text-[10px] text-[var(--landing-orange)]">
                      {list.items.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {list.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-none border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-2.5 text-xs font-semibold text-[var(--landing-text)] transition-all duration-200 hover:border-[var(--landing-orange)] hover:translate-x-0.5"
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

      {/* ── CALL TO ACTION ── */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-3 inline-block text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[var(--landing-orange)]">
            Get started today
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--landing-text)]">
            Put your work in motion
            <span className="text-[var(--landing-orange)]">.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm sm:text-base font-normal leading-relaxed text-[var(--landing-muted)]">
            Plan clearly. Work together. Finish with confidence.
          </p>
          <Link
            href="/sign-up"
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-none bg-[var(--landing-orange)] px-8 text-sm font-bold text-[var(--landing-orange-foreground)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,118,25,0.3)]"
          >
            Get started <ArrowRight className="size-4" />
          </Link>
          <p className="mt-5 text-xs font-mono text-[var(--landing-muted)]">
            No credit card required · Free workspaces · Export anytime
          </p>
        </div>
      </section>
    </div>
  );
}
