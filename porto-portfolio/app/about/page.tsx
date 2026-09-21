import type { Metadata } from "next";
import AboutPage from "@/components/sections/About-Page";

export const metadata: Metadata = {
  title: "About — RAPHREV // Ajay Johnson",
  description:
    "Ajay Johnson is a photographer, videographer, and visual storyteller based in Dubai, UAE — specialising in motorsport, automotive, commercial, and brand content.",
};

export default function About() {
  return <AboutPage />;
}
