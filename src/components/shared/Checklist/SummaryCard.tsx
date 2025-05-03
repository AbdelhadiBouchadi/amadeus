import React from 'react';
import { AnomalyCategory } from '@/types';
import { getSubcategoryLabel } from '@/constants';
import CategoryBadge from './CategoryBadge';

interface SummaryCardProps {
  categories: AnomalyCategory[];
  subcategories: string[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  categories,
  subcategories,
}) => {
  if (!subcategories.length) return null;

  return (
    <div className="mt-4 p-4 rounded-lg border border-subMain dark:border-border transition-all duration-300 animate-fadeIn">
      <h3 className="text-md font-medium mb-2">Résumé des anomalies</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Catégories:</p>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <CategoryBadge key={category} category={category} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-sm text-gray-500 mb-1">
          Sous-catégories sélectionnées:
        </p>
        <ul className="text-sm space-y-1 pl-5 list-disc">
          {subcategories.map((subcategory) => {
            // Find the category this subcategory belongs to
            const category = categories.find((cat) => {
              const subcategoriesForCat = getSubcategoriesForCategory(cat);
              return subcategoriesForCat.includes(subcategory);
            });

            const label = category
              ? getSubcategoryLabel(category, subcategory)
              : subcategory;

            return <li key={subcategory}>{label}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

// Helper function to get subcategories for a category
// This should match the one from your constants
function getSubcategoriesForCategory(category: AnomalyCategory): string[] {
  // This is a simplified version, replace with actual implementation
  return [];
}

export default SummaryCard;
