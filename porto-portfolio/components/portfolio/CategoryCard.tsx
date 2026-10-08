"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import type { SanityCategory } from "@/lib/sanity/types";

interface CategoryCardProps {
  category: SanityCategory;
  index?: number;
  featured?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  index,
  featured = false,
}) => {
  const projectCount = category.projects?.length ?? 0;

  // Build cover image URL from Sanity asset, or fall back to a placeholder
  const coverSrc = category.coverImage?.asset
    ? urlFor(category.coverImage).width(1200).height(800).quality(85).url()
    : null;

  return (
    <Link
      href={`/work/${category.slug}`}
      className={`group relative flex flex-col justify-end w-full overflow-hidden bg-carbon ${
        featured
          ? "min-h-[520px] sm:min-h-[580px] md:min-h-[640px]"
          : "min-h-[460px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[600px]"
      }`}
    >
      {/* Background Image with Cinematic Hover Zoom */}
      <div className="absolute inset-0 z-0">
        {coverSrc ? (
          <Image
            src={coverSrc}
            alt={category.coverImage?.alt || category.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="w-full h-full bg-carbon/80" />
        )}
      </div>

      {/* Base Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/40 to-black/15 opacity-90 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Bottom Glint Accent */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-gradient-to-r from-transparent via-off-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />

      {/* Content Container */}
      <div className="relative z-20 flex flex-col p-6 sm:p-8 md:p-12 transition-transform duration-700 ease-out group-hover:-translate-y-2">
        {/* Category Index & Project Count Badges */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-titanium">
            {category.tag || `0${(index ?? 0) + 1} // ARCHIVE`}
          </span>
          <span className="px-2 py-0.5 rounded-sm bg-black/50 border border-titanium/20 text-[9px] sm:text-[10px] font-mono text-off-white/80">
            {projectCount} {projectCount === 1 ? "Project" : "Projects"}
          </span>
        </div>

        {/* Category Title */}
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-off-white m-0 leading-tight group-hover:text-off-white">
          {category.title}
        </h3>

        {/* Category Description */}
        <p className="text-sm sm:text-base text-off-white/80 mt-3 sm:mt-4 max-w-md leading-relaxed font-light line-clamp-3">
          {category.description}
        </p>

        {/* CTA Link & Dynamic Hover Arrow */}
        <div className="mt-6 sm:mt-8 flex items-center gap-2">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-titanium group-hover:text-off-white transition-colors font-medium">
            {category.cta || `Explore ${category.title}`}
          </span>
          <span className="text-sm text-titanium group-hover:text-off-white transition-all group-hover:translate-x-1.5 font-bold">
            →
          </span>
        </div>
      </div>
    </Link>
  );
};
