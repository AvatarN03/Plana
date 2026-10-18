import { OrganizationProfile } from "@clerk/nextjs";
import { Info } from "../_components/Info";
import { Separator } from "@/components/ui/separator";
import { Sliders } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="w-full pb-16 space-y-6">
      <Info />
      <Separator className="bg-[var(--landing-line)]" />

      {/* Settings Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Sliders className="size-4.5 text-[var(--landing-orange)]" />
          <h2 className="text-lg font-semibold text-[var(--landing-text)]">
            Workspace Settings & Administration
          </h2>
        </div>
        <p className="text-xs text-[var(--landing-muted)]">
          Manage workspace identity, organization branding, security settings, and administrative access.
        </p>
      </div>

      <div className="rounded-sm border border-[var(--landing-line)] bg-[var(--landing-panel)] overflow-hidden shadow-2xs">
        <OrganizationProfile
          appearance={{
            variables: {
              colorPrimary: "#ff7619",
              colorText: "var(--landing-text)",
              colorTextSecondary: "var(--landing-muted)",
              colorBackground: "var(--landing-panel)",
              colorInputBackground: "var(--landing-panel-strong)",
              colorInputText: "var(--landing-text)",
            },
            elements: {
              rootBox: {
                boxShadow: "none",
                width: "100%",
              },
              cardBox: {
                boxShadow: "none",
                width: "100%",
              },
              card: "!bg-[var(--landing-panel)] !border-none !shadow-none !rounded-sm w-full",
              navbar: "!border-b !border-[var(--landing-line)]",
              navbarButton: "!text-[var(--landing-muted)] hover:!text-[var(--landing-text)]",
              navbarButtonActive: "!text-[var(--landing-orange)]",
              headerTitle: "!text-[var(--landing-text)]",
              headerSubtitle: "!text-[var(--landing-muted)]",
              profileSectionTitleText: "!text-[var(--landing-text)]",
              profileSectionSubtitleText: "!text-[var(--landing-muted)]",
              formFieldLabel: "!text-[var(--landing-text)]",
              formFieldInput: "!bg-[var(--landing-panel-strong)] !border-[var(--landing-line)] !rounded-sm !text-[var(--landing-text)]",
              formButtonPrimary: "!bg-[var(--landing-orange)] !text-[var(--landing-orange-foreground)] !rounded-sm hover:!brightness-110",
              formButtonReset: "!border-[var(--landing-line)] !text-[var(--landing-text)] !rounded-sm hover:!bg-[var(--landing-panel-strong)]",
            },
          }}
        />
      </div>
    </div>
  );
}
