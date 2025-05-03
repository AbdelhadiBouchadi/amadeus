'use client';

import React, { useMemo } from 'react';
import { AnomalyCategory } from '@/types';
import { getSubcategoriesForCategory, getSubcategoryLabel } from '@/constants';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import CategoryBadge from './CategoryBadge';

interface MultiSubcategorySelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  categories: AnomalyCategory[];
}

export const MultiSubcategorySelect: React.FC<MultiSubcategorySelectProps> = ({
  value,
  onChange,
  categories,
}) => {
  const [open, setOpen] = React.useState(false);

  const allSubcategories = useMemo(() => {
    const subcategories: {
      value: string;
      label: string;
      category: AnomalyCategory;
    }[] = [];

    categories.forEach((category) => {
      const categorySubcategories = getSubcategoriesForCategory(category);
      categorySubcategories.forEach((subcategory) => {
        subcategories.push({
          value: subcategory,
          label: getSubcategoryLabel(category, subcategory),
          category,
        });
      });
    });

    return subcategories;
  }, [categories]);

  const handleSelect = (subcategory: string) => {
    if (value.includes(subcategory)) {
      onChange(value.filter((s) => s !== subcategory));
    } else {
      onChange([...value, subcategory]);
    }
  };

  const handleRemove = (subcategory: string) => {
    onChange(value.filter((s) => s !== subcategory));
  };

  const selectedSubcategories = useMemo(() => {
    return value.map((subcategory) => {
      const found = allSubcategories.find((s) => s.value === subcategory);
      return (
        found || {
          value: subcategory,
          label: subcategory,
          category: categories[0],
        }
      );
    });
  }, [value, allSubcategories, categories]);

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            role="combobox"
            aria-expanded={open}
            className="flex items-center justify-between w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
          >
            <span className="text-sm text-gray-500">
              {value.length > 0
                ? `${value.length} sous-catégorie(s) sélectionnée(s)`
                : 'Sélectionner des sous-catégories'}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Rechercher une sous-catégorie..." />
            <CommandList>
              <CommandEmpty>Aucune sous-catégorie trouvée.</CommandEmpty>
              {categories.map((category) => (
                <CommandGroup
                  key={category}
                  heading={
                    <CategoryBadge category={category} className="my-1" />
                  }
                >
                  {allSubcategories
                    .filter((subcategory) => subcategory.category === category)
                    .map((subcategory) => (
                      <CommandItem
                        key={subcategory.value}
                        value={subcategory.value}
                        onSelect={() => handleSelect(subcategory.value)}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            value.includes(subcategory.value)
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {subcategory.label}
                      </CommandItem>
                    ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedSubcategories.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedSubcategories.map((subcategory) => (
            <Badge
              key={subcategory.value}
              variant="secondary"
              className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-1"
            >
              {subcategory.label}
              <button
                type="button"
                onClick={() => handleRemove(subcategory.value)}
                className="ml-1 rounded-full hover:bg-gray-300 p-1 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
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
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
