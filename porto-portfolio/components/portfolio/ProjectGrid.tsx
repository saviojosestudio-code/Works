"use client";

import React from "react";
import { Project } from "@/lib/data/portfolio-categories";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  categorySlug: string;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  categorySlug,
}) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="py-24 text-center border border-titanium/15 rounded-xl p-8">
        <p className="text-sm font-mono uppercase tracking-widest text-titanium">
          No projects archived yet in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 sm:gap-24 lg:gap-32 w-full">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          categorySlug={categorySlug}
          index={index}
        />
      ))}
    </div>
  );
};
