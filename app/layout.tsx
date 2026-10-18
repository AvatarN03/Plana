import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/plana-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('plana-theme') === 'light') {
                  document.documentElement.classList.add('light-mode');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: "#ff7619",
            colorText: "#f5f4ee",
            colorTextSecondary: "#b8b8af",
            colorBackground: "#171815",
            colorInputBackground: "#1d1e1b",
            colorInputText: "#f5f4ee",
          },
        }}
      >
        <body
          className={`${montserrat.variable} ${montserrat.className} font-sans antialiased min-h-screen landing-shell`}
        >
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
