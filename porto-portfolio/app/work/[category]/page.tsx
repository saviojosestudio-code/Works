import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { safeSanityFetch } from "@/lib/sanity/client";
import { CATEGORY_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { CategoryPage } from "@/components/portfolio/CategoryPage";
import { urlFor } from "@/lib/sanity/image";
import type { SanityCategory } from "@/lib/sanity/types";

interface PageProps {
  params: Promise<{ category: string }>;
}

const LEGACY_REDIRECTS: Record<string, string> = {
  "01": "/work/motorsports/24-hours-of-le-mans",
  "02": "/work/motorsports/suzuka-1000km",
  "03": "/work/motorsports/dubai-24-hour",
  "04": "/work/motorsports/kyalami-9-hour",
  "yas-marina-gp": "/work/motorsports/24-hours-of-le-mans",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  if (LEGACY_REDIRECTS[slug]) {
    return { title: "Redirecting... — RAPHREV" };
  }

  const category = await safeSanityFetch<SanityCategory | null>(
    CATEGORY_BY_SLUG_QUERY,
    { slug },
    null
  );

  if (!category) {
    return {
      title: "Category Not Found — RAPHREV",
    };
  }

  const coverUrl = category.coverImage?.asset ? urlFor(category.coverImage).url() : "";

  return {
    title: `${category.title} Portfolio — RAPHREV // Ajay Johnson`,
    description: category.description,
    openGraph: {
      title: `${category.title} Archive — RAPHREV`,
      description: category.description,
      images: coverUrl
        ? [
            {
              url: coverUrl,
              width: 1600,
              height: 900,
              alt: category.title,
            },
          ]
        : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { category: slug } = await params;

  if (LEGACY_REDIRECTS[slug]) {
    redirect(LEGACY_REDIRECTS[slug]);
  }

  const category = await safeSanityFetch<SanityCategory | null>(
    CATEGORY_BY_SLUG_QUERY,
    { slug },
    null
  );

  if (!category) {
    notFound();
  }

  return <CategoryPage category={category} />;
}
