import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { safeSanityFetch } from "@/lib/sanity/client";
import { PROJECT_BY_SLUGS_QUERY, PROJECT_BY_SLUG_FALLBACK_QUERY, SITE_SETTINGS_QUERY } from "@/lib/sanity/queries";
import { ProjectPage } from "@/components/portfolio/ProjectPage";
import { urlFor } from "@/lib/sanity/image";
import { getSlugCandidates, isSlugMatch } from "@/lib/utils/slug";
import type { SanityProject, SanitySiteSettings } from "@/lib/sanity/types";

interface PageProps {
  params: Promise<{ category: string; project: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: rawCategorySlug, project: rawProjectSlug } = await params;
  const projectCand = getSlugCandidates(rawProjectSlug);
  const categoryCand = getSlugCandidates(rawCategorySlug);

  let project = await safeSanityFetch<SanityProject | null>(
    PROJECT_BY_SLUGS_QUERY,
    {
      categorySlug: categoryCand.slug,
      categorySlugs: categoryCand.slugs,
      categorySlugsLower: categoryCand.slugsLower,
      projectSlug: projectCand.slug,
      projectSlugs: projectCand.slugs,
      projectSlugsLower: projectCand.slugsLower,
    },
    null,
    ['project', `project:${projectCand.slug}`, 'category']
  );

  if (!project) {
    project = await safeSanityFetch<SanityProject | null>(
      PROJECT_BY_SLUG_FALLBACK_QUERY,
      {
        projectSlug: projectCand.slug,
        projectSlugs: projectCand.slugs,
        projectSlugsLower: projectCand.slugsLower,
      },
      null,
      ['project', `project:${projectCand.slug}`, 'category']
    );
  }

  if (!project) {
    return {
      title: "Project Not Found — RAPHREV",
    };
  }

  const coverUrl = project.coverImage?.asset ? urlFor(project.coverImage).url() : "";

  return {
    title: `${project.title} — ${(project.category?.title || categoryCand.slug).toUpperCase()} // RAPHREV`,
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
  const { category: rawCategorySlug, project: rawProjectSlug } = await params;
  const projectCand = getSlugCandidates(rawProjectSlug);
  const categoryCand = getSlugCandidates(rawCategorySlug);

  let [project, settings] = await Promise.all([
    safeSanityFetch<SanityProject | null>(
      PROJECT_BY_SLUGS_QUERY,
      {
        categorySlug: categoryCand.slug,
        categorySlugs: categoryCand.slugs,
        categorySlugsLower: categoryCand.slugsLower,
        projectSlug: projectCand.slug,
        projectSlugs: projectCand.slugs,
        projectSlugsLower: projectCand.slugsLower,
      },
      null,
      ['project', `project:${projectCand.slug}`, 'category']
    ),
    safeSanityFetch<SanitySiteSettings | null>(
      SITE_SETTINGS_QUERY,
      {},
      null,
      ['siteSettings']
    ),
  ]);

  if (!project) {
    project = await safeSanityFetch<SanityProject | null>(
      PROJECT_BY_SLUG_FALLBACK_QUERY,
      {
        projectSlug: projectCand.slug,
        projectSlugs: projectCand.slugs,
        projectSlugsLower: projectCand.slugsLower,
      },
      null,
      ['project', `project:${projectCand.slug}`, 'category']
    );
  }

  if (!project || !project.category) {
    notFound();
  }

  const category = project.category;
  const categoryProjects = category.projects || [];
  const currentIdx = categoryProjects.findIndex(
    (p) => p._id === project._id || isSlugMatch(p.slug, project.slug)
  );

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
      settings={settings}
    />
  );
}
