"use client";

import React from "react";
import { CalendlyCarousel, CarouselItem } from "@/components/ui/connected-carousel";

const TESTIMONIALS_DATA: CarouselItem[] = [
  {
    id: "veloce-racing",
    stat: "120+ race events covered",
    quote:
      "The level of detail captured at speed is extraordinary. Every frame tells the story of mechanical precision and raw adrenaline.",
    author: "Marcus Albrecht",
    role: "Team Principal, Veloce Racing",
    defaultImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    selectedImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    alt: "Marcus Albrecht, Team Principal",
  },
  {
    id: "desert-motors",
    stat: "Campaign delivered in 72 hours",
    quote:
      "The turnaround from shoot to final edit was unmatched. Our launch campaign received recognition we hadn't anticipated.",
    author: "Layla Al-Rashid",
    role: "Head of Marketing, Desert Motors UAE",
    defaultImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    selectedImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    alt: "Layla Al-Rashid, Head of Marketing",
  },
  {
    id: "apex-chronicle",
    stat: "3× editorial award winner",
    quote:
      "Working with Savio produced imagery that defined the visual identity of our motorsport editorial for an entire season.",
    author: "Tomás Vega",
    role: "Editor-in-Chief, Apex Chronicle",
    defaultImage:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    selectedImage:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    alt: "Tomás Vega, Editor in Chief",
  },
  {
    id: "hyperion-auto",
    stat: "40% increase in brand engagement",
    quote:
      "The cinematic quality of the content elevated our brand perception across every market we operate in.",
    author: "Priya Nambiar",
    role: "Creative Director, Hyperion Automotive",
    defaultImage:
      "https://images.unsplash.com/photo-1594824813566-7885a3964662?auto=format&fit=crop&q=80&w=800",
    selectedImage:
      "https://images.unsplash.com/photo-1594824813566-7885a3964662?auto=format&fit=crop&q=80&w=800",
    alt: "Priya Nambiar, Creative Director",
  },
  {
    id: "yaw-media",
    stat: "Global syndication across 18 outlets",
    quote:
      "The panning shots from Yas Marina were syndicated internationally — a testament to their technical and artistic calibre.",
    author: "Jordan Osei",
    role: "Photo Editor, YAW Media Group",
    defaultImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
    selectedImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
    alt: "Jordan Osei, Photo Editor",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="w-full py-20 sm:py-28 overflow-hidden"
    >
      {/* Section header */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-titanium">
              05 // Client Voices
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-[-0.03em] text-off-white leading-none m-0">
              What They Say
            </h2>
          </div>
          <p className="text-sm text-titanium font-mono uppercase tracking-wider max-w-xs sm:text-right leading-relaxed">
            From motorsport teams to automotive brands
          </p>
        </div>

        {/* Divider */}
        <div className="mt-8 h-px bg-gradient-to-r from-racing-red via-titanium/20 to-transparent" />
      </div>

      {/* Carousel */}
      <CalendlyCarousel
        items={TESTIMONIALS_DATA}
        autoPlayInterval={7000}
        pauseOnHover={true}
        className="px-4 sm:px-6"
      />
    </section>
  );
}

