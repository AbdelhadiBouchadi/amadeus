import React from 'react';
import { AnomalyCategory } from '@/types';
import CategoryBadge from './CategoryBadge';

interface MultiCategorySelectProps {
  value: AnomalyCategory[];
  onChange: (value: AnomalyCategory[]) => void;
}

export const MultiCategorySelect: React.FC<MultiCategorySelectProps> = ({
  value,
  onChange,
}) => {
  const handleToggleCategory = (category: AnomalyCategory) => {
    if (value.includes(category)) {
      onChange(value.filter((c) => c !== category));
    } else {
      onChange([...value, category]);
    }
  };

  const allCategories = Object.values(AnomalyCategory);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {allCategories.map((category) => (
          <CategoryBadge
            key={category}
            category={category}
            isSelected={value.includes(category)}
            onClick={() => handleToggleCategory(category)}
          />
        ))}
      </div>
      {value.length > 0 && (
        <div className="text-sm text-gray-500">
          {value.length} catégorie(s) sélectionnée(s)
        </div>
      )}
    </div>
  );
};
