"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Layers, MoveRight } from "lucide-react";
import { ThemeToggle } from "../../(marketing)/_components/theme-toggle";


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (

    <div className="landing-shell min-h-screen bg-[var(--landing-bg)] text-[var(--landing-text)]">
      <header className="flex h-16 items-center justify-between border-b border-[var(--landing-line)] px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-[0.08em] text-[var(--landing-text)]"><Image src="/plana-icon.svg" alt="Plana" width={18} height={18} className="project-logo h-[18px] w-[18px]" /> PLANA</Link>
        <div className="flex items-center gap-3"><span className="hidden text-[10px] font-mono text-[var(--landing-muted)] sm:inline">WORKSPACE ACCESS</span><ThemeToggle /></div>
      </header>
      <main className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-[1fr_480px]">
        <section className="relative hidden overflow-hidden border-r border-[var(--landing-line)] px-10 py-12 lg:block xl:px-20">
          <div className="landing-grid pointer-events-none absolute inset-0" />
          <div className="absolute inset-0"><Image src="/auth-banner.png" alt="A bright Plana workspace with orange desk lamps and plants" fill priority className="object-cover opacity-55 mix-blend-screen" /><div className="absolute inset-0 bg-[linear-gradient(90deg,var(--landing-bg)_0%,color-mix(in_srgb,var(--landing-bg)_82%,transparent)_52%,color-mix(in_srgb,var(--landing-bg)_28%,transparent)_100%)]" /><div className="mesh-flow absolute inset-0 opacity-45" /></div>
          <div className="relative flex h-full max-w-2xl flex-col justify-between">
            <div><p className="mb-6 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--landing-orange)]">A clear place to work</p><h1 className="max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.07em] xl:text-7xl">Bring your work<br /><span className="text-[var(--landing-orange)]">into motion.</span></h1><p className="mt-7 max-w-md text-sm leading-7 text-[var(--landing-muted)]">Plana keeps projects visible, tasks actionable, and teams aligned without the usual layers of noise.</p></div>
            <div className="relative border border-[var(--landing-line)] bg-[var(--landing-panel)] p-5 shadow-[18px_18px_0_-10px_var(--landing-orange)]"><div className="mb-5 flex items-center justify-between border-b border-[var(--landing-line)] pb-3 text-[10px] font-mono"><span className="flex items-center gap-2"><Layers className="size-3 text-[var(--landing-orange)]" /> PRODUCT LAUNCH</span><span className="text-emerald-500">● ACTIVE</span></div><div className="grid grid-cols-3 gap-2"><div className="border border-[var(--landing-line)] p-3"><span className="text-[9px] font-mono text-[var(--landing-muted)]">BACKLOG</span><p className="mt-5 text-xs font-semibold">Research</p><p className="mt-2 text-[9px] font-mono text-[var(--landing-muted)]">03 tasks</p></div><div className="border border-[var(--landing-orange)] p-3"><span className="text-[9px] font-mono text-[var(--landing-orange)]">IN PROGRESS</span><p className="mt-5 text-xs font-semibold">Launch page</p><p className="mt-2 text-[9px] font-mono text-[var(--landing-muted)]">02 tasks</p></div><div className="border border-[var(--landing-line)] p-3"><span className="text-[9px] font-mono text-emerald-500">DONE</span><p className="mt-5 text-xs font-semibold">Design system</p><p className="mt-2 text-[9px] font-mono text-[var(--landing-muted)]">04 tasks</p></div></div><div className="mt-5 flex items-center gap-2 text-[10px] font-mono text-[var(--landing-muted)]"><MoveRight className="size-3 text-[var(--landing-orange)]" /> Make the next step obvious.</div></div>
            <p className="flex items-center gap-2 text-[10px] font-mono text-[var(--landing-muted)]"><Check className="size-3 text-emerald-500" /> Built for focused execution <ArrowUpRight className="ml-1 size-3 text-[var(--landing-orange)]" /></p>
          </div>
        </section>
        <section className="flex items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full max-w-[440px]">
            <div className="mb-8 lg:hidden">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--landing-orange)]">Workspace access</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">Move work forward<span className="text-[var(--landing-orange)]">.</span></h1>
            </div>
            {children}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Layout;
