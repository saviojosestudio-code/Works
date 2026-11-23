"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RacingEventDetail, EventPhoto } from "@/lib/data/event-gallery-data";
import { ImageLightboxModal, type LightboxImage } from "@/components/ui/image-lightbox-modal";

interface EventDetailPageProps {
  event: RacingEventDetail;
}

export function EventDetailPage({ event }: EventDetailPageProps) {
  const [previewImage, setPreviewImage] = useState<LightboxImage | null>(null);

  return (
    <div className="min-h-screen flex flex-col text-off-white selection:bg-off-white selection:text-carbon">
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
            <div className="absolute bottom-0 left-0 w-full px-4 sm:px-6 lg:px-8 xl:px-10 pb-12 pt-32 max-w-[1680px] mx-auto flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-off-white text-carbon text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm">
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
          <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-12">
            <div className="relative w-full rounded-2xl bg-transparent border border-titanium/20 backdrop-blur-sm p-6 sm:p-8 md:p-10">
              <p className="text-lg sm:text-xl md:text-2xl text-off-white/90 max-w-5xl leading-relaxed font-light mb-8">
                {event.details}
              </p>

              {/* Event Specs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-titanium/15">
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
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
            {event.photos.map((photo, idx) => {
              // Full-width on mobile; landscape shots expand to 12 cols, portraits share 6 cols
              const isWide = photo.aspect === "landscape";
              const spanClass = isWide && idx % 3 === 0 ? "md:col-span-12" : "md:col-span-6";
              const aspectClass = isWide
                ? spanClass === "md:col-span-12" ? "aspect-[21/9]" : "aspect-[16/10]"
                : "aspect-[3/4]";
              const imgSizes = spanClass === "md:col-span-12"
                ? "(max-width: 768px) 100vw, 95vw"
                : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px";

              const openPreview = () => {
                setPreviewImage({
                  src: photo.image,
                  alt: photo.alt || photo.title,
                });
              };

              return (
                <div
                  key={photo.id || idx}
                  onClick={openPreview}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openPreview();
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Preview ${photo.alt || photo.title}`}
                  className={`group relative w-full ${spanClass} ${aspectClass} overflow-hidden rounded-none sm:rounded-xl bg-transparent border border-titanium/10 transition-all duration-500 hover:border-off-white/40 cursor-pointer`}
                >
                  <Image
                    src={photo.image}
                    alt={photo.alt || photo.title}
                    fill
                    sizes={imgSizes}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              );
            })}
          </div>
        </section>

      </main>

      <Footer />

      <ImageLightboxModal
        image={previewImage}
        onClose={() => setPreviewImage(null)}
      />

    </div>
  );
}

export default EventDetailPage;
