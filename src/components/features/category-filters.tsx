"use client";

import React from "react";

interface Category {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface CategoryFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => {
        return (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category.name
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800 text-text-secondary hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            tabIndex={0}
            aria-label={`Filter by ${category.name}`}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilters;
