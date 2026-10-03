"use client";

import React from "react";
import type { SanitySiteSettings } from "@/lib/sanity/types";

const FALLBACK_TAGLINE =
  "Capturing the Apex of Energy and Emotion Across the UK and Worldwide.";

const FALLBACK_DESCRIPTION =
  "In the moments that define your event – the roar of the crowd, the first chord from the stage, the shared vision at a corporate launch – lie stories waiting to be told. I am a professional UK event photographer specialising in creating powerful, cinematic images that don't just document your event; they capture its energy. From the high-stakes world of competitive sport to the vibrant pulse of a music festival and the polished professionalism of a corporate conference, I deliver high-impact photography that becomes a lasting asset for your brand.";

interface AboutSectionProps {
  settings?: SanitySiteSettings | null;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings }) => {
  const tagline = settings?.heroTagline || FALLBACK_TAGLINE;
  const description = settings?.heroDescription || FALLBACK_DESCRIPTION;

  return (
    <section id="about" className="w-full py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8">

      {/* Glass card */}
      <div className="
        relative w-full max-w-screen-2xl mx-auto
        rounded-2xl
        bg-transparent border border-titanium/20 backdrop-blur-sm
        py-12 px-6
        sm:py-16 sm:px-16
        md:py-20 md:px-24
        lg:py-28 lg:px-32
        lg:min-h-[42vh]
        xl:min-h-[48vh]
        2xl:min-h-[44vh]
        flex items-center justify-center
      ">

        {/* Content — always centred */}
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-7 max-w-3xl text-center w-full">

          <h2 className="
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            font-semibold uppercase tracking-tight
            text-off-white leading-tight
          ">
            {tagline}
          </h2>

          <p className="
            text-sm sm:text-sm md:text-base
            text-titanium leading-relaxed font-light
          ">
            {description}
          </p>

        </div>
      </div>
    </section>
  );
};
