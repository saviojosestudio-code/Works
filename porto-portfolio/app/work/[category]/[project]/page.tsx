import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { safeSanityFetch } from "@/lib/sanity/client";
import { PROJECT_BY_SLUGS_QUERY } from "@/lib/sanity/queries";
import { ProjectPage } from "@/components/portfolio/ProjectPage";
import { urlFor } from "@/lib/sanity/image";
import type { SanityProject } from "@/lib/sanity/types";

interface PageProps {
  params: Promise<{ category: string; project: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, project: projectSlug } = await params;
  const project = await safeSanityFetch<SanityProject | null>(
    PROJECT_BY_SLUGS_QUERY,
    { categorySlug, projectSlug },
    null
  );

  if (!project) {
    return {
      title: "Project Not Found — RAPHREV",
    };
  }

  const coverUrl = project.coverImage?.asset ? urlFor(project.coverImage).url() : "";

  return {
    title: `${project.title} — ${categorySlug.toUpperCase()} // RAPHREV`,
    description:
      project.description ||
      `Editorial photography archive for ${project.title} by Ajay Johnson.`,
    openGraph: {
      title: `${project.title} — RAPHREV`,
      description: project.description,
      images: coverUrl
        ? [
            {
              url: coverUrl,
              width: 1600,
              height: 900,
              alt: project.title,
            },
          ]
        : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { category: categorySlug, project: projectSlug } = await params;

  const project = await safeSanityFetch<SanityProject | null>(
    PROJECT_BY_SLUGS_QUERY,
    { categorySlug, projectSlug },
    null
  );

  if (!project || !project.category) {
    notFound();
  }

  const category = project.category;
  const categoryProjects = category.projects || [];
  const currentIdx = categoryProjects.findIndex((p) => p.slug === projectSlug);

  const prevProject = currentIdx > 0 ? categoryProjects[currentIdx - 1] : undefined;
  const nextProject =
    currentIdx >= 0 && currentIdx < categoryProjects.length - 1
      ? categoryProjects[currentIdx + 1]
      : undefined;

  return (
    <ProjectPage
      category={category}
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
