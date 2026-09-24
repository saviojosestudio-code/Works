"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RAPHREV_DATA } from "@/lib/data/portfolio-data";
import { Bars } from "@/components/ui/bars";
import { cn } from "@/lib/utils";

interface HeroSectionProps {}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const { hero } = RAPHREV_DATA;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section id="home" className="flex flex-col w-full">
      {/* Full-bleed Hero Image */}
      <div
        className="group relative w-full aspect-[16/10] sm:aspect-[18/9] md:aspect-[21/9] overflow-hidden bg-carbon"
      >
        {/* Loader while image is downloading/rendering */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-carbon z-10 transition-opacity duration-500">
            <Bars className="h-8 w-8 text-primary" bars={3} />
          </div>
        )}

        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className={cn(
            "object-cover grayscale-[15%] contrast-[1.05] transition-all duration-700 group-hover:scale-[1.02]",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.01]"
          )}
          style={{ objectPosition: "center 80%" }}
          onLoad={() => setIsLoaded(true)}
        />
        {/* Base vignette — always present */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
        {/* Hover-reactive gradient — deepens on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out bg-gradient-to-tr from-black/60 via-transparent to-black/30 pointer-events-none" />
      </div>
    </section>
  );
};
