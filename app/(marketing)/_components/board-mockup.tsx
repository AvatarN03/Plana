import { AlignLeft, CheckCircle2, Clock, Filter, Flag, Plus, Sparkles } from "lucide-react";

export const BoardMockup = () => {
    return (
        <div className="relative mx-auto max-w-5xl w-full rounded-2xl border border-neutral-300/80 bg-neutral-900 shadow-2xl overflow-hidden text-neutral-900 transition-all hover:shadow-blue-500/10">
            {/* Board Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-800 text-xs text-white">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-3 font-semibold text-neutral-200 flex items-center gap-1.5">
                        Product Launch 2026
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-neutral-800 text-neutral-400 font-mono">Workspace</span>
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-1 text-[11px] text-neutral-400 bg-neutral-800/80 px-2 py-1 rounded border border-neutral-700">
                        <Filter className="w-3 h-3 text-neutral-400" />
                        <span>Filter: Urgent only</span>
                    </div>
                    <div className="flex -space-x-1.5 overflow-hidden">
                        <span className="inline-block h-5 w-5 rounded-full ring-2 ring-neutral-900 bg-blue-500 text-[10px] text-white font-bold flex items-center justify-center">A</span>
                        <span className="inline-block h-5 w-5 rounded-full ring-2 ring-neutral-900 bg-amber-500 text-[10px] text-white font-bold flex items-center justify-center">M</span>
                        <span className="inline-block h-5 w-5 rounded-full ring-2 ring-neutral-900 bg-emerald-500 text-[10px] text-white font-bold flex items-center justify-center">S</span>
                    </div>
                </div>
            </div>

            {/* Board Columns Canvas */}
            <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-900 via-neutral-900 to-slate-950 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                
                {/* Column 1: Backlog */}
                <div className="bg-neutral-800/70 border border-neutral-700/60 rounded-xl p-3 flex flex-col gap-2.5 backdrop-blur-sm">
                    <div className="flex items-center justify-between px-1 text-neutral-300 font-semibold text-xs">
                        <span>Backlog</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-700/60 text-neutral-400">2</span>
                    </div>

                    {/* Card 1 */}
                    <div className="bg-neutral-900/90 border border-neutral-700/70 rounded-lg p-3 space-y-2 hover:border-neutral-500 transition-colors shadow-sm cursor-pointer">
                        <p className="text-neutral-100 font-medium leading-snug">
                            Set up PostgreSQL schema & connection pool
                        </p>
                        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                                <Flag className="w-2.5 h-2.5" />
                                Low
                            </span>
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
                                <Clock className="w-2.5 h-2.5" />
                                Oct 28
                            </span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-neutral-900/90 border border-neutral-700/70 rounded-lg p-3 space-y-2 hover:border-neutral-500 transition-colors shadow-sm cursor-pointer">
                        <p className="text-neutral-100 font-medium leading-snug">
                            Research cross-tenant data isolation best practices
                        </p>
                        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                            <AlignLeft className="w-3 h-3 text-neutral-500" />
                            <span className="text-neutral-500">Has description</span>
                        </div>
                    </div>

                    <button className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-200 px-2 py-1 mt-1 transition">
                        <Plus className="w-3.5 h-3.5" /> Add card...
                    </button>
                </div>

                {/* Column 2: In Progress */}
                <div className="bg-neutral-800/70 border border-neutral-700/60 rounded-xl p-3 flex flex-col gap-2.5 backdrop-blur-sm">
                    <div className="flex items-center justify-between px-1 text-neutral-300 font-semibold text-xs">
                        <span className="flex items-center gap-1.5">
                            In Progress
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-700/60 text-neutral-400">2</span>
                    </div>

                    {/* Card 3 (Highlighted) */}
                    <div className="bg-neutral-900 border border-blue-500/60 rounded-lg p-3 space-y-2 shadow-lg shadow-blue-500/5 transition cursor-pointer">
                        <div className="flex items-start justify-between">
                            <p className="text-neutral-100 font-medium leading-snug">
                                Build responsive Kanban card preview badges
                            </p>
                            <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0 ml-1" />
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/80 font-medium">
                                <Flag className="w-2.5 h-2.5 text-red-400" />
                                Urgent
                            </span>
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/80 font-medium">
                                <Clock className="w-2.5 h-2.5 text-amber-400" />
                                Today
                            </span>
                            <AlignLeft className="w-3 h-3 text-neutral-500" />
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-neutral-900/90 border border-neutral-700/70 rounded-lg p-3 space-y-2 hover:border-neutral-500 transition-colors shadow-sm cursor-pointer">
                        <p className="text-neutral-100 font-medium leading-snug">
                            Implement Clerk organization switching
                        </p>
                        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/80 font-medium">
                                <Flag className="w-2.5 h-2.5 text-amber-400" />
                                High
                            </span>
                        </div>
                    </div>

                    <button className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-200 px-2 py-1 mt-1 transition">
                        <Plus className="w-3.5 h-3.5" /> Add card...
                    </button>
                </div>

                {/* Column 3: Completed */}
                <div className="bg-neutral-800/70 border border-neutral-700/60 rounded-xl p-3 flex flex-col gap-2.5 backdrop-blur-sm">
                    <div className="flex items-center justify-between px-1 text-neutral-300 font-semibold text-xs">
                        <span>Done</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-700/60 text-neutral-400">2</span>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-neutral-900/90 border border-neutral-700/70 rounded-lg p-3 space-y-2 opacity-85 hover:opacity-100 transition shadow-sm cursor-pointer">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <p className="text-neutral-300 font-medium line-through leading-snug">
                                Setup Next.js 16 with App Router
                            </p>
                        </div>
                    </div>

                    {/* Card 6 */}
                    <div className="bg-neutral-900/90 border border-neutral-700/70 rounded-lg p-3 space-y-2 opacity-85 hover:opacity-100 transition shadow-sm cursor-pointer">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <p className="text-neutral-300 font-medium line-through leading-snug">
                                Safe server actions with Zod validation
                            </p>
                        </div>
                    </div>

                    <button className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-200 px-2 py-1 mt-1 transition">
                        <Plus className="w-3.5 h-3.5" /> Add card...
                    </button>
                </div>
            </div>
        </div>
    );
};
