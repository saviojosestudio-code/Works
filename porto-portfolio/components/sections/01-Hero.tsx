"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bars } from "@/components/ui/bars";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/image";
import type { SanitySiteSettings } from "@/lib/sanity/types";

interface HeroSectionProps {
  settings?: SanitySiteSettings | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const heroImage = settings?.heroImage;
  const heroAlt =
    heroImage?.alt ||
    "Formula 1 race car accelerating down the main straight under circuit floodlights";

  const posterImageSrc = heroImage?.asset
    ? urlFor(heroImage).width(2400).quality(90).url()
    : "/DSC09652.jpg";

  // Resolve video URL from Sanity file asset upload OR external URL string
  const videoSrc =
    settings?.heroVideoFile?.asset?.url || settings?.heroVideoUrl || undefined;

  // Determine media type (defaults to video if videoSrc exists, otherwise image)
  const isVideoMode =
    (settings?.heroMediaType === "video" || !settings?.heroMediaType) && Boolean(videoSrc);

  // Floating text from Sanity: prefer explicit heroFloatingText, fall back to heroBadge
  const floatingBadge = settings?.heroFloatingText || settings?.heroBadge;

  return (
    <section id="home" className="flex flex-col w-full">
      <div className="group relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[18/9] lg:aspect-[21/9] overflow-hidden bg-carbon">
        {/* Skeleton loader while video/image downloads */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-carbon z-10 transition-opacity duration-500">
            <Bars className="h-8 w-8 text-primary" bars={3} />
          </div>
        )}

        {isVideoMode && videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            poster={posterImageSrc}
            onLoadedData={() => setIsLoaded(true)}
            onCanPlay={() => setIsLoaded(true)}
            className={cn(
              "w-full h-full object-cover grayscale-[10%] contrast-[1.05] transition-all duration-700 group-hover:scale-[1.02]",
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.01]"
            )}
            style={{ objectPosition: "center 80%" }}
          />
        ) : (
          <Image
            src={posterImageSrc}
            alt={heroAlt}
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
        )}

        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out bg-gradient-to-tr from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Hero title overlay — large cinematic text, shown when heroTitle is set in Sanity */}
        {settings?.heroTitle && (
          <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-20 animate-[fadeIn_0.8s_ease_0.2s_both]">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.04em] text-off-white drop-shadow-2xl leading-none">
              {settings.heroTitle}
            </h1>
          </div>
        )}

        {/* Bottom-left floating dynamic text — matching reference design (single horizontal line, no box) */}
        {floatingBadge && (
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 z-20 flex items-center gap-2.5 sm:gap-3 pointer-events-none select-none max-w-[92%]"
          >
            {/* Subtle vertical indicator bar */}
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[2px] h-3 sm:h-3.5 bg-off-white rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(243,243,239,0.5)]"
              aria-hidden="true"
            />

            {/* Dynamic text from Sanity — single horizontal line, uppercase, refined tracking */}
            <span className="text-[11px] sm:text-xs md:text-sm font-mono font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-off-white/95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] whitespace-nowrap truncate leading-none">
              {floatingBadge}
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
};
