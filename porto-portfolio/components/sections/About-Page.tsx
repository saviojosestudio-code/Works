"use client";

import React from "react";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { urlFor } from "@/lib/sanity/image";
import type { SanitySiteSettings } from "@/lib/sanity/types";

interface AboutPageProps {
  siteSettings?: SanitySiteSettings;
}

export function AboutPage({ siteSettings }: AboutPageProps) {
  const bio = siteSettings?.aboutBio;
  const portraitUrl = siteSettings?.aboutImage?.asset
    ? urlFor(siteSettings.aboutImage).width(1400).url()
    : "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=90";

  return (
    <div className="min-h-screen flex flex-col text-off-white selection:bg-racing-red selection:text-off-white">
      <main className="flex-grow flex items-start justify-center pt-24 pb-12 sm:pt-28 md:pt-32 md:pb-24">
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start md:items-stretch">
          {/* Text column (matching Hero Description & Contact glass card effect) */}
          <div className="w-full md:flex-1 flex flex-col justify-start rounded-2xl bg-transparent border border-titanium/20 backdrop-blur-sm p-6 sm:p-8 md:p-10 gap-5 sm:gap-6 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-off-white text-left leading-tight">
              {siteSettings?.aboutTitle || "About Me"}
            </h1>

            <div className="flex flex-col gap-4 text-left">
              {bio && bio.length > 0 ? (
                bio.map((para: string, idx: number) => (
                  <p key={idx} className="text-sm sm:text-base md:text-lg leading-relaxed text-off-white/90 text-left">
                    {para}
                  </p>
                ))
              ) : (
                <>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-off-white/90 text-left">
                    <strong>Ajay Johnson</strong> — Photographer, videographer &amp; visual storyteller based in Dubai, UAE.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-off-white/90 text-left">
                    My journey into visual storytelling began through a curiosity for design, cameras, and the way a single frame can communicate a story. Over the years that curiosity grew into a passion for photography, filmmaking, and creative direction, eventually leading me into the world of motorsport.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-off-white/90 text-left">
                    For the past few years I’ve had the opportunity to work closely within professional motorsport, capturing the intensity of race weekends, endurance events, test days and the world that exists behind the racing itself.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-off-white/90 text-left">
                    My work extends beyond motorsport into automotive, commercial, events, lifestyle and brand content.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-off-white/90 text-left">
                    <strong>RAPHREV</strong> combines photography, film and creative storytelling to create visuals that are authentic, cinematic and built to leave an impression.
                  </p>
                </>
              )}
            </div>

            <blockquote className="border-l-2 border-racing-red pl-4 italic text-off-white/80 mt-2 text-sm sm:text-base md:text-lg text-left">
              <p>
                {siteSettings?.aboutQuote
                  ? `“${siteSettings.aboutQuote}”`
                  : "“This is more than just capturing what happens. It’s about capturing what it feels like.”"}
              </p>
            </blockquote>
          </div>

          {/* Image column */}
          <div className="w-full md:flex-1 relative aspect-[4/5] sm:aspect-[3/4] md:aspect-auto md:min-h-[600px] lg:min-h-[700px] rounded-2xl overflow-hidden bg-transparent group">
            <Image
              src={portraitUrl}
              alt="Ajay Johnson — RAPHREV Motorsport Editorial & Visual Storyteller"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border border-titanium/20 bg-black/50 backdrop-blur-md px-5 py-3 rounded-lg">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-titanium">
                Dubai // Worldwide
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={siteSettings} />
    </div>
  );
}

export default AboutPage;
