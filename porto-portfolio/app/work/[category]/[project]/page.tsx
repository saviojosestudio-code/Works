import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProject,
  getAllProjectPaths,
} from "@/lib/data/portfolio-categories";
import { ProjectPage } from "@/components/portfolio/ProjectPage";

interface PageProps {
  params: Promise<{ category: string; project: string }>;
}

export async function generateStaticParams() {
  const paths = getAllProjectPaths();
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, project: projectSlug } = await params;
  const data = getProject(categorySlug, projectSlug);

  if (!data) {
    return {
      title: "Project Not Found — RAPHREV",
    };
  }

  const { project, category } = data;

  return {
    title: `${project.title} — ${category.title} // RAPHREV`,
    description:
      project.description ||
      `Editorial photography archive for ${project.title} (${category.title}) by Ajay Johnson.`,
    openGraph: {
      title: `${project.title} — RAPHREV`,
      description: project.description,
      images: [
        {
          url: project.coverImage,
          width: 1600,
          height: 900,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { category: categorySlug, project: projectSlug } = await params;
  const data = getProject(categorySlug, projectSlug);

  if (!data) {
    notFound();
  }

  const { category, project, prevProject, nextProject } = data;

  return (
    <ProjectPage
      category={category}
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
