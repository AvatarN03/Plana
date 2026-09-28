import { Check, X } from "lucide-react";

export const ComparisonSection = () => {
    return (
        <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
            <div className="text-center space-y-3 mb-12">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    The Plana Difference
                </span>
                <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">
                    Why high-velocity teams choose Plana
                </h2>
                <p className="text-sm text-neutral-600 max-w-xl mx-auto">
                    Most project tools try to be everything at once, creating endless configuration fatigue. Plana focuses on what actually helps you finish work.
                </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-xs">
                <div className="grid grid-cols-2 text-sm font-semibold divide-x divide-neutral-200/90 border-b border-neutral-200/90 bg-neutral-50/70">
                    <div className="p-4 sm:p-5 text-neutral-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        Plana 2.0
                    </div>
                    <div className="p-4 sm:p-5 text-neutral-500">
                        Traditional PM Software
                    </div>
                </div>

                <div className="divide-y divide-neutral-100 text-xs sm:text-sm">
                    {[
                        {
                            feature: "Setup time",
                            plana: "Seconds (Start blank or choose a starter template)",
                            other: "Hours of workspace configuration and onboarding tutorials",
                        },
                        {
                            feature: "User Interface",
                            plana: "Clean, distraction-free Kanban surfaces",
                            other: "Cluttered dashboards with overwhelming menus",
                        },
                        {
                            feature: "Execution Speed",
                            plana: "Sub-second drag & drop with optimistic UI updates",
                            other: "Slow page transitions and heavy spinners",
                        },
                        {
                            feature: "Focus & Philosophy",
                            plana: "Zero AI clutter, pure task execution",
                            other: "Unnecessary chatbots and complex automated workflows",
                        },
                        {
                            feature: "Organization Workspaces",
                            plana: "Multi-tenant isolation backed by Clerk & PostgreSQL",
                            other: "Complex per-seat tier lockouts and permission gates",
                        },
                    ].map((row, idx) => (
                        <div key={idx} className="grid grid-cols-2 divide-x divide-neutral-100 hover:bg-neutral-50/50 transition-colors">
                            <div className="p-4 sm:p-5 flex items-start gap-2 text-neutral-800 font-medium">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <div>
                                    <span className="block text-[11px] uppercase tracking-wider text-neutral-400 font-bold mb-0.5">{row.feature}</span>
                                    <span>{row.plana}</span>
                                </div>
                            </div>
                            <div className="p-4 sm:p-5 flex items-start gap-2 text-neutral-500">
                                <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                <div>
                                    <span className="block text-[11px] uppercase tracking-wider text-neutral-400 font-bold mb-0.5">{row.feature}</span>
                                    <span>{row.other}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
