import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});



export const metadata: Metadata = {
  title:
  {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`, // change the tab name in particular board along with the main site name
  },
  description: siteConfig.description,
  icons: {
    icon: "/plana-icon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>


        <body
          className={`${montserrat.className} antialiased min-h-screen`}
        >
          {children}
        </body>
      </ClerkProvider>

    </html>
  );
}
