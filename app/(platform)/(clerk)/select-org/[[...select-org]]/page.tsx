import type { Metadata } from "next";
import { OrganizationList } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Select Organization | Plana Auth Page",
  description: "Planner auth page - Select organization workspace.",
  keywords: ["Plana", "planner auth page", "Plana Auth Page", "select organization"],
  other: {
    "planner-auth-page": "select-org",
  },
};

export default function SelectOrgPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--landing-orange)]">
          Workspace routing
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--landing-text)]">
          Choose where to work<span className="text-[var(--landing-orange)]">.</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--landing-muted)]">
          Select an existing organization or create a new workspace to organize boards, lists, and team activity.
        </p>
      </div>

      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/organization/:id"
        afterSelectOrganizationUrl="/organization/:id"
        appearance={{
          elements: {
            rootBox: "w-full",
            cardBox: "!bg-[var(--landing-panel)] !border !border-[var(--landing-line)] !shadow-none !rounded-none w-full",
            card: "!bg-transparent !border-0 !shadow-none !rounded-none w-full !text-[var(--landing-text)]",
            headerTitle: "!text-[var(--landing-text)] font-bold text-2xl tracking-tight",
            headerSubtitle: "!text-[var(--landing-muted)] text-sm",
            organizationListActionRow: "!border-b !border-[var(--landing-line)] !bg-transparent",
            organizationListCreateOrganizationBtn: "!bg-[var(--landing-panel-strong)] !border !border-[var(--landing-line)] !text-[var(--landing-text)] hover:!border-[var(--landing-orange)] hover:!text-[var(--landing-orange)] !rounded-none !font-semibold transition-colors",
            organizationPreviewMainIdentifier: "!text-[var(--landing-text)] font-semibold",
            organizationPreviewSecondaryIdentifier: "!text-[var(--landing-muted)]",
            organizationSwitcherTrigger: "!rounded-none !border-[var(--landing-line)] !text-[var(--landing-text)] !bg-[var(--landing-panel-strong)]",
            formButtonPrimary: "!bg-[var(--landing-orange)] !text-[var(--landing-orange-foreground)] !rounded-none !font-bold hover:!brightness-110",
            formButtonReset: "!text-[var(--landing-text)] hover:!text-[var(--landing-text)] !border-[var(--landing-line)] !bg-[var(--landing-panel-strong)] !rounded-none",
            formFieldInput: "!bg-[var(--landing-panel-strong)] !border-[var(--landing-line)] !rounded-none !text-[var(--landing-text)] focus:!border-[var(--landing-orange)]",
            formFieldLabel: "!text-[var(--landing-text)] font-semibold",
            modalBackdrop: "!bg-black/75 !backdrop-blur-sm",
            modalContent: "!bg-[var(--landing-panel)] !border !border-[var(--landing-line)] !rounded-none !text-[var(--landing-text)] !shadow-2xl",
            modalCloseButton: "!text-[var(--landing-muted)] hover:!text-[var(--landing-text)]",
          },
        }}
      />

      <div className="mt-6 flex items-center gap-2 text-[11px] font-mono text-[var(--landing-muted)]">
        <ArrowRight className="size-3.5 text-[var(--landing-orange)]" />
        Switch organizations anytime from the board navigation bar.
      </div>
    </div>
  );
}
