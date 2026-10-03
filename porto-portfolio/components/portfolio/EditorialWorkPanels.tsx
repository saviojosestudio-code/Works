"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { SanityCategory } from "@/lib/sanity/types";

interface EditorialWorkPanelsProps {
  categories: SanityCategory[];
}

export const EditorialWorkPanels: React.FC<EditorialWorkPanelsProps> = ({
  categories,
}) => {
  return (
    <section
      aria-label="Photography Portfolio Categories"
      className="w-full min-h-screen lg:h-screen lg:max-h-screen flex flex-col lg:flex-row overflow-hidden relative bg-carbon"
    >
      {categories.map((category, index) => {
        const indexStr = String(index + 1).padStart(2, "0");
        const coverImageUrl = category.coverImage?.asset
          ? urlFor(category.coverImage).width(1200).url()
          : "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1200";

        return (
          <Link
            key={category.slug || category._id}
            href={`/work/${category.slug}`}
            className="group relative flex-1 min-h-[75vh] sm:min-h-[80vh] lg:min-h-0 lg:h-full flex flex-col justify-end overflow-hidden cursor-pointer border-b lg:border-b-0 lg:border-r border-titanium/15 last:border-r-0 last:border-b-0 transition-all select-none"
          >
            {/* Full-Bleed Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={coverImageUrl}
                alt={`${category.title} photography portfolio by Ajay Johnson`}
                fill
                priority={index < 3}
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110 group-hover:contrast-105"
              />
            </div>

            {/* Dark Cinematic Gradient Overlays */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/55 via-45% to-transparent pointer-events-none transition-opacity duration-700" />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Subtle interactive frame highlight */}
            <div className="absolute inset-0 z-10 border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />

            {/* Racing Red Bottom Glint Accent */}
            <div className="absolute bottom-0 left-0 right-0 z-15 h-[2px] bg-gradient-to-r from-transparent via-racing-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Bottom Editorial Content */}
            <div className="relative z-20 flex flex-col justify-end w-full px-6 sm:px-8 md:px-10 lg:px-7 xl:px-12 pb-10 sm:pb-12 md:pb-14 lg:pb-16 pt-28 pointer-events-none">
              {/* Category Tag / Number */}
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-titanium drop-shadow-sm font-medium">
                  {category.tag || `${indexStr} // ARCHIVE`}
                </span>
              </div>

              {/* Category Headline */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-3xl xl:text-5xl 2xl:text-6xl font-bold uppercase tracking-[-0.03em] text-off-white leading-none m-0 drop-shadow-lg group-hover:text-off-white transition-colors">
                {category.title}
              </h2>

              {/* Short Editorial Description */}
              <p className="text-xs sm:text-sm text-off-white/80 max-w-sm mt-3 sm:mt-4 font-light leading-relaxed line-clamp-2 drop-shadow-sm">
                {category.description}
              </p>

              {/* View Work CTA */}
              <div className="mt-6 sm:mt-8 flex items-center gap-2.5">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-titanium group-hover:text-racing-red transition-colors font-medium">
                  {category.cta || "View Work"}
                </span>
                <span className="text-sm sm:text-base text-titanium group-hover:text-racing-red transition-transform duration-500 group-hover:translate-x-2 font-bold leading-none">
                  →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
};
