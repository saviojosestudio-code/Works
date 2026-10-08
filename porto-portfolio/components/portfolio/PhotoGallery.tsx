"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PhotoItem, normalizePhotoItem } from "@/lib/data/portfolio-categories";
import { urlFor } from "@/lib/sanity/image";
import type { SanityProjectPhoto, SanityImage } from "@/lib/sanity/types";

interface PhotoGalleryProps {
  images?: (SanityProjectPhoto | SanityImage | PhotoItem | string)[];
  projectTitle: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  images = [],
  projectTitle,
}) => {
  const normalizedPhotos: PhotoItem[] = images
    .map((item, idx) => {
      if (typeof item === "object" && item !== null) {
        if ("image" in item && item.image?.asset) {
          let src = "";
          try {
            src = urlFor(item.image).width(1600).url();
          } catch {
            src = (item.image.asset as { url?: string })?.url || "";
          }
          const aspect: "landscape" | "portrait" =
            item.aspect === "portrait"
              ? "portrait"
              : item.aspect === "landscape"
              ? "landscape"
              : idx % 3 === 0
              ? "landscape"
              : "portrait";
          return {
            id: item._key || `sanity-photo-${idx}`,
            src,
            alt: item.alt || `${projectTitle} photograph ${idx + 1}`,
            aspect,
          };
        }
        if ("asset" in item && item.asset) {
          let src = "";
          try {
            src = urlFor(item).width(1600).url();
          } catch {
            src = (item.asset as { url?: string })?.url || "";
          }
          return {
            id: (item.asset as { _id?: string })?._id || `sanity-img-${idx}`,
            src,
            alt: item.alt || `${projectTitle} photograph ${idx + 1}`,
            aspect: (idx % 3 === 0 ? "landscape" : "portrait") as "landscape" | "portrait",
          };
        }
      }
      return normalizePhotoItem(item as PhotoItem | string, idx, projectTitle);
    })
    .filter((photo) => Boolean(photo.src));

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
      {showSwipeHint && normalizedPhotos.length > 0 && (
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

      {normalizedPhotos.length === 0 ? (
        <div className="py-16 text-center text-titanium font-mono text-xs uppercase tracking-widest border border-dashed border-titanium/20 rounded-xl">
          Gallery archive being updated
        </div>
      ) : (
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

          const imgSizes = spanClass === "md:col-span-12"
            ? "(max-width: 768px) 100vw, 95vw"
            : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px";

          return (
            <article
              key={photo.id || `photo-${index}`}
              className={`group flex flex-col ${spanClass}`}
            >
              <div
                className={`relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-carbon/60 border border-titanium/15 transition-all duration-500 group-hover:border-off-white/40 ${
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
    )}
  </div>
);
};
