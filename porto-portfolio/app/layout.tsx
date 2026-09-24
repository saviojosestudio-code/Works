import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "@/components/threeui/threeui.css";
import { RibbonFieldBackground } from "@/components/threeui/RibbonFieldBackground";

import localFont from "next/font/local";

/*
 * Montserrat is loaded as a web-safe fallback only.
 * Primary typeface is Helvetica Neue (system font) defined in globals.css.
 * On systems without Helvetica Neue, Montserrat kicks in automatically.
 */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const moonWalk = localFont({
  src: "./fonts/MoonWalk.ttf",
  variable: "--font-moon-walk",
  display: "swap",
});


export const metadata: Metadata = {
  title: "RAPHREV // AJAY — Editorial Motorsport Photographer & Visual Artist",
  description:
    "Dubai-based editorial photographer and visual storyteller specializing in premier motorsport, hypercars, and high-contrast architecture across the Middle East, Europe, and Asia.",
  keywords: [
    "RAPHREV",
    "RaphRev",
    "Ajay",
    "Editorial Photographer",
    "Motorsport Photography",
    "Formula 1",
    "Dubai",
    "Visual Artist",
    "Hypercars",
  ],
  authors: [{ name: "Ajay Johnson (RAPHREV)" }],
  openGraph: {
    title: "RAPHREV // AJAY — Editorial Motorsport Photographer & Visual Artist",
    description:
      "This is more than just capturing what happens. It's about capturing what it feels like.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${moonWalk.variable} scroll-smooth dark`}
    >
      <body className="min-h-screen text-off-white font-sans antialiased">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <RibbonFieldBackground 
            speed={1.00}
            pointerAmount={1.00}
            smoothing={0.035}
            hue={0}
            saturation={1.00}
            brightness={1.00}
            opacity={1.00}
          />
        </div>
        <div className="relative z-10 min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
