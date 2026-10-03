"use client";

import React from "react";
import { CategoryGrid } from "@/components/portfolio/CategoryGrid";
import type { SanityCategory } from "@/lib/sanity/types";

interface WorkSectionProps {
  categories: SanityCategory[];
}

export const WorkSection: React.FC<WorkSectionProps> = ({ categories }) => {
  return (
    <section id="work" className="flex flex-col w-full py-16 sm:py-24">
      {/* Category Grid Powered Dynamically by Sanity */}
      <CategoryGrid categories={categories} />
    </section>
  );
};
