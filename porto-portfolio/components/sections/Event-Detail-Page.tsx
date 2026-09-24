"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RacingEventDetail, EventPhoto } from "@/lib/data/event-gallery-data";

interface EventDetailPageProps {
  event: RacingEventDetail;
}

export function EventDetailPage({ event }: EventDetailPageProps) {
  return (
    <div className="min-h-screen flex flex-col text-off-white selection:bg-racing-red selection:text-off-white">
      <Header />

      <main className="flex-grow pt-20 sm:pt-24 pb-20">
        
        {/* Event Header Banner (Cinematic Hero) */}
        <section className="w-full relative flex flex-col mb-12 sm:mb-20">
          

          {/* Massive Cinematic Hero Image */}
          <div className="relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh] overflow-hidden bg-transparent">
            <Image
              src={event.heroImage}
              alt={event.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Gradient overlay for text legibility at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Hero Text Overlaid */}
            <div className="absolute bottom-0 left-0 w-full px-4 sm:px-6 lg:px-8 pb-12 pt-32 max-w-6xl mx-auto flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-racing-red text-off-white text-[10px] font-bold uppercase tracking-widest rounded-sm">
                  {event.tag}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-titanium drop-shadow-md">
                  {event.year} // {event.location}
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-[-0.03em] text-off-white drop-shadow-lg leading-none m-0">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Details & Specs Below Hero */}
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <p className="text-lg sm:text-xl md:text-2xl text-off-white/90 max-w-4xl leading-relaxed font-light">
              {event.details}
            </p>

            {/* Event Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-titanium/15 mt-4">
              {event.specs.laps && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">Distance</span>
                  <span className="text-sm font-semibold uppercase text-off-white">{event.specs.laps}</span>
                </div>
              )}
              {event.specs.turns && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">Circuit Layout</span>
                  <span className="text-sm font-semibold uppercase text-off-white">{event.specs.turns}</span>
                </div>
              )}
              {event.specs.elevation && (
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">Elevation</span>
                  <span className="text-sm font-semibold uppercase text-off-white">{event.specs.elevation}</span>
                </div>
              )}
              <div className="flex flex-col col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">Capture Rig</span>
                <span className="text-xs font-semibold uppercase text-off-white truncate">{event.specs.cameraTech}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mixed Editorial Gallery Grid (Landscape + Portrait) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {event.photos.map((photo, index) => {
              // Determine layout spans for masonry feel based on index and aspect ratio
              let spanClass = "md:col-span-6"; // Default half width
              if (photo.aspect === "landscape" && index % 5 === 0) {
                spanClass = "md:col-span-12"; // Large full-width feature
              } else if (photo.aspect === "portrait") {
                spanClass = "md:col-span-4"; // Tighter portrait column
              } else if (photo.aspect === "landscape") {
                spanClass = "md:col-span-8"; // Wider supporting landscape
              }

              return (
                <article
                  key={photo.id}
                  className={`group flex flex-col gap-4 ${spanClass}`}
                >
                  {/* Frame Container */}
                  <div
                    className={`relative w-full overflow-hidden rounded-none sm:rounded-xl bg-transparent transition-all duration-500 ${
                      photo.aspect === "landscape" ? (spanClass === "md:col-span-12" ? "aspect-[21/9]" : "aspect-[16/10]") : "aspect-[3/4]"
                    }`}
                  >
                    <Image
                      src={photo.image}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 80vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Title & Metadata (Clean, detached) */}
                  <div className="flex items-start justify-between px-0 sm:px-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-titanium mb-1 font-mono uppercase tracking-widest">
                        {photo.aspect} // {photo.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-off-white group-hover:text-racing-red transition-colors m-0">
                        {photo.title}
                      </h3>
                      <span className="text-xs text-titanium mt-1 font-mono uppercase tracking-widest">
                        {photo.subtitle} • {photo.location}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>


        </section>

      </main>

      <Footer />

    </div>
  );
}

export default EventDetailPage;
