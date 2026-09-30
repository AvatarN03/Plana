import { OrganizationList } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

const SelectOrgPage = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.18em] text-[var(--landing-orange)]">
          Workspace routing
        </p>
        <h1 className="text-3xl font-semibold tracking-[-0.05em] text-[var(--landing-text)]">
          Choose where to work<span className="text-[var(--landing-orange)]">.</span>
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--landing-muted)]">
          Select an existing workspace or create a new one to keep projects, boards, and activity together.
        </p>
      </div>

      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/organization/:id"
        afterSelectOrganizationUrl="/organization/:id"
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
            rootBox: "w-full",
            card: "!bg-[var(--landing-panel)] !border !border-[var(--landing-line)] !shadow-none !rounded-none w-full",
            headerTitle: "!text-[var(--landing-text)] !text-xl !tracking-[-0.03em]",
            headerSubtitle: "!text-[var(--landing-muted)]",
            organizationListActionRow: "!border-[var(--landing-line)]",
            organizationPreviewMainIdentifier: "!text-[var(--landing-text)] font-semibold",
            organizationPreviewSecondaryIdentifier: "!text-[var(--landing-muted)]",
            organizationSwitcherTrigger: "!rounded-none !border-[var(--landing-line)] !text-[var(--landing-text)]",
            formButtonPrimary: "!bg-[var(--landing-orange)] !text-[var(--landing-orange-foreground)] !rounded-none hover:!brightness-110",
            formFieldInput: "!bg-[var(--landing-panel-strong)] !border-[var(--landing-line)] !rounded-none !text-[var(--landing-text)]",
            formFieldLabel: "!text-[var(--landing-text)]",
            organizationListCreateOrganizationBtn: "!border-[var(--landing-line)] !text-[var(--landing-text)] hover:!bg-[var(--landing-panel-strong)]",
          },
        }}
      />

      <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-[var(--landing-muted)]">
        <ArrowRight className="size-3 text-[var(--landing-orange)]" />
        Switch workspaces anytime from the top bar.
      </div>
    </div>
  );
};

export default SelectOrgPage;

