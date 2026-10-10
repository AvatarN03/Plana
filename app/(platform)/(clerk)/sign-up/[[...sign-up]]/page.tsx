import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign Up | Plana Auth Page",
  description: "Planner auth page - Sign up for your Plana workspace",
  keywords: ["Plana", "planner auth page", "Plana Auth Page", "Sign Up", "auth page"],
  other: {
    "planner-auth-page": "sign-up",
  },
};

export default function SignUpPage() {
  return (
    <SignUp
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
          card: "!bg-[var(--landing-panel)] !border !border-[var(--landing-line)] !shadow-none !rounded-none w-full !text-[var(--landing-text)]",
        },
      }}
    />
  );
}

