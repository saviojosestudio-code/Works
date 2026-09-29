"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PhotoItem, normalizePhotoItem } from "@/lib/data/portfolio-categories";

interface PhotoGalleryProps {
  images: (PhotoItem | string)[];
  projectTitle: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  images,
  projectTitle,
}) => {
  const normalizedPhotos: PhotoItem[] = images.map((item, idx) =>
    normalizePhotoItem(item, idx, projectTitle)
  );

  // Show a brief swipe-to-browse hint on touch devices
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) {
      setShowSwipeHint(true);
      const t = setTimeout(() => setShowSwipeHint(false), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="flex flex-col w-full relative">
      {/* Touch swipe hint — fades out after 2.5s on mobile */}
      {showSwipeHint && (
        <div
          className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-titanium/20 backdrop-blur-sm animate-fade-in-out"
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-titanium">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">Scroll to explore</span>
        </div>
      )}

      {/* Editorial Responsive Mosaic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        {normalizedPhotos.map((photo, index) => {
          let spanClass = "md:col-span-6";
          if (photo.aspect === "landscape" && index % 4 === 0) {
            spanClass = "md:col-span-12";
          } else if (photo.aspect === "portrait") {
            spanClass = "md:col-span-6";
          } else if (photo.aspect === "landscape") {
            spanClass = "md:col-span-6";
          }

          // Correct sizes: full-width on mobile, 100vw for 12-col spans, ~50vw for 6-col
          const imgSizes = spanClass === "md:col-span-12"
            ? "(max-width: 768px) 100vw, 95vw"
            : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px";

          return (
            <article
              key={photo.id || `photo-${index}`}
              className={`group flex flex-col ${spanClass}`}
            >
              {/* Frame Container - Edge-aligned and clean, no captions or text beneath */}
              <div
                className={`relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-carbon/60 border border-titanium/15 transition-all duration-500 group-hover:border-racing-red/50 ${
                  photo.aspect === "landscape"
                    ? spanClass === "md:col-span-12"
                      ? "aspect-[16/9] sm:aspect-[21/9]"
                      : "aspect-[16/10]"
                    : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt || projectTitle}
                  fill
                  sizes={imgSizes}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
