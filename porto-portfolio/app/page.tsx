"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/01-Hero";
import { AboutSection } from "@/components/sections/02-About";
import { WorkSection } from "@/components/sections/03-Work";
import { ContactSection } from "@/components/sections/04-Contact";
import { TestimonialsSection } from "@/components/sections/05-Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative w-full text-off-white selection:bg-racing-red selection:text-off-white">
      {/* Editorial Top Navigation */}
      <Header />

      {/* Main Content Flow */}
      <main className="flex flex-col relative w-full flex-grow">
        {/* 01 // Hero */}
        <HeroSection />

        <AboutSection />

        {/* 03 // Selected Work / Motorsport */}
        <WorkSection />

        <TestimonialsSection />

        <ContactSection />
      </main>

      {/* Monolithic Footer Directory */}
      <Footer />
    </div>
  );
}
