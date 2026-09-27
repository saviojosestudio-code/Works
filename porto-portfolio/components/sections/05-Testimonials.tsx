"use client";

import React from "react";
import { CalendlyCarousel, CarouselItem } from "@/components/ui/connected-carousel";

const TESTIMONIALS_DATA: CarouselItem[] = [
  {
    id: "veloce-racing",
    stat: "300+ km/h Paddock & Track Coverage",
    quote:
      "The precision Ajay brings to trackside photography is extraordinary. Freezing high-speed braking zones and raw pit-lane adrenaline into razor-sharp editorial art is what sets him apart in the paddock.",
    author: "Marcus Albrecht",
    role: "Team Principal, Veloce GT Racing",
    defaultImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    selectedImage:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    alt: "Marcus Albrecht, Team Principal",
  },
  {
    id: "desert-motors",
    stat: "Paddock to Press in < 3 Hours",
    quote:
      "From qualifying shootouts to the podium under the Yas Marina floodlights, Ajay delivers world-class editorial imagery before the engine heat even dissipates. Unmatched speed and aesthetic perfection.",
    author: "Layla Al-Rashid",
    role: "Head of Communications, Gulf Motorsport & F1 Events",
    defaultImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    selectedImage:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    alt: "Layla Al-Rashid, Head of Communications",
  },
  {
    id: "apex-chronicle",
    stat: "14 Magazine Covers Worldwide",
    quote:
      "Working with Ajay Johnson defined the visual identity of our motorsport publication for an entire season. His panning technique through night corners is nothing short of pure cinematic mastery.",
    author: "Tomás Vega",
    role: "Editor-in-Chief, Apex Motorsport Journal",
    defaultImage:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    selectedImage:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    alt: "Tomás Vega, Editor in Chief",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="w-full py-12 sm:py-20 overflow-hidden"
    >
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

