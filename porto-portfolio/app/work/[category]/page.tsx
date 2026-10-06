import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { safeSanityFetch } from "@/lib/sanity/client";
import { CATEGORY_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import { CategoryPage } from "@/components/portfolio/CategoryPage";
import { urlFor } from "@/lib/sanity/image";
import { getSlugCandidates } from "@/lib/utils/slug";
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
  const { category: rawSlug } = await params;
  if (LEGACY_REDIRECTS[rawSlug]) {
    return { title: "Redirecting... — RAPHREV" };
  }

  const cand = getSlugCandidates(rawSlug);

  const category = await safeSanityFetch<SanityCategory | null>(
    CATEGORY_BY_SLUG_QUERY,
    {
      slug: cand.slug,
      slugs: cand.slugs,
      slugsLower: cand.slugsLower,
    },
    null,
    ['category', `category:${cand.slug}`, 'project']
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
  const { category: rawSlug } = await params;

  if (LEGACY_REDIRECTS[rawSlug]) {
    redirect(LEGACY_REDIRECTS[rawSlug]);
  }

  const cand = getSlugCandidates(rawSlug);

  const category = await safeSanityFetch<SanityCategory | null>(
    CATEGORY_BY_SLUG_QUERY,
    {
      slug: cand.slug,
      slugs: cand.slugs,
      slugsLower: cand.slugsLower,
    },
    null,
    ['category', `category:${cand.slug}`, 'project']
  );

  if (!category) {
    notFound();
  }

  return <CategoryPage category={category} />;
}
