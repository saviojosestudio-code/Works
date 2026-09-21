"use client";

import React from "react";
import Image from "next/image";
import { RAPHREV_DATA } from "@/lib/data/portfolio-data";

interface HeroSectionProps {
  onImageClick?: (src: string, alt: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onImageClick }) => {
  const { hero } = RAPHREV_DATA;

  return (
    <section id="home" className="flex flex-col w-full">
      {/* Full-bleed Hero Image */}
      <div
        onClick={() => onImageClick?.(hero.image, hero.imageAlt)}
        className="group relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] overflow-hidden cursor-pointer"
      >
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale-[15%] contrast-[1.05] transition-transform duration-700 group-hover:scale-[1.02]"
        />
        {/* Base vignette — always present */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20 pointer-events-none" />
        {/* Hover-reactive gradient — deepens on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out bg-gradient-to-tr from-black/60 via-transparent to-black/30 pointer-events-none" />
      </div>
    </section>
  );
};
