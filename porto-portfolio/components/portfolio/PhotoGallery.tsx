"use client";

import React from "react";
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

  return (
    <div className="flex flex-col w-full">
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
                  sizes="(max-width: 768px) 100vw, 85vw"
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
