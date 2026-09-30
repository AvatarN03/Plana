import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      redirectUrl="/select-org"
      fallbackRedirectUrl="/select-org"
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
          headerTitle: "!text-[var(--landing-text)] !text-2xl !tracking-[-0.04em]",
          headerSubtitle: "!text-[var(--landing-muted)]",
          formFieldLabel: "!text-[var(--landing-text)] !text-xs",
          formFieldInput: "!bg-[var(--landing-panel-strong)] !border-[var(--landing-line)] !rounded-none !text-[var(--landing-text)]",
          formButtonPrimary: "!bg-[var(--landing-orange)] !text-[var(--landing-orange-foreground)] !rounded-none hover:!brightness-110",
          footerActionLink: "!text-[var(--landing-orange)] hover:!underline",
          footerActionText: "!text-[var(--landing-muted)]",
          socialButtonsBlockButton: "!bg-[var(--landing-panel-strong)] !border-[var(--landing-line)] !text-[var(--landing-text)] !rounded-none hover:!bg-[var(--landing-panel)]",
          socialButtonsBlockButtonText: "!text-[var(--landing-text)]",
          dividerLine: "!bg-[var(--landing-line)]",
          dividerText: "!text-[var(--landing-muted)]",
          formFieldAction: "!text-[var(--landing-orange)]",
          identityPreviewText: "!text-[var(--landing-text)]",
          identityPreviewEditButton: "!text-[var(--landing-orange)]",
        },
      }}
    />
  );
}

