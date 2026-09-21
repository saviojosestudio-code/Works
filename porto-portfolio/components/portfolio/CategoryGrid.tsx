"use client";

import React from "react";
import { Category } from "@/lib/data/portfolio-categories";
import { CategoryCard } from "./CategoryCard";

interface CategoryGridProps {
  categories: Category[];
  className?: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-0.5 sm:gap-1 bg-carbon/50 ${className}`}
    >
      {categories.map((category, index) => {
        // If odd number of categories and it's the last one, span full width on wide screens
        const isLastAndOdd =
          categories.length % 2 !== 0 && index === categories.length - 1;

        return (
          <div
            key={category.slug}
            className={`w-full ${isLastAndOdd ? "md:col-span-2" : ""}`}
          >
            <CategoryCard
              category={category}
              index={index}
              featured={isLastAndOdd}
            />
          </div>
        );
      })}
    </div>
  );
};
