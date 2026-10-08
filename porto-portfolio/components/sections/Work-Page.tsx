"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RACING_EVENTS_DATA, EventPhoto } from "@/lib/data/event-gallery-data";

export function WorkPage() {
  const events = Object.values(RACING_EVENTS_DATA);
  const allPhotos: (EventPhoto & { eventId: string; eventTitle: string })[] = events.flatMap((evt) =>
    evt.photos.map((p) => ({ ...p, eventId: evt.id, eventTitle: evt.title }))
  );

  const [filter, setFilter] = useState<"all" | "landscape" | "portrait">("all");

  const filteredPhotos = allPhotos.filter((p) => {
    if (filter === "all") return true;
    return p.aspect === filter;
  });

  return (
    <div className="min-h-screen flex flex-col text-off-white selection:bg-off-white selection:text-carbon">
      <Header />

      <main className="flex-grow pt-24 sm:pt-28 pb-20">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Bar */}
          <div className="flex flex-col gap-4 pb-10 border-b border-titanium/15">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-widest text-titanium">
                03 // RACING EVENTS ARCHIVE
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-off-white">
                [{events.length} EVENTS // {allPhotos.length} FRAMES]
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-[-0.04em]">
              Racing Events
            </h1>
            <p className="text-sm sm:text-base text-titanium max-w-xl">
              Select an event to view its dedicated photography archive, specs, and editorial story.
            </p>
          </div>

          {/* Cinematic Stacked Events */}
          <div className="flex flex-col gap-24 sm:gap-32 pt-10 pb-20 border-b border-titanium/15">
            {events.map((event, index) => (
              <Link
                key={event.id}
                href={`/work/${event.id}`}
                className="group cursor-pointer flex flex-col gap-6 sm:gap-8"
              >
                {/* Event Hero Frame (Massive) */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-[24/9] overflow-hidden rounded-none sm:rounded-xl bg-transparent">
                  <Image
                    src={event.heroImage}
                    alt={event.title}
                    fill
                    sizes="100vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                  />
                  {/* Base gradient vignette – always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20 pointer-events-none" />
                  {/* Hover gradient – intensifies on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out bg-gradient-to-tr from-black/60 via-transparent to-black/30 pointer-events-none" />
                </div>
                
                {/* Clean Typography */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-0 sm:px-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">
                      {event.tag} // {event.photos.length} Frames
                    </span>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-off-white group-hover:text-white transition-colors mt-0.5 leading-tight m-0">
                      {event.title}
                    </h2>
                  </div>
                  <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-off-white group-hover:underline underline-offset-4 transition-all shrink-0">
                    Open Event ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Full Photo Stream */}
          <div className="pt-12">
            <div className="flex items-center justify-between pb-6">
              <h2 className="text-2xl font-bold uppercase tracking-tight text-off-white">
                All Event Photography Stream
              </h2>

              {/* Filter Pills */}
              <div className="flex items-center gap-2">
                {(["all", "landscape", "portrait"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-full border text-[11px] uppercase tracking-widest font-mono transition-all ${
                      filter === f
                        ? "bg-off-white text-carbon border-off-white font-semibold"
                        : "border-titanium/20 text-titanium hover:border-off-white/40 hover:text-off-white bg-carbon/50"
                    }`}
                  >
                    {f === "all" ? "All Formats" : f}
                  </button>
                ))}
              </div>
            </div>

            {/* Varied Editorial Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pt-8">
              {filteredPhotos.map((photo, index) => {
                // Determine layout spans for masonry feel based on index and aspect ratio
                let spanClass = "md:col-span-6"; // Default half width
                if (photo.aspect === "landscape" && index % 4 === 0) {
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

                    <div className="flex items-start justify-between px-0 sm:px-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-titanium mb-1 font-mono uppercase tracking-widest">
                          {photo.eventTitle} // {photo.location}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-off-white group-hover:text-white transition-colors m-0">
                          {photo.title}
                        </h3>
                        <span className="text-xs text-titanium mt-1 font-mono uppercase tracking-widest">
                          {photo.subtitle}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      <Footer />

    </div>
  );
}

export default WorkPage;
