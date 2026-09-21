"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/data/portfolio-categories";

interface ProjectCardProps {
  project: Project;
  categorySlug: string;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  categorySlug,
  index,
}) => {
  const frameCount = project.images.length;
  const projectIndexStr = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/work/${categorySlug}/${project.slug}`}
      className="group cursor-pointer flex flex-col gap-5 sm:gap-6 w-full"
    >
      {/* Massive Cinematic Frame */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] lg:aspect-[24/10] overflow-hidden rounded-lg sm:rounded-xl bg-carbon border border-titanium/15 transition-all duration-500 group-hover:border-racing-red/50">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
        />

        {/* Dynamic Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out bg-gradient-to-tr from-black/70 via-transparent to-black/30 pointer-events-none" />

        {/* Floating Badges (Top) */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2">
          <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded border border-titanium/20 text-[10px] font-mono uppercase tracking-widest text-titanium">
            {project.tag || `${projectIndexStr} · ARCHIVE`}
          </span>
          {project.location && (
            <span className="hidden sm:inline-block px-2.5 py-1 bg-black/60 backdrop-blur-md rounded border border-titanium/20 text-[10px] font-mono uppercase tracking-widest text-titanium">
              {project.location}
            </span>
          )}
        </div>

        {/* Floating Frame Count (Top Right) */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
          <span className="px-2.5 py-1 bg-racing-red/90 text-off-white text-[10px] font-mono font-bold uppercase tracking-wider rounded">
            {frameCount} {frameCount === 1 ? "Frame" : "Frames"}
          </span>
        </div>

        {/* Bottom Bar on image on smaller screens */}
        <div className="absolute bottom-4 left-4 right-4 z-10 sm:hidden">
          <h3 className="text-xl font-bold uppercase tracking-tight text-off-white">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Clean Typography & Details (Below Frame for desktop) */}
      <div className="hidden sm:flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-titanium">
              {project.year || project.date || "2026"} // {project.location || "DUBAI"}
            </span>
            {project.client && (
              <span className="text-[10px] font-mono text-racing-red uppercase tracking-wider">
                • {project.client}
              </span>
            )}
          </div>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-off-white group-hover:text-racing-red transition-colors leading-tight m-0">
            {project.title}
          </h3>
          {project.description && (
            <p className="text-xs sm:text-sm text-titanium line-clamp-2 mt-1 font-light leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0 pb-1">
          <span className="text-xs font-mono uppercase tracking-widest text-racing-red group-hover:underline underline-offset-4 transition-all">
            Open Project
          </span>
          <span className="text-sm text-racing-red group-hover:translate-x-1 transition-transform">
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
};
