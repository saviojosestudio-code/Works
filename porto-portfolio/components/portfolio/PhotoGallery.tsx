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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
        {normalizedPhotos.map((photo, index) => {
          let spanClass = "md:col-span-6";
          if (photo.aspect === "landscape" && index % 4 === 0) {
            spanClass = "md:col-span-12";
          } else if (photo.aspect === "portrait") {
            spanClass = "md:col-span-4";
          } else if (photo.aspect === "landscape") {
            spanClass = "md:col-span-8";
          }

          return (
            <article
              key={photo.id}
              className={`group flex flex-col gap-3.5 ${spanClass}`}
            >
              {/* Frame Container */}
              <div
                className={`relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-carbon border border-titanium/15 transition-all duration-500 group-hover:border-racing-red/40 ${
                  photo.aspect === "landscape"
                    ? spanClass === "md:col-span-12"
                      ? "aspect-[21/9]"
                      : "aspect-[16/10]"
                    : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 85vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Title & Metadata */}
              {(photo.title || photo.subtitle) && (
                <div className="flex items-start justify-between px-1">
                  <div className="flex flex-col">
                    {photo.category && (
                      <span className="text-[9px] text-titanium mb-0.5 font-mono uppercase tracking-widest">
                        {photo.aspect} // {photo.category}
                      </span>
                    )}
                    {photo.title && (
                      <h4 className="text-base sm:text-lg font-bold uppercase tracking-tight text-off-white group-hover:text-racing-red transition-colors m-0">
                        {photo.title}
                      </h4>
                    )}
                    {photo.subtitle && (
                      <span className="text-[11px] text-titanium font-mono mt-0.5">
                        {photo.subtitle} {photo.location ? `• ${photo.location}` : ""}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
