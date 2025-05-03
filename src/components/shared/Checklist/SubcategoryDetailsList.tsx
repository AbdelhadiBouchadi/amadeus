'use client';

import React from 'react';
import SubcategoryDetailItem from './SubcategoryDetailItem';
import { SubcategoryDetail } from '@/types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getSubcategoriesForCategory } from '@/constants';
import { AnomalyCategory } from '@/types';
import { CATEGORY_LABELS } from '@/constants';

interface SubcategoryDetailsListProps {
  selectedCategories: AnomalyCategory[];
  selectedSubcategories: string[];
  subcategoryDetails: SubcategoryDetail[];
  onDetailChange: (updatedDetails: SubcategoryDetail[]) => void;
}

const SubcategoryDetailsList: React.FC<SubcategoryDetailsListProps> = ({
  selectedCategories,
  selectedSubcategories,
  subcategoryDetails,
  onDetailChange,
}) => {
  const getSubcategoryLabel = (subcategory: string): string => {
    // This is a simplified version, you might need to update this based on your actual subcategory labels
    return subcategory.replace(/_/g, ' ');
  };

  const handleDetailChange = (updatedDetail: SubcategoryDetail) => {
    const updatedDetails = subcategoryDetails.map((detail) =>
      detail.subcategory === updatedDetail.subcategory ? updatedDetail : detail
    );
    onDetailChange(updatedDetails);
  };

  // Group subcategories by category
  const categorizedSubcategories = selectedCategories.map((category) => {
    const categorySubcategories = getSubcategoriesForCategory(category);
    const filteredSubcategories = selectedSubcategories.filter((sub) =>
      categorySubcategories.includes(sub)
    );

    return {
      category,
      subcategories: filteredSubcategories,
    };
  });

  return (
    <div className="space-y-4">
      {categorizedSubcategories.map(
        ({ category, subcategories }) =>
          subcategories.length > 0 && (
            <Accordion
              key={category}
              type="single"
              collapsible
              className="border border-subMain dark:border-border rounded-lg overflow-hidden"
            >
              <AccordionItem value={category} className="border-b-0">
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <span className="font-medium">
                    {CATEGORY_LABELS[category]}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  {subcategories.map((subcategory) => {
                    const detail = subcategoryDetails.find(
                      (detail) => detail.subcategory === subcategory
                    ) || {
                      subcategory,
                      um: false,
                      uc: false,
                      ums: false,
                      bl: false,
                      aviexp: false,
                    };

                    return (
                      <SubcategoryDetailItem
                        key={subcategory}
                        subcategoryName={getSubcategoryLabel(subcategory)}
                        detail={detail}
                        onChange={handleDetailChange}
                      />
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
      )}
    </div>
  );
};

export default SubcategoryDetailsList;
