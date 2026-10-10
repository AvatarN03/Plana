import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign In | Plana Auth Page",
  description: "Planner auth page - Sign in to your Plana workspace",
  keywords: ["Plana", "planner auth page", "Plana Auth Page", "Sign In", "auth page"],
  other: {
    "planner-auth-page": "sign-in",
  },
};

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
          cardBox: "!bg-[var(--landing-panel)] !border !border-[var(--landing-line)] !shadow-none !rounded-none w-full",
          card: "!bg-transparent !border-0 !shadow-none !rounded-none w-full !text-[var(--landing-text)]",
          footer: "!bg-transparent !border-t !border-[var(--landing-line)] !border-b-0 !border-x-0 !m-0",
          footerAction: "!border-0",
        },
      }}
    />
  );
}

