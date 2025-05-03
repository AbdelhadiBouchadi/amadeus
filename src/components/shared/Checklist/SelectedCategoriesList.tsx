import React from 'react';
import { AnomalyCategory } from '@/types';
import CategoryBadge from './CategoryBadge';

interface SelectedCategoriesListProps {
  categories: AnomalyCategory[];
  onRemove: (category: AnomalyCategory) => void;
}

const SelectedCategoriesList: React.FC<SelectedCategoriesListProps> = ({
  categories,
  onRemove,
}) => {
  if (!categories.length) return null;

  return (
    <div className="mt-2">
      <p className="text-sm text-gray-500 mb-2">Catégories sélectionnées:</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <div key={category} className="relative group">
            <CategoryBadge category={category} className="pr-6" />
            <button
              type="button"
              onClick={() => onRemove(category)}
              className="absolute top-1/2 right-1.5 -translate-y-1/2 w-4 h-4 rounded-full flex items-center justify-center 
                       hover:bg-black/10 transition-colors duration-200"
              aria-label={`Supprimer ${category}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedCategoriesList;
