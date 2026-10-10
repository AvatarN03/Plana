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
        <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.2em] text-landing-orange">
          Workspace routing
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-landing-text">
          Choose where to work<span className="text-landing-orange">.</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-landing-muted">
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
            cardBox: "!bg-landing-panel !border !border-landing-line !shadow-none !rounded-sm w-full",
            card: "!bg-transparent !border-0 !shadow-none !rounded-sm w-full !text-landing-text",
            headerTitle: "!text-landing-text font-bold text-2xl tracking-tight",
            headerSubtitle: "!text-landing-muted text-sm",
            organizationListActionRow: "!border-b !border-landing-line !bg-transparent",
            organizationListCreateOrganizationBtn: "!bg-landing-panel-strong !border !border-landing-line !text-landing-text hover:!border-landing-orange hover:!text-landing-orange !rounded-sm !font-semibold transition-colors",
            organizationPreviewMainIdentifier: "!text-landing-text font-semibold",
            organizationPreviewSecondaryIdentifier: "!text-landing-muted",
            organizationSwitcherTrigger: "!rounded-sm !border-landing-line !text-landing-text !bg-landing-panel-strong",
            formButtonPrimary: "!bg-landing-orange !text-landing-orange-foreground !rounded-sm !font-bold hover:!brightness-110",
            formButtonReset: "!text-landing-text hover:!text-landing-text !border-landing-line !bg-landing-panel-strong !rounded-sm",
            formFieldInput: "!bg-landing-panel-strong !border-landing-line !rounded-sm !text-landing-text focus:!border-landing-orange",
            formFieldLabel: "!text-landing-text font-semibold",
            modalBackdrop: "!bg-black/75 !backdrop-blur-sm",
            modalContent: "!bg-landing-panel !border !border-landing-line !rounded-sm !text-landing-text !shadow-2xl",
            modalCloseButton: "!text-landing-muted hover:!text-landing-text",
          },
        }}
      />

      <div className="mt-6 flex items-center gap-2 text-[11px] font-mono text-landing-muted">
        <ArrowRight className="size-3.5 text-landing-orange" />
        Switch organizations anytime from the board navigation bar.
      </div>
    </div>
  );
}
