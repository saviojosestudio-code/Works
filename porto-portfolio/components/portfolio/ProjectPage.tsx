"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PhotoGallery } from "./PhotoGallery";
import { CoverflowCarousel, CoverflowSlide } from "@/components/ui/coverflow-carousel";
import { urlFor } from "@/lib/sanity/image";
import type { SanityCategory, SanityProject, SanitySiteSettings } from "@/lib/sanity/types";

interface ProjectPageProps {
  category: SanityCategory;
  project: SanityProject;
  prevProject?: SanityProject;
  nextProject?: SanityProject;
  settings?: SanitySiteSettings | null;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({
  category,
  project,
  prevProject,
  nextProject,
  settings,
}) => {
  const projects = category.projects || [];
  const currentProjectIndex = projects.findIndex(
    (p) => p.slug === project.slug
  );

  const coverImageUrl = project.coverImage?.asset
    ? urlFor(project.coverImage).width(1600).url()
    : "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1600";

  const projectSlides: CoverflowSlide[] = projects.map((p) => {
    const slideCover = p.coverImage?.asset
      ? urlFor(p.coverImage).width(800).url()
      : "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800";
    return {
      src: slideCover,
      alt: p.title,
      title: p.title,
      subtitle: p.location || p.tag || category.title,
      href: `/work/${category.slug}/${p.slug}`,
      meta: [
        ...(p.year ? [{ label: "Year", value: p.year }] : []),
        ...(p.location ? [{ label: "Location", value: p.location }] : []),
        ...(p.client ? [{ label: "Client", value: p.client }] : []),
      ],
    };
  });

  return (
    <div className="min-h-screen flex flex-col text-off-white selection:bg-off-white selection:text-carbon">
      <Header />

      <main className="flex-grow pt-20 sm:pt-24 pb-24">
        {/* Project Header Banner & Hero */}
        <section className="w-full relative flex flex-col mb-12 sm:mb-20">
          <div className="relative w-full h-[55vh] sm:h-[68vh] md:h-[78vh] overflow-hidden bg-carbon">
            <Image
              src={coverImageUrl}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-black/35 pointer-events-none" />

            <div className="absolute bottom-0 left-0 w-full px-4 sm:px-6 lg:px-8 xl:px-10 pb-10 sm:pb-14 max-w-[1680px] mx-auto flex flex-col justify-end">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-off-white text-carbon text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm">
                  {project.tag || `${category.title} PROJECT`}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-titanium drop-shadow-md">
                  {project.year || project.date || "2026"} // {project.location || "DUBAI"}
                </span>
                {project.client && (
                  <span className="px-2.5 py-0.5 rounded bg-black/60 border border-titanium/20 text-[10px] font-mono text-off-white/80">
                    Client: {project.client}
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-[-0.03em] text-off-white drop-shadow-lg leading-none m-0">
                {project.title}
              </h1>
            </div>
          </div>

          <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-10 sm:pt-12">
            {(project.description || (project.specs && Object.keys(project.specs).length > 0)) && (
              <div className="relative w-full rounded-2xl bg-transparent border border-titanium/20 backdrop-blur-sm p-6 sm:p-8 md:p-10">
                {project.description && (
                  <p
                    className={`text-base sm:text-xl md:text-2xl text-off-white/90 max-w-5xl leading-relaxed font-light ${
                      project.specs && Object.keys(project.specs).length > 0 ? "mb-8" : ""
                    }`}
                  >
                    {project.description}
                  </p>
                )}

                {project.specs && Object.keys(project.specs).length > 0 && (
                  <div
                    className={`grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 ${
                      project.description ? "pt-6 border-t border-titanium/15" : ""
                    }`}
                  >
                    {project.specs.laps && (
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">
                          Distance
                        </span>
                        <span className="text-sm font-semibold uppercase text-off-white mt-1">
                          {project.specs.laps}
                        </span>
                      </div>
                    )}
                    {project.specs.turns && (
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">
                          Layout
                        </span>
                        <span className="text-sm font-semibold uppercase text-off-white mt-1">
                          {project.specs.turns}
                        </span>
                      </div>
                    )}
                    {project.specs.duration && (
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">
                          Duration
                        </span>
                        <span className="text-sm font-semibold uppercase text-off-white mt-1">
                          {project.specs.duration}
                        </span>
                      </div>
                    )}
                    {project.specs.role && (
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">
                          Role
                        </span>
                        <span className="text-sm font-semibold uppercase text-off-white mt-1">
                          {project.specs.role}
                        </span>
                      </div>
                    )}
                    {project.specs.deliverables && (
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">
                          Deliverables
                        </span>
                        <span className="text-sm font-semibold uppercase text-off-white mt-1">
                          {project.specs.deliverables}
                        </span>
                      </div>
                    )}
                    {project.specs.cameraTech && (
                      <div className="flex flex-col col-span-2 sm:col-span-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">
                          Capture Rig
                        </span>
                        <span className="text-xs sm:text-sm font-semibold uppercase text-off-white mt-1 truncate">
                          {project.specs.cameraTech}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Visual Gallery */}
        <section className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 mb-20">
          <PhotoGallery
            images={project.images}
            projectTitle={project.title}
          />
        </section>

        {/* Coverflow Carousel Navigation */}
        {projects.length > 0 && (
          <section className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-16 border-t border-titanium/15">
            <div className="flex items-center justify-between pb-2">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">
                  MORE {category.title} PROJECTS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-off-white">
                  Explore The Archive
                </h3>
              </div>
              <Link
                href={`/work/${category.slug}`}
                className="text-xs font-mono uppercase tracking-widest text-off-white hover:underline underline-offset-4"
              >
                View All ({projects.length})
              </Link>
            </div>

            <div className="w-full py-4">
              <CoverflowCarousel
                slides={projectSlides}
                initialIndex={currentProjectIndex >= 0 ? currentProjectIndex : 0}
                cardWidth="clamp(220px, 24vw, 340px)"
                showCaption
                showNavigation
                showPagination
              />
            </div>
          </section>
        )}
      </main>

      <Footer settings={settings} />
    </div>
  );
};
