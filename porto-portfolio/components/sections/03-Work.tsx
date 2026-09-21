"use client";

import React from "react";
import { PORTFOLIO_CATEGORIES } from "@/lib/data/portfolio-categories";
import { CategoryGrid } from "@/components/portfolio/CategoryGrid";

export const WorkSection: React.FC = () => {
  return (
    <section id="work" className="flex flex-col w-full py-16 sm:py-24">
      {/* Category Grid Powered Dynamically by Portfolio Data */}
      <CategoryGrid categories={PORTFOLIO_CATEGORIES} />
    </section>
  );
};
