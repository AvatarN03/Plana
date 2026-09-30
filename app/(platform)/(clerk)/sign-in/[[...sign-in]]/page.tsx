import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <SignIn 
      redirectUrl="/select-org"
      fallbackRedirectUrl="/select-org"
      appearance={{
        variables: {
          colorPrimary: "var(--landing-orange)",
          colorText: "var(--landing-text)",
          colorTextSecondary: "var(--landing-muted)",
          colorBackground: "var(--landing-panel)",
          colorInputBackground: "var(--landing-panel-strong)",
          colorInputText: "var(--landing-text)",
        },
        elements: {
          card: "!bg-[var(--landing-panel)] !border !border-[var(--landing-line)] !shadow-none !rounded-none",
          headerTitle: "!text-[var(--landing-text)] !text-2xl !tracking-[-0.04em]",
          headerSubtitle: "!text-[var(--landing-muted)]",
          formFieldLabel: "!text-[var(--landing-text)] !text-xs",
          formFieldInput: "!bg-[var(--landing-panel-strong)] !border-[var(--landing-line)] !rounded-none",
          formButtonPrimary: "!bg-[var(--landing-orange)] !text-[var(--landing-orange-foreground)] !rounded-none hover:!brightness-110",
          footerActionLink: "!text-[var(--landing-orange)]",
          socialButtonsBlockButton: "!bg-[var(--landing-panel-strong)] !border-[var(--landing-line)] !text-[var(--landing-text)] !rounded-none",
        },
      }}
    />
  )
}
