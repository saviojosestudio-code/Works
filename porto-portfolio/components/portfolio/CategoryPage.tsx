"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { urlFor } from "@/lib/sanity/image";
import type { SanityCategory, SanityProject } from "@/lib/sanity/types";

interface CategoryPageProps {
  category: SanityCategory;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const projects = category.projects || [];
  const totalProjects = projects.length;
  const pageSize = 3;
  const totalPages = Math.ceil(totalProjects / pageSize) || 1;

  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlePrev = useCallback(() => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  }, [totalPages]);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  }, [totalPages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  const startIndex = currentPage * pageSize;
  const currentProjects = projects.slice(startIndex, startIndex + pageSize);

  return (
    <div className="min-h-[100dvh] w-full flex flex-col text-off-white selection:bg-off-white selection:text-carbon bg-carbon overflow-x-hidden">
      <Header />

      <main className="w-full flex-grow flex flex-col relative">
        {/* Desktop View */}
        <section
          aria-label={`${category.title} Projects Grid`}
          className="hidden lg:flex w-full h-[100dvh] max-h-[100dvh] flex-row overflow-hidden relative bg-carbon"
        >
          {currentProjects.map((project, idx) => {
            const actualIndex = startIndex + idx;
            return (
              <ProjectPanelItem
                key={`${project.slug || project._id}-${actualIndex}`}
                project={project}
                categorySlug={category.slug}
                index={actualIndex}
              />
            );
          })}
        </section>

        {/* Mobile / Tablet View */}
        <section
          aria-label={`${category.title} Mobile Projects Feed`}
          className="flex lg:hidden flex-col w-full bg-carbon pt-16"
        >
          {projects.map((project, index) => (
            <ProjectPanelItem
              key={`mobile-${project.slug || project._id}-${index}`}
              project={project}
              categorySlug={category.slug}
              index={index}
              isMobile
            />
          ))}
        </section>
      </main>
    </div>
  );
};

interface ProjectPanelItemProps {
  project: SanityProject;
  categorySlug: string;
  index: number;
  isMobile?: boolean;
}

const ProjectPanelItem: React.FC<ProjectPanelItemProps> = ({
  project,
  categorySlug,
  index,
  isMobile = false,
}) => {
  const indexStr = String(index + 1).padStart(2, "0");
  const coverImageUrl = project.coverImage?.asset
    ? urlFor(project.coverImage).width(1200).url()
    : "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1200";

  return (
    <Link
      href={`/work/${categorySlug}/${project.slug}`}
      className={`group relative flex-1 ${
        isMobile
          ? "w-full min-h-[75dvh] sm:min-h-[80dvh]"
          : "h-full min-h-0"
      } flex flex-col justify-end overflow-hidden cursor-pointer border-b lg:border-b-0 lg:border-r border-titanium/15 last:border-r-0 last:border-b-0 transition-all select-none`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={coverImageUrl}
          alt={`${project.title} photography in ${project.location || "portfolio"}`}
          fill
          priority={index < 3}
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110 group-hover:contrast-105"
        />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/55 via-45% to-transparent pointer-events-none transition-opacity duration-700" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 z-15 h-[2px] bg-gradient-to-r from-transparent via-off-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-20 flex flex-col justify-end w-full px-6 sm:px-8 md:px-10 lg:px-7 xl:px-12 pb-10 sm:pb-12 md:pb-14 lg:pb-16 pt-28 pointer-events-none">
        <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
          <span className="font-mono text-[9px] sm:text-[10px] text-off-white font-bold tracking-widest uppercase">
            {indexStr}
          </span>
          <span className="text-titanium/50 font-mono text-[10px]">/</span>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-titanium drop-shadow-sm font-medium truncate">
            {project.location || project.tag || "EDITORIAL ARCHIVE"}
          </span>
        </div>

        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold uppercase tracking-[-0.03em] text-off-white leading-none m-0 drop-shadow-lg group-hover:text-off-white transition-colors">
          {project.title}
        </h3>

        {project.description && (
          <p className="text-xs sm:text-sm text-off-white/80 max-w-sm mt-3 sm:mt-4 font-light leading-relaxed line-clamp-3 drop-shadow-sm">
            {project.description}
          </p>
        )}

        <div className="mt-6 sm:mt-8 flex items-center gap-2.5">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-titanium group-hover:text-off-white transition-colors font-medium">
            View Gallery
          </span>
          <span className="text-sm sm:text-base text-titanium group-hover:text-off-white transition-transform duration-500 group-hover:translate-x-2 font-bold leading-none">
            →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryPage;
