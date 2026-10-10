import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, Clock, Layers, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "../../(marketing)/_components/theme-toggle";

export const metadata: Metadata = {
  title: "Plana Auth Page",
  description: "Planner auth page - Sign in or sign up to your Plana workspace.",
  keywords: ["Plana", "planner auth page", "Plana Auth Page", "authentication", "sign in", "sign up"],
  other: {
    "planner-auth-page": "true",
  },
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="landing-shell min-h-screen text-landing-text transition-colors duration-300">
      {/* Top Bar */}
      <header className="flex h-16 items-center justify-between border-b border-landing-line px-5 sm:px-8 bg-landing-bg/80 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold tracking-[0.08em] text-landing-text hover:opacity-90 transition-opacity"
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
          <span className="hidden text-[10px] font-mono tracking-wider text-landing-muted sm:inline">
            WORKSPACE ACCESS
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Auth Split */}
      <main className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[1.1fr_480px] xl:grid-cols-[1.25fr_500px]">
        {/* Left Visual Showcase (Desktop) */}
        <section className="relative hidden overflow-hidden border-r border-landing-line px-10 py-12 lg:flex lg:flex-col lg:justify-between xl:px-16">
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
          </div>

          {/* Top Headline Content */}
          <div className="relative z-10 max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-sm border border-landing-line bg-landing-panel px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-landing-orange">
              <span className="size-1.5 rounded-full bg-landing-orange animate-pulse" />
              Focused Workspace
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl xl:text-6xl text-landing-text">
              Bring your work
              <br />
              <span className="text-landing-orange">into motion.</span>
            </h1>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-landing-muted max-w-md">
              A high-performance workspace for turning tasks and projects into clear execution workflows. Less noise. More momentum.
            </p>
          </div>

          {/* Center Micro Kanban Board (Refactored to match Landing Page UI) */}
          <div className="relative z-10 my-8 rounded-sm border border-landing-line bg-landing-panel p-4 sm:p-5 shadow-2xl">
            {/* Board View Header */}
            <div className="mb-3.5 flex items-center justify-between border-b border-landing-line pb-3 text-[11px] font-mono">
              <span className="flex items-center gap-2 font-bold text-landing-text">
                <Layers className="size-3.5 text-landing-orange" /> SPRINT BOARD VIEW
              </span>
              <span className="text-landing-orange font-semibold">● LIVE · WIP: 3</span>
            </div>

            {/* 3 Columns */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* Backlog Column */}
              <div className="rounded-sm border border-landing-line bg-landing-panel-strong p-2.5">
                <div className="flex items-center justify-between text-[9px] font-mono text-landing-muted">
                  <span>BACKLOG</span>
                  <span className="rounded-sm bg-landing-panel px-1.5 py-0.5 text-[9px]">2</span>
                </div>
                <div className="mt-2.5 space-y-2">
                  <div className="rounded-sm border border-landing-line bg-landing-panel p-2">
                    <span className="text-[9px] font-mono text-landing-orange">#specs</span>
                    <p className="mt-1 text-xs font-semibold text-landing-text">Define v2 roadmap</p>
                    <span className="mt-1.5 block text-[9px] font-mono text-landing-muted">Oct 28</span>
                  </div>
                  <div className="rounded-sm border border-landing-line bg-landing-panel p-2">
                    <span className="text-[9px] font-mono text-landing-muted">#research</span>
                    <p className="mt-1 text-xs font-semibold text-landing-text">Benchmark review</p>
                  </div>
                </div>
              </div>

              {/* In Progress Column */}
              <div className="rounded-sm border border-landing-orange bg-landing-orange-soft/25 p-2.5">
                <div className="flex items-center justify-between text-[9px] font-mono text-landing-orange font-bold">
                  <span>IN PROGRESS</span>
                  <span className="rounded-sm bg-landing-orange/20 px-1.5 py-0.5 text-[9px] text-landing-orange">2</span>
                </div>
                <div className="mt-2.5 space-y-2">
                  <div className="rounded-sm border border-landing-orange bg-landing-panel p-2 shadow-xs">
                    <div className="flex items-center justify-between text-[9px] font-mono">
                      <span className="text-landing-orange font-bold">#frontend</span>
                      <span className="text-[8px] font-bold text-landing-orange">HIGH</span>
                    </div>
                    <p className="mt-1 text-xs font-bold text-landing-text">Launch page polish</p>
                    <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-landing-muted">
                      <span>✓ 2/2 done</span>
                      <span className="text-landing-orange font-semibold">Keshav</span>
                    </div>
                  </div>
                  <div className="rounded-sm border border-landing-line bg-landing-panel p-2">
                    <span className="text-[9px] font-mono text-landing-orange">#backend</span>
                    <p className="mt-1 text-xs font-semibold text-landing-text">Clerk auth routing</p>
                    <span className="mt-1.5 block text-[9px] font-mono text-landing-muted">Ozair</span>
                  </div>
                </div>
              </div>

              {/* Done Column */}
              <div className="rounded-sm border border-landing-line bg-landing-panel-strong p-2.5">
                <div className="flex items-center justify-between text-[9px] font-mono text-landing-muted">
                  <span>DONE</span>
                  <span className="rounded-sm bg-landing-panel px-1.5 py-0.5 text-[9px]">2</span>
                </div>
                <div className="mt-2.5 space-y-2">
                  <div className="rounded-sm border border-landing-line bg-landing-panel p-2 opacity-85">
                    <span className="text-[9px] font-mono text-landing-muted">#infra</span>
                    <p className="mt-1 text-xs font-semibold text-landing-text line-through">Prisma schema v7</p>
                    <span className="mt-1.5 block text-[9px] font-mono text-landing-orange">✓ Shipped · Raj</span>
                  </div>
                  <div className="rounded-sm border border-landing-line bg-landing-panel p-2 opacity-85">
                    <span className="text-[9px] font-mono text-landing-muted">#design</span>
                    <p className="mt-1 text-xs font-semibold text-landing-text line-through">Design tokens</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Stream Bar */}
            <div className="mt-3.5 flex items-center justify-between border-t border-landing-line pt-2.5 text-[10px] font-mono text-landing-muted">
              <span className="flex items-center gap-1.5 text-landing-text/90">
                <span className="size-1.5 rounded-full bg-landing-orange" /> Keshav moved Landing page to In Progress
              </span>
              <span className="text-landing-orange font-semibold">Plana 2.0</span>
            </div>
          </div>

          {/* Bottom Trust Indicators */}
          <div className="relative z-10 flex flex-wrap items-center gap-5 text-[11px] font-mono text-landing-muted">
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-landing-orange" /> Focused execution
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-landing-orange" /> Multi-tenant isolation
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-landing-orange" /> Real-time audit logs
            </span>
          </div>
        </section>

        {/* Right Auth Card Section */}
        <section className="flex flex-col items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-[420px]">
            {/* Mobile Header */}
            <div className="mb-6 lg:hidden">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-landing-orange">Workspace access</p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-[-0.04em] text-landing-text">
                Move work forward<span className="text-landing-orange">.</span>
              </h1>
              <p className="mt-2 text-xs text-landing-muted">
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
                className="inline-flex items-center gap-1.5 text-xs font-mono text-landing-muted hover:text-landing-orange transition-colors duration-200"
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
