"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const PHOTOGRAPHY_CATEGORIES = [
  {
    id: "motorsport",
    title: "MOTORSPORT",
    description:
      "High-energy photography capturing speed, precision, competition and the intensity of motorsport.",
    cta: "Explore Motorsport",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "live-events",
    title: "LIVE EVENTS",
    description:
      "Authentic photography capturing the energy, atmosphere and defining moments of live events and experiences.",
    cta: "Explore Live Events",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "fashion",
    title: "FASHION",
    description:
      "Editorial and lifestyle photography focused on people, style, identity and creative visual storytelling.",
    cta: "Explore Fashion",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "marketing",
    title: "MARKETING PHOTOGRAPHY",
    description:
      "Purpose-driven photography created for brands, campaigns, products and commercial storytelling.",
    cta: "Explore Marketing",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=90",
  },
];

export const WorkSection: React.FC = () => {
  return (
    <section id="work" className="flex flex-col w-full py-16 sm:py-24">
      {/* 4-Category Premium Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {PHOTOGRAPHY_CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={`/work/${category.id}`}
            className="group relative flex flex-col justify-end w-full min-h-[450px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[600px] overflow-hidden bg-carbon"
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>

            {/* Base gradient — always present, richer multi-stop */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
            {/* Top vignette — fades in on hover */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            {/* Racing-red bottom glint — branding accent on hover */}
            <div className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-gradient-to-r from-transparent via-racing-red/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />

            {/* Content (Bottom Left) */}
            <div className="relative z-20 flex flex-col p-6 sm:p-8 md:p-12 transition-transform duration-700 ease-out group-hover:-translate-y-2">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-off-white m-0 leading-tight">
                {category.title}
              </h3>
              
              <p className="text-sm sm:text-base text-off-white/90 mt-3 sm:mt-4 max-w-md leading-relaxed font-light line-clamp-3">
                {category.description}
              </p>
              
              <div className="mt-6 sm:mt-8 flex items-center gap-2">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-titanium group-hover:text-racing-red transition-colors">
                  {category.cta}
                </span>
                <span className="text-sm text-titanium group-hover:text-racing-red transition-all group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
