"use client";

import React from "react";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8">

      {/* Glass card — wider layout matching page-wide containers */}
      <div className="relative w-full max-w-screen-2xl mx-auto aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] rounded-2xl overflow-hidden bg-transparent border border-titanium/20 backdrop-blur-sm">

        {/* Content — centred inside the card */}
        <div className="absolute inset-0 flex items-center justify-center px-8 sm:px-16 md:px-24 lg:px-32">
          <div className="flex flex-col gap-5 sm:gap-7 max-w-3xl text-center">

            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-tight text-off-white leading-tight">
              Capturing the Apex of Energy and Emotion Across the UK and Worldwide.
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-titanium leading-relaxed font-light">
              In the moments that define your event – the roar of the crowd, the first chord from
              the stage, the shared vision at a corporate launch – lie stories waiting to be told.
              I am a professional UK event photographer specialising in creating powerful, cinematic
              images that don&apos;t just document your event; they capture its energy. From the
              high-stakes world of competitive sport to the vibrant pulse of a music festival and
              the polished professionalism of a corporate conference, I deliver high-impact
              photography that becomes a lasting asset for your brand.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
};
