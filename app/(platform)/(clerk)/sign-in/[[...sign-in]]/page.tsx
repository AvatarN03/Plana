import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn
      redirectUrl="/select-org"
      fallbackRedirectUrl="/select-org"
      appearance={{
        layout: {
          socialButtonsPlacement: "top",
          shimmer: true,
        },
        elements: {
          rootBox: "w-full",
          cardBox: "!bg-[var(--landing-panel)] !border !border-[var(--landing-line)] !shadow-none !rounded-md w-full",
          card: "!bg-[var(--landing-panel)] !border !border-[var(--landing-line)] !shadow-none !rounded-md w-full !text-[var(--landing-text)]",
        },
      }}
    />
  );
}

