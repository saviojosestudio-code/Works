import type { Metadata } from "next";
import AboutPage from "@/components/sections/About-Page";
import { Header } from "@/components/layout/Header";
import { safeSanityFetch } from "@/lib/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/lib/sanity/queries";
import type { SanitySiteSettings } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "About — RAPHREV // Ajay Johnson",
  description:
    "Ajay Johnson is a photographer, videographer, and visual storyteller based in Dubai, UAE — specialising in motorsport, automotive, commercial, and brand content.",
};

export default async function About() {
  const siteSettings = await safeSanityFetch<SanitySiteSettings | undefined>(
    SITE_SETTINGS_QUERY,
    {},
    undefined
  );

  return (
    <>
      <Header />
      <AboutPage siteSettings={siteSettings} />
    </>
  );
}
