import { Check, CreditCard, Sparkles, Zap } from "lucide-react";
import { Info } from "../_components/Info";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
  return (
    <div className="w-full pb-16 space-y-6">
      <Info />
      <Separator className="bg-[var(--landing-line)]" />

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-[var(--landing-text)]">
            Subscription & Plans
          </h2>
          <p className="text-xs text-[var(--landing-muted)]">
            Manage your workspace subscription tier and board limits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Free Plan */}
          <div className="p-5 rounded-sm border border-[var(--landing-orange)] bg-[var(--landing-panel)] shadow-2xs relative flex flex-col justify-between">
            <div className="absolute top-4 right-4">
              <span className="text-[11px] font-mono font-medium text-[var(--landing-orange)] bg-[var(--landing-orange-soft)] px-2.5 py-0.5 rounded-sm border border-[var(--landing-orange)]/30">
                Current Plan
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[var(--landing-orange)]" />
                  <h3 className="font-semibold text-base text-[var(--landing-text)]">Free Tier</h3>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-[var(--landing-text)]">$0</span>
                  <span className="text-xs text-[var(--landing-muted)]">/ month</span>
                </div>
                <p className="text-xs text-[var(--landing-muted)] mt-1">
                  Ideal for personal task management and small workflows.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-[var(--landing-muted)] border-t border-[var(--landing-line)] pt-3">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Up to 5 active boards</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Unlimited lists & task cards</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Kanban drag & drop reordering</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Real-time workspace activity audit</span>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <Button
                disabled
                variant="outline"
                className="w-full text-xs rounded-sm border-[var(--landing-line)] bg-[var(--landing-panel-strong)] text-[var(--landing-muted)] cursor-default"
              >
                Active Workspace Plan
              </Button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="p-5 rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] shadow-2xs flex flex-col justify-between hover:border-[var(--landing-line-strong)] transition">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--landing-orange)]" />
                  <h3 className="font-semibold text-base text-[var(--landing-text)]">Pro Tier</h3>
                </div>
                <span className="text-[10px] font-mono text-[var(--landing-muted)] uppercase tracking-wider bg-[var(--landing-panel-strong)] px-2 py-0.5 rounded-sm border border-[var(--landing-line)]">
                  Upcoming
                </span>
              </div>

              <div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold tracking-tight text-[var(--landing-text)]">$9</span>
                  <span className="text-xs text-[var(--landing-muted)]">/ member / month</span>
                </div>
                <p className="text-xs text-[var(--landing-muted)] mt-1">
                  For growing teams that need unlimited boards and priority features.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-[var(--landing-muted)] border-t border-[var(--landing-line)] pt-3">
                <li className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[var(--landing-orange)] shrink-0" />
                  <span className="text-[var(--landing-text)] font-medium">Unlimited active boards</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Custom workspace templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Advanced board filtering & export</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Priority email support</span>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <Button
                className="w-full text-xs rounded-sm bg-[var(--landing-orange)] hover:bg-[var(--landing-orange)]/90 text-white font-medium"
              >
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
