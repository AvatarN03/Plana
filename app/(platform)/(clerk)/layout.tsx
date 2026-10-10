"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Check, Layers, MoveRight, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "../../(marketing)/_components/theme-toggle";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="landing-shell min-h-screen bg-[var(--landing-bg)] text-[var(--landing-text)] transition-colors duration-300">
      {/* Top Bar */}
      <header className="flex h-16 items-center justify-between border-b border-[var(--landing-line)] px-5 sm:px-8 bg-[var(--landing-bg)]">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold tracking-[0.08em] text-[var(--landing-text)] hover:opacity-90 transition-opacity"
        >
          <Image
            src="/plana-icon.svg"
            alt="Plana"
            width={18}
            height={18}
            className="project-logo h-[18px] w-[18px]"
          />
          <span>PLANA</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-[10px] font-mono tracking-wider text-[var(--landing-muted)] sm:inline">
            WORKSPACE ACCESS
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Auth Split */}
      <main className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[1.1fr_480px] xl:grid-cols-[1.25fr_500px]">
        {/* Left Visual Showcase (Desktop) */}
        <section className="relative hidden overflow-hidden border-r border-[var(--landing-line)] px-10 py-12 lg:flex lg:flex-col lg:justify-between xl:px-16">
          <div className="landing-grid pointer-events-none absolute inset-0" />
          <div className="absolute inset-0">
            <div
              role="img"
              aria-label="A warm, organized creative workspace"
              className="landing-photo absolute inset-0"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85)",
              }}
            />
            <div className="landing-photo-wash absolute inset-0" />
            <div className="mesh-flow absolute inset-0 opacity-40" />
          </div>

          {/* Top Headline Content */}
          <div className="relative z-10 max-w-xl">
            <p className="mb-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--landing-orange)]">
              A clear place to work
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl xl:text-6xl text-[var(--landing-text)]">
              Bring your work
              <br />
              <span className="text-[var(--landing-orange)]">into motion.</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-[var(--landing-muted)] max-w-md">
              Plana keeps projects visible, tasks actionable, and teams aligned without the usual layers of noise.
            </p>
          </div>

          {/* Center Micro Kanban Card */}
          <div className="relative z-10 my-8 rounded-md border border-[var(--landing-line)] bg-[var(--landing-panel)] p-5 shadow-[12px_12px_0_-6px_var(--landing-orange)]">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--landing-line)] pb-3 text-[10px] font-mono">
              <span className="flex items-center gap-2 text-[var(--landing-text)] font-semibold">
                <Layers className="size-3 text-[var(--landing-orange)]" /> PRODUCT LAUNCH
              </span>
              <span className="text-[var(--landing-orange)] font-semibold">● ACTIVE</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {/* Backlog Column */}
              <div className="rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-3">
                <div className="flex items-center justify-between text-[9px] font-mono text-[var(--landing-muted)]">
                  <span>BACKLOG</span>
                  <span>03</span>
                </div>
                <p className="mt-3 text-xs font-semibold text-[var(--landing-text)]">Research</p>
                <p className="mt-2 text-[9px] font-mono text-[var(--landing-muted)]">03 tasks</p>
              </div>

              {/* In Progress Column */}
              <div className="rounded-sm border border-[var(--landing-orange)] bg-[var(--landing-panel-strong)] p-3">
                <div className="flex items-center justify-between text-[9px] font-mono text-[var(--landing-orange)] font-semibold">
                  <span>IN PROGRESS</span>
                  <span>02</span>
                </div>
                <p className="mt-3 text-xs font-semibold text-[var(--landing-text)]">Launch page</p>
                <p className="mt-2 text-[9px] font-mono text-[var(--landing-orange)]">02 tasks</p>
              </div>

              {/* Done Column */}
              <div className="rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel-strong)] p-3">
                <div className="flex items-center justify-between text-[9px] font-mono text-[var(--landing-muted)]">
                  <span>DONE</span>
                  <span>04</span>
                </div>
                <p className="mt-3 text-xs font-semibold text-[var(--landing-text)]">Design system</p>
                <p className="mt-2 text-[9px] font-mono text-[var(--landing-muted)]">04 tasks</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-2 border-t border-[var(--landing-line)] text-[10px] font-mono text-[var(--landing-muted)]">
              <span className="flex items-center gap-1.5">
                <MoveRight className="size-3 text-[var(--landing-orange)]" /> Make the next step obvious.
              </span>
              <span className="text-[var(--landing-orange)] font-semibold">Plana 2.0</span>
            </div>
          </div>

          {/* Bottom Trust Indicators */}
          <div className="relative z-10 flex items-center gap-6 text-[11px] font-mono text-[var(--landing-muted)]">
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-[var(--landing-orange)]" /> Built for focused execution
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-[var(--landing-orange)]" /> Multi-tenant isolation
            </span>
          </div>
        </section>

        {/* Right Auth Card Section */}
        <section className="flex flex-col items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-[420px]">
            {/* Mobile Header */}
            <div className="mb-6 lg:hidden">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--landing-orange)]">Workspace access</p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-[-0.04em] text-[var(--landing-text)]">
                Move work forward<span className="text-[var(--landing-orange)]">.</span>
              </h1>
              <p className="mt-2 text-xs text-[var(--landing-muted)]">
                Sign in to your workspace to view boards and tasks.
              </p>
            </div>

            {/* Clerk Form Shell */}
            <div className="w-full">
              {children}
            </div>

            {/* Back to Home Link */}
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--landing-muted)] hover:text-[var(--landing-orange)] transition-colors duration-200"
              >
                <ArrowLeft className="size-3" />
                Back to homepage
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Layout;
