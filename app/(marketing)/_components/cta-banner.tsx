import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const CtaBanner = () => {
    return (
        <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto">
            <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl">
                {/* Background glow accent */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/80">
                        Get Started in Seconds
                    </span>

                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                        Bring clarity and speed to your projects.
                    </h2>

                    <p className="text-base text-neutral-300 leading-relaxed">
                        Start organizing tasks today with Plana&apos;s focused Kanban workspace. Free for up to 5 boards per organization.
                    </p>

                    <div className="pt-2">
                        <Button size="lg" className="bg-white hover:bg-neutral-100 text-neutral-900 font-semibold px-8 h-12 text-sm shadow-md cursor-pointer" asChild>
                            <Link href="/sign-up">
                                Create your free workspace
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-400 pt-4">
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            Free up to 5 boards
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            No credit card required
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            Instant setup
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};
