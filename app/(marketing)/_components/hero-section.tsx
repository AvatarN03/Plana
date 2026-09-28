import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
    return (
        <section className="text-center space-y-8 max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-12">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-medium shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Plana 2.0</span>
                <span className="text-blue-300">|</span>
                <span>Simple project management. Clear workflows.</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 tracking-tight leading-[1.1]">
                    Project management <br />
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                        without the noise.
                    </span>
                </h1>
                <p className="text-base sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-normal">
                    Organize tasks, align your team, and track momentum with a fast, distraction-free Kanban workspace. Zero configuration bloat, pure execution.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button size="lg" className="w-full sm:w-auto h-12 px-7 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm shadow-md cursor-pointer" asChild>
                    <Link href="/sign-up">
                        Get Plana for free
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-7 border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-medium text-sm cursor-pointer" asChild>
                    <Link href="/sign-in">
                        Sign in to workspace
                    </Link>
                </Button>
            </div>

            {/* Quick Proof Points */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 pt-2 font-medium">
                <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    Instant optimistic updates
                </span>
                <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                    Clerk multi-tenant security
                </span>
                <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Free forever tier
                </span>
            </div>
        </section>
    );
};
