import { OrganizationProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="w-full">
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
            card: "!bg-[var(--landing-panel)] !border !border-[var(--landing-line)] !shadow-none !rounded-none w-full",
            navbar: "!border-b !border-[var(--landing-line)]",
            navbarButton: "!text-[var(--landing-muted)] hover:!text-[var(--landing-text)]",
            navbarButtonActive: "!text-[var(--landing-orange)]",
            headerTitle: "!text-[var(--landing-text)]",
            headerSubtitle: "!text-[var(--landing-muted)]",
            profileSectionTitleText: "!text-[var(--landing-text)]",
            profileSectionSubtitleText: "!text-[var(--landing-muted)]",
            formFieldLabel: "!text-[var(--landing-text)]",
            formFieldInput: "!bg-[var(--landing-panel-strong)] !border-[var(--landing-line)] !rounded-none !text-[var(--landing-text)]",
            formButtonPrimary: "!bg-[var(--landing-orange)] !text-[var(--landing-orange-foreground)] !rounded-none hover:!brightness-110",
            formButtonReset: "!border-[var(--landing-line)] !text-[var(--landing-text)] !rounded-none hover:!bg-[var(--landing-panel-strong)]",
          },
        }}
      />
    </div>
  );
}

