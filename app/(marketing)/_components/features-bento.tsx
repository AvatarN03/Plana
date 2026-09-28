import { CalendarCheck, Layers, ShieldCheck, Workflow } from "lucide-react";

export const FeaturesBento = () => {
    return (
        <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center space-y-3 mb-16">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    Engineered for Focus
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                    Everything you need to deliver. Nothing you don&apos;t.
                </h2>
                <p className="text-base text-neutral-600 max-w-2xl mx-auto">
                    Plana cuts away bloated menus and complex setups, giving your team a clean, lightning-fast Kanban workflow.
                </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Large Card 1: Fluid Kanban */}
                <div className="md:col-span-2 rounded-2xl bg-white border border-neutral-200/90 p-8 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                            <Workflow className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900">
                            Fluid Drag-and-Drop Kanban
                        </h3>
                        <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">
                            Reorder lists horizontally, organize cards vertically, and slide tasks across stages with optimistic updates that synchronize to the server seamlessly.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex items-center gap-6 text-xs text-neutral-500 font-medium">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Optimistic state updates
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            Zero layout shifts
                        </span>
                    </div>
                </div>

                {/* Card 2: Priorities & Due Dates */}
                <div className="rounded-2xl bg-white border border-neutral-200/90 p-8 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                        <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-600">
                            <CalendarCheck className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900">
                            Priorities & Due Dates
                        </h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                            Flag urgent blockers, track upcoming milestones, and spot overdue tasks instantly with smart visual indicators.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 font-semibold border border-red-200">Urgent</span>
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold border border-amber-200">High</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Due Date</span>
                    </div>
                </div>

                {/* Card 3: Audit Trail & Accountability */}
                <div className="rounded-2xl bg-white border border-neutral-200/90 p-8 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900">
                            Audit Logs & Activity
                        </h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                            Full visibility into every action. See who created, renamed, moved, or deleted boards, lists, and cards in your workspace.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 text-xs text-neutral-500 font-medium">
                        Complete chronological audit trails
                    </div>
                </div>

                {/* Large Card 4: Starter Templates & Filtering */}
                <div className="md:col-span-2 rounded-2xl bg-white border border-neutral-200/90 p-8 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                            <Layers className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900">
                            Instant Templates & Board Filtering
                        </h3>
                        <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">
                            Spin up new boards with Software Development or Personal Task starter templates. When boards grow, filter cards instantly by keyword, priority level, or due date.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-4 text-xs text-neutral-500 font-medium">
                        <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 font-medium">
                            Software Kanban (5 lists)
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 font-medium">
                            Personal Tasks (4 lists)
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 font-medium">
                            In-Memory Instant Filter
                        </span>
                    </div>
                </div>

            </div>
        </section>
    );
};
