import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { SiteShell } from "@/components/layout/site-shell";
import "@/styles/variables.css";
import "@/styles/globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-ibm-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ibm-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Company HVAC — Climate systems engineered for every building",
    template: "%s — Company HVAC",
  },
  description:
    "Design consultancy, supply, installation and maintenance for commercial, industrial and residential projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
