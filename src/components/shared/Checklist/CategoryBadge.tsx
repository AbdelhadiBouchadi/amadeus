import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AnomalyCategory } from '@/types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/constants';

interface CategoryBadgeProps {
  category: AnomalyCategory;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  onClick,
  isSelected = false,
  className,
}) => {
  const baseColorClass = CATEGORY_COLORS[category];
  const selectedClass = isSelected
    ? 'ring-2 ring-main bg-main text-secondary dark:text-secondary-foreground'
    : '';
  const hoverClass = onClick
    ? 'cursor-pointer hover:opacity-90 hover:scale-105 transition-all duration-200'
    : '';

  return (
    <Badge
      className={`${baseColorClass} ${selectedClass} ${hoverClass} ${className} border-subMain dark:border-border text-xs sm:text-sm py-1 px-2 transition-all duration-200`}
      onClick={onClick}
    >
      {CATEGORY_LABELS[category]}
    </Badge>
  );
};

export default CategoryBadge;
