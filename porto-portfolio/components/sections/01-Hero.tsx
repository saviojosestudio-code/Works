"use client";

import React, { useState } from "react";
import Image from "next/image";
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out bg-gradient-to-tr from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Bottom-left floating overlay — image and/or text from Sanity */}
        {(settings?.heroFloatingImage?.asset?.url || settings?.heroFloatingText) && (
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex items-end gap-3 animate-[fadeIn_0.8s_ease_0.4s_both]">
            {settings?.heroFloatingImage?.asset?.url && (
              <Image
                src={settings.heroFloatingImage.asset.url}
                alt={settings.heroFloatingImage.alt || "Hero floating image"}
                width={64}
                height={64}
                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border border-white/20 shadow-lg"
              />
            )}
            {settings?.heroFloatingText && (
              <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-white/80 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-md border border-white/10 shadow-md leading-none">
                {settings.heroFloatingText}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
