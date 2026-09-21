"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Category, Project } from "@/lib/data/portfolio-categories";
import { PhotoGallery } from "./PhotoGallery";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectPageProps {
  category: Category;
  project: Project;
  prevProject?: Project;
  nextProject?: Project;
}

export const ProjectPage: React.FC<ProjectPageProps> = ({
  category,
  project,
  prevProject,
  nextProject,
}) => {
  return (
    <div className="min-h-screen flex flex-col text-off-white selection:bg-racing-red selection:text-off-white">
      <Header />

      <main className="flex-grow pt-20 sm:pt-24 pb-24">
        {/* Project Header Banner & Hero */}
        <section className="w-full relative flex flex-col mb-12 sm:mb-20">
          {/* Breadcrumb Navigation */}
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6 flex items-center justify-between">
            <Link
              href={`/work/${category.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-carbon/60 backdrop-blur-md rounded-full border border-titanium/20 text-xs font-mono uppercase tracking-widest text-titanium hover:text-off-white hover:border-off-white/40 transition-all group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back to {category.title}
            </Link>

            <nav className="hidden sm:flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-titanium truncate max-w-md">
              <Link href="/" className="hover:text-off-white transition-colors shrink-0">
                Home
              </Link>
              <span>/</span>
              <Link
                href={`/work/${category.slug}`}
                className="hover:text-off-white transition-colors shrink-0"
              >
                {category.title}
              </Link>
              <span>/</span>
              <span className="text-racing-red truncate">{project.title}</span>
            </nav>
          </div>

          {/* Cinematic Hero Image */}
          <div className="relative w-full h-[55vh] sm:h-[68vh] md:h-[78vh] overflow-hidden bg-carbon">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Ambient gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-black/35 pointer-events-none" />

            {/* Overlaid Title & Meta */}
            <div className="absolute bottom-0 left-0 w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 max-w-6xl mx-auto flex flex-col justify-end">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-racing-red text-off-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm">
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

          {/* Story & Specifications Section */}
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
            {project.description && (
              <p className="text-base sm:text-xl md:text-2xl text-off-white/90 max-w-4xl leading-relaxed font-light mb-8">
                {project.description}
              </p>
            )}

            {/* Specs & Metadata Grid */}
            {project.specs && Object.keys(project.specs).length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-titanium/15">
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
        </section>

        {/* Visual Gallery with Lightbox */}
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <PhotoGallery
            images={project.images}
            projectTitle={project.title}
          />
        </section>

        {/* Previous / Next Project Navigation Bar */}
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-titanium/15">
          <div className="flex items-center justify-between pb-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">
              MORE {category.title} PROJECTS
            </span>
            <Link
              href={`/work/${category.slug}`}
              className="text-xs font-mono uppercase tracking-widest text-racing-red hover:underline underline-offset-4"
            >
              View All ({category.projects.length})
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Previous Project Card */}
            {prevProject ? (
              <Link
                href={`/work/${category.slug}/${prevProject.slug}`}
                className="group flex items-center justify-between p-5 sm:p-6 rounded-xl bg-carbon/70 border border-titanium/15 hover:border-racing-red/60 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-black/40 border border-titanium/20 text-titanium group-hover:text-racing-red group-hover:border-racing-red transition-colors shrink-0">
                    <ChevronLeft className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">
                      Previous Project
                    </span>
                    <span className="text-base sm:text-lg font-bold uppercase tracking-tight text-off-white group-hover:text-racing-red transition-colors truncate">
                      {prevProject.title}
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="p-5 sm:p-6 rounded-xl border border-titanium/10 bg-black/20 flex items-center">
                <span className="text-xs font-mono text-titanium/40 uppercase tracking-wider">
                  First Project in Category
                </span>
              </div>
            )}

            {/* Next Project Card */}
            {nextProject ? (
              <Link
                href={`/work/${category.slug}/${nextProject.slug}`}
                className="group flex items-center justify-between p-5 sm:p-6 rounded-xl bg-carbon/70 border border-titanium/15 hover:border-racing-red/60 transition-all text-right"
              >
                <div className="flex flex-col overflow-hidden w-full pr-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-titanium">
                    Next Project
                  </span>
                  <span className="text-base sm:text-lg font-bold uppercase tracking-tight text-off-white group-hover:text-racing-red transition-colors truncate">
                    {nextProject.title}
                  </span>
                </div>
                <div className="p-3 rounded-full bg-black/40 border border-titanium/20 text-titanium group-hover:text-racing-red group-hover:border-racing-red transition-colors shrink-0">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            ) : (
              <div className="p-5 sm:p-6 rounded-xl border border-titanium/10 bg-black/20 flex items-center justify-end">
                <span className="text-xs font-mono text-titanium/40 uppercase tracking-wider">
                  End of Category Archive
                </span>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
