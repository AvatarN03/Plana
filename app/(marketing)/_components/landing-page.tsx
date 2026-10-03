"use client";

import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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
      { name: "BUILDING", items: ["Hero 3D perspective plate", "Responsive nav"] },
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
      {/* Background Ambience */}
      <div className="mesh-flow pointer-events-none absolute inset-0" />
      <div className="landing-grid pointer-events-none absolute inset-0" />

      {/* ── HERO SECTION ── */}
      <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-28 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14 lg:pb-28 lg:pt-32">
        <div className="animate-fade-in-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--landing-line)] bg-[var(--landing-panel)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--landing-orange)]">
            <span className="size-2 rounded-full bg-[var(--landing-orange)] animate-pulse" />
            Kanban Workspace
          </div>

          <h1 className="max-w-xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl text-[var(--landing-text)]">
            Organize work.
            <br />
            <span className="text-[var(--landing-orange)]">
              Move it forward.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-[var(--landing-text)]/85 sm:text-xl">
            A focused workspace for turning projects, tasks, and ideas into
            clear workflows. Less noise. More momentum.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/sign-up"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-[var(--landing-orange)] px-6 text-sm font-bold text-[var(--landing-orange-foreground)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_rgba(255,118,25,0.35)]"
            >
              Get started <ArrowRight className="size-4" />
            </Link>
            <a
              href="#product"
              className="inline-flex h-12 items-center gap-2 rounded-lg border border-[var(--landing-line)] bg-[var(--landing-panel)] px-6 text-sm font-bold text-[var(--landing-text)] transition-all duration-200 hover:border-[var(--landing-orange)] hover:bg-[var(--landing-panel-strong)]"
            >
              Explore demo <Sparkles className="size-4 text-[var(--landing-orange)]" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-xs font-semibold text-[var(--landing-text)]/70">
            <span>Boards</span>
            <span>·</span>
            <span>Lists</span>
            <span>·</span>
            <span>Cards</span>
            <span>·</span>
            <span className="text-[var(--landing-orange)] font-bold">Movement</span>
            <span>·</span>
            <span>Progress</span>
          </div>
        </div>

        {/* Real Direct Kanban Board Image in Hero */}
        <div className="hero-board-perspective rounded-2xl border border-[var(--landing-line)] bg-[var(--landing-panel)] overflow-hidden shadow-2xl transition-all duration-300">
          <Image
            src="/hero-board.png"
            alt="Plana Kanban Board Workspace"
            width={712}
            height={573}
            priority
            className="w-full h-auto object-cover rounded-2xl select-none"
          />
        </div>
      </section>

      {/* ── 01. BOARDS SECTION ── */}
      <section
        id="product"
        className="relative scroll-mt-20 border-y border-[var(--landing-line)] bg-[var(--landing-panel)]/40 px-5 py-24"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-xl border border-[var(--landing-line)] bg-[var(--landing-panel)] p-2 shadow-xl hover:border-[var(--landing-orange)]/60 transition-colors duration-300">
            <Image
              src="/boards-preview.png"
              alt="Plana Board View"
              width={666}
              height={254}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          <div>
            <div className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[var(--landing-orange)]">
              01. Boards
            </div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl text-[var(--landing-text)]">
              Everything starts with a board
              <span className="text-[var(--landing-orange)]">.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg font-medium leading-relaxed text-[var(--landing-text)]/80">
              Boards give projects a visible structure. Instead of burying action items inside deep spreadsheet rows or buried Slack threads, Plana renders your entire delivery pipeline as a crisp horizontal landscape.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--landing-text)]/80">
              <span className="rounded-md border border-[var(--landing-line)] bg-[var(--landing-panel)] px-3.5 py-2">
                Idea → Backlog
              </span>
              <ChevronRight className="size-4 text-[var(--landing-orange)]" />
              <span className="rounded-md border border-[var(--landing-orange)] bg-[var(--landing-orange-soft)] px-3.5 py-2 text-[var(--landing-orange)] font-bold">
                In progress
              </span>
              <ChevronRight className="size-4 text-[var(--landing-orange)]" />
              <span className="rounded-md border border-[var(--landing-line)] bg-[var(--landing-panel)] px-3.5 py-2">
                Done
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. WORKFLOW SECTION ── */}
      <section
        id="workflow"
        className="relative scroll-mt-20 mx-auto max-w-6xl px-5 py-24"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[var(--landing-orange)]">
              02. Workflow
            </div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl text-[var(--landing-text)]">
              Turn ideas into an actual workflow
              <span className="text-[var(--landing-orange)]">.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg font-medium leading-relaxed text-[var(--landing-text)]/80">
              Start with raw thoughts in your backlog. Shape them into structured cards, estimate priorities, and glide them steadily through execution toward Done.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm font-semibold text-[var(--landing-text)]/80">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[var(--landing-orange)]" />
                Zero bloated forms — write only what is needed
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[var(--landing-orange)]" />
                Tactile rectangular cards with smooth rounded corners
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[var(--landing-orange)]" />
                Instant drag-and-drop feedback across lists
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-[var(--landing-line)] bg-[var(--landing-panel)] p-2 shadow-xl hover:border-[var(--landing-orange)]/60 transition-colors duration-300">
            <Image
              src="/workflow-preview.png"
              alt="Plana Workflow Illustration"
              width={602}
              height={462}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── 03. ACTIVITY & CARD ANATOMY ── */}
      <section
        id="activity"
        className="relative scroll-mt-20 border-y border-[var(--landing-line)] bg-[var(--landing-panel)]/40 px-5 py-24"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="rounded-xl border border-[var(--landing-line)] bg-[var(--landing-panel)] p-2 shadow-xl hover:border-[var(--landing-orange)]/60 transition-colors duration-300">
              <Image
                src="/activity-preview.png"
                alt="Workspace Activity Audit Stream"
                width={620}
                height={222}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div className="rounded-xl border border-[var(--landing-line)] bg-[var(--landing-panel)] p-2 shadow-xl hover:border-[var(--landing-orange)]/60 transition-colors duration-300">
              <Image
                src="/card-anatomy.png"
                alt="Card Anatomy Details"
                width={615}
                height={368}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>

          <div>
            <div className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[var(--landing-orange)]">
              03. Timeline &amp; Cards
            </div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl text-[var(--landing-text)]">
              Know what changed
              <span className="text-[var(--landing-orange)]">.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg font-medium leading-relaxed text-[var(--landing-text)]/80">
              Never ask &ldquo;what&apos;s the status of this ticket?&rdquo; in standup again. Plana logs every card movement, assignee change, and subtask completion into an immutable workspace activity stream.
            </p>
            <p className="mt-4 text-base sm:text-lg font-medium leading-relaxed text-[var(--landing-text)]/80">
              Click any card to reveal its full execution anatomy: interactive subtask checklists, assigned owners, due date warnings, and live revision histories.
            </p>
          </div>
        </div>
      </section>

      {/* ── 04. DYNAMIC INTERACTIVE WORKSPACES ── */}
      <section className="relative mx-auto max-w-6xl px-5 py-24">
        <div className="rounded-2xl border border-[var(--landing-line)] bg-[var(--landing-panel)] p-7 sm:p-10 shadow-2xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--landing-orange)]">
            04. Dynamic Workspaces
          </div>
          <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl text-[var(--landing-text)]">
            One workspace. Every project
            <span className="text-[var(--landing-orange)]">.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base sm:text-lg font-medium leading-relaxed text-[var(--landing-text)]/80">
            Organize multiple concurrent initiatives under a single cohesive roof. Click any project tab below to preview live boards and lists.
          </p>

          {/* Interactive Workspace Selectors */}
          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            {workspaces.map((ws, i) => (
              <button
                key={ws.name}
                type="button"
                onClick={() => setActiveWorkspace(i)}
                className={`rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                  activeWorkspace === i
                    ? "border-[var(--landing-orange)] bg-[var(--landing-orange-soft)] shadow-[0_0_20px_rgba(255,118,25,0.12)]"
                    : "border-[var(--landing-line)] bg-[var(--landing-panel-strong)] hover:border-[var(--landing-orange)]/60"
                }`}
              >
                <div className="flex justify-between text-xs font-bold text-[var(--landing-orange)]">
                  <span>0{i + 1}</span>
                  <span>{ws.tasks} tasks</span>
                </div>
                <p className="mt-2.5 text-sm font-bold text-[var(--landing-text)]">
                  {ws.name}
                </p>
                <p className="mt-1 text-xs font-medium leading-relaxed text-[var(--landing-text)]/70">
                  {ws.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Interactive Dynamic Board Preview */}
          <div
            key={activeWorkspace}
            className="mt-6 rounded-xl border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-5 animate-fade-in-up"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--landing-line)] pb-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-bold text-[var(--landing-text)]">
                  ACTIVE BOARD:{" "}
                  <span className="text-[var(--landing-orange)]">
                    {currentWorkspace.name}
                  </span>
                </span>
                <span className="rounded bg-[var(--landing-panel)] px-2 py-0.5 text-[11px] font-semibold text-[var(--landing-text)]/70">
                  {currentWorkspace.tag}
                </span>
              </div>
              <span className="text-xs font-semibold text-[var(--landing-text)]/70">
                {currentWorkspace.tasks} tracked cards · Live
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {currentWorkspace.lists.map((list) => (
                <div
                  key={list.name}
                  className="rounded-lg border border-[var(--landing-line)] bg-[var(--landing-panel)] p-3.5 shadow-sm transition-colors duration-200 hover:border-[var(--landing-orange)]/70"
                >
                  <div className="mb-3 flex items-center justify-between text-xs font-bold text-[var(--landing-text)]">
                    <span>{list.name}</span>
                    <span className="rounded bg-[var(--landing-panel-strong)] px-2 py-0.5 text-[10px] text-[var(--landing-orange)]">
                      {list.items.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {list.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-md border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-3 text-xs font-semibold text-[var(--landing-text)] transition-all duration-200 hover:border-[var(--landing-orange)] hover:translate-x-1"
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
      <section className="relative border-t border-[var(--landing-line)] px-5 py-28 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[var(--landing-orange)]">
            Get started today
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-[var(--landing-text)]">
            Put your work in motion
            <span className="text-[var(--landing-orange)]">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base sm:text-lg font-medium leading-relaxed text-[var(--landing-text)]/80">
            Plan clearly. Work together. Finish with confidence.
          </p>
          <Link
            href="/sign-up"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-[var(--landing-orange)] px-8 text-sm font-bold text-[var(--landing-orange-foreground)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_rgba(255,118,25,0.35)]"
          >
            Get started <ArrowRight className="size-4" />
          </Link>
          <p className="mt-6 text-xs font-semibold text-[var(--landing-text)]/60">
            No credit card required · Free workspaces · Export anytime
          </p>
        </div>
      </section>
    </div>
  );
}

