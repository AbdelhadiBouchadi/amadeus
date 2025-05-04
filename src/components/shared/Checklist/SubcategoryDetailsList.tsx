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
    return subcategory
      .replace(/_/g, ' ')
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleDetailChange = (updatedDetail: SubcategoryDetail) => {
    const existingDetailIndex = subcategoryDetails.findIndex(
      (detail) => detail.subcategory === updatedDetail.subcategory
    );

    let newDetails: SubcategoryDetail[];
    if (existingDetailIndex >= 0) {
      newDetails = [
        ...subcategoryDetails.slice(0, existingDetailIndex),
        updatedDetail,
        ...subcategoryDetails.slice(existingDetailIndex + 1),
      ];
    } else {
      newDetails = [...subcategoryDetails, updatedDetail];
    }

    // Ensure we only keep details for selected subcategories
    newDetails = newDetails.filter((detail) =>
      selectedSubcategories.includes(detail.subcategory)
    );

    // Add missing subcategories with default values
    selectedSubcategories.forEach((subcategory) => {
      if (!newDetails.some((detail) => detail.subcategory === subcategory)) {
        newDetails.push({
          subcategory,
          um: false,
          uc: false,
          ums: false,
          bl: false,
          aviexp: false,
          comment: '',
        });
      }
    });

    onDetailChange(newDetails);
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
                <AccordionTrigger className="px-4 py-3 hover:bg-subMain dark:hover:bg-gray-800">
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
