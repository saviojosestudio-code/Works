import { safeSanityFetch } from "@/lib/sanity/client";
import {
  SITE_SETTINGS_QUERY,
  CATEGORIES_QUERY,
  TESTIMONIALS_QUERY,
} from "@/lib/sanity/queries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/01-Hero";
import { WorkSection } from "@/components/sections/03-Work";
import { ContactSection } from "@/components/sections/04-Contact";
import { TestimonialsSection } from "@/components/sections/05-Testimonials";
import type {
  SanitySiteSettings,
  SanityCategory,
  SanityTestimonial,
} from "@/lib/sanity/types";

export default async function Home() {
  const [settings, categories, testimonials] = await Promise.all([
    safeSanityFetch<SanitySiteSettings | null>(SITE_SETTINGS_QUERY, {}, null),
    safeSanityFetch<SanityCategory[]>(CATEGORIES_QUERY, {}, []),
    safeSanityFetch<SanityTestimonial[]>(TESTIMONIALS_QUERY, {}, []),
  ]);

  return (
    <div className="min-h-screen flex flex-col relative w-full text-off-white selection:bg-racing-red selection:text-off-white">
      {/* Editorial Top Navigation */}
      <Header />

      {/* Main Content Flow */}
      <main className="flex flex-col relative w-full flex-grow">
        {/* 01 // Hero */}
        <HeroSection settings={settings} />

        {/* 03 // Selected Work / Motorsport */}
        <WorkSection categories={categories} />

        <TestimonialsSection testimonials={testimonials} />

        <ContactSection settings={settings} />
      </main>

      {/* Monolithic Footer Directory */}
      <Footer />
    </div>
  );
}
