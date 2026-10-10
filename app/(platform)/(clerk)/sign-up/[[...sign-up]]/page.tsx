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
          cardBox: "!bg-landing-panel !border !border-landing-line !shadow-none !rounded-sm w-full",
          card: "!bg-transparent !border-0 !shadow-none !rounded-sm w-full !text-landing-text",
          formFieldInput: "!rounded-sm",
          formButtonPrimary: "!rounded-sm",
          socialButtonsBlockButton: "!rounded-sm",
          footer: "!bg-transparent !border-t !border-landing-line !border-b-0 !border-x-0 !m-0",
          footerAction: "!border-0",
        },
      }}
    />
  );
}
