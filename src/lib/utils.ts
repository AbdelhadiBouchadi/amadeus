import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import bcrypt from 'bcryptjs';

import {
  AnomalyCategory,
  EDISubcategory,
  ExpeditionSubcategory,
  EtiquettageSubcategory,
  EtiquettagePaletteHomogeneSubcategory,
  EtiquettagePaletteHeterogeneSubcategory,
  PaletisationSubcategory,
} from '@/types';

import {
  CATEGORY_LABELS,
  EDI_SUBCATEGORY_MAP,
  EXPEDITION_SUBCATEGORY_MAP,
  ETIQUETTAGE_SUBCATEGORY_MAP,
  ETIQUETTAGE_PALETTE_HOMOGENE_SUBCATEGORY_MAP,
  ETIQUETTAGE_PALETTE_HETEROGENE_SUBCATEGORY_MAP,
  PALETISATION_SUBCATEGORY_MAP,
} from '../constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function saltAndHashPassword(password: any) {
  const saltRounds = 10; // Adjust the cost factor according to your security requirements
  const salt = bcrypt.genSaltSync(saltRounds); // Synchronously generate a salt
  const hash = bcrypt.hashSync(password, salt); // Synchronously hash the password
  return hash; // Return the hash directly as a string
}

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainPassword, hashedPassword); // Example for bcrypt
};

export const formatUserRole = (role: string) => {
  const mapping: { [key: string]: string } = {
    ADMIN: 'Admin',
    MONITOR: 'Moniteur / Opérateur',
    VISITOR: 'Visiteur',
  };
  return mapping[role] || role;
};

// Format the category label
export const formatCategory = (category: AnomalyCategory): string => {
  return CATEGORY_LABELS[category] || category;
};

// Format EDI subcategory
export const formatEDISubcategory = (subcategory: EDISubcategory): string => {
  return EDI_SUBCATEGORY_MAP[subcategory]?.label || subcategory;
};

// Format Expedition subcategory
export const formatExpeditionSubcategory = (
  subcategory: ExpeditionSubcategory
): string => {
  return EXPEDITION_SUBCATEGORY_MAP[subcategory]?.label || subcategory;
};

// Format Etiquettage subcategory
export const formatEtiquettageSubcategory = (
  subcategory: EtiquettageSubcategory
): string => {
  return ETIQUETTAGE_SUBCATEGORY_MAP[subcategory]?.label || subcategory;
};

// Format Etiquettage Palette Homogene subcategory
export const formatEtiquettagePaletteHomogeneSubcategory = (
  subcategory: EtiquettagePaletteHomogeneSubcategory
): string => {
  return (
    ETIQUETTAGE_PALETTE_HOMOGENE_SUBCATEGORY_MAP[subcategory]?.label ||
    subcategory
  );
};

// Format Etiquettage Palette Heterogene subcategory
export const formatEtiquettagePaletteHeterogeneSubcategory = (
  subcategory: EtiquettagePaletteHeterogeneSubcategory
): string => {
  return (
    ETIQUETTAGE_PALETTE_HETEROGENE_SUBCATEGORY_MAP[subcategory]?.label ||
    subcategory
  );
};

// Format Paletisation subcategory
export const formatPaletisationSubcategory = (
  subcategory: PaletisationSubcategory
): string => {
  return PALETISATION_SUBCATEGORY_MAP[subcategory]?.label || subcategory;
};

// Get chapitreMLP and codeAnomalie values based on category and subcategory
export const getChapitreAndCode = (
  category: AnomalyCategory,
  subcategory: string
): { chapitreMLP: string; codeAnomalie: string } => {
  switch (category) {
    case 'EDI':
      return (
        EDI_SUBCATEGORY_MAP[subcategory as EDISubcategory] || {
          chapitreMLP: '',
          codeAnomalie: '',
        }
      );
    case 'EXPEDITION':
      return (
        EXPEDITION_SUBCATEGORY_MAP[subcategory as ExpeditionSubcategory] || {
          chapitreMLP: '',
          codeAnomalie: '',
        }
      );
    case 'ETIQUETTAGE':
      return (
        ETIQUETTAGE_SUBCATEGORY_MAP[subcategory as EtiquettageSubcategory] || {
          chapitreMLP: '',
          codeAnomalie: '',
        }
      );
    case 'ETIQUETTAGE_PALETTE_HOMOGENE':
      return (
        ETIQUETTAGE_PALETTE_HOMOGENE_SUBCATEGORY_MAP[
          subcategory as EtiquettagePaletteHomogeneSubcategory
        ] || { chapitreMLP: '', codeAnomalie: '' }
      );
    case 'ETIQUETTAGE_PALETTE_HETEROGENE':
      return (
        ETIQUETTAGE_PALETTE_HETEROGENE_SUBCATEGORY_MAP[
          subcategory as EtiquettagePaletteHeterogeneSubcategory
        ] || { chapitreMLP: '', codeAnomalie: '' }
      );
    case 'PALETISATION':
      return (
        PALETISATION_SUBCATEGORY_MAP[
          subcategory as PaletisationSubcategory
        ] || { chapitreMLP: '', codeAnomalie: '' }
      );
    default:
      return { chapitreMLP: '', codeAnomalie: '' };
  }
};

// Helper function to get all subcategories for a specific category
export function getSubcategoriesForCategory(
  category: AnomalyCategory
): string[] {
  switch (category) {
    case 'EDI':
      return Object.values(EDISubcategory);
    case 'EXPEDITION':
      return Object.values(ExpeditionSubcategory);
    case 'ETIQUETTAGE':
      return Object.values(EtiquettageSubcategory);
    case 'ETIQUETTAGE_PALETTE_HOMOGENE':
      return Object.values(EtiquettagePaletteHomogeneSubcategory);
    case 'ETIQUETTAGE_PALETTE_HETEROGENE':
      return Object.values(EtiquettagePaletteHeterogeneSubcategory);
    case 'PALETISATION':
      return Object.values(PaletisationSubcategory);
    default:
      return [];
  }
}

// Helper function to check if a subcategory belongs to a category
export function isSubcategoryOfCategory(
  category: AnomalyCategory,
  subcategory: string
): boolean {
  const subcategories = getSubcategoriesForCategory(category);
  return subcategories.includes(subcategory);
}

// Helper function to find which category a subcategory belongs to
export function findCategoryForSubcategory(
  subcategory: string,
  categories: AnomalyCategory[]
): AnomalyCategory | null {
  for (const category of categories) {
    if (isSubcategoryOfCategory(category, subcategory)) {
      return category;
    }
  }
  return null;
}

export function getCategoryColor(category: AnomalyCategory): string[] {
  const colorMap: Record<AnomalyCategory, string[]> = {
    [AnomalyCategory.EDI]: ['bg-primary', 'text-primary'],
    [AnomalyCategory.EXPEDITION]: ['bg-orange-500', 'text-orange-500'],
    [AnomalyCategory.ETIQUETTAGE]: ['bg-[#66B5A3]', 'text-[#66B5A3]'],
    [AnomalyCategory.ETIQUETTAGE_PALETTE_HOMOGENE]: [
      'bg-purple-500',
      'text-purple-500',
    ],
    [AnomalyCategory.ETIQUETTAGE_PALETTE_HETEROGENE]: [
      'bg-yellow-500',
      'text-yellow-500',
    ],
    [AnomalyCategory.PALETISATION]: ['bg-red-500', 'text-red-500'],
  };

  return colorMap[category] || ['bg-gray-500', 'text-gray-500'];
}

export function isBlobUrl(url: string): boolean {
  return url.startsWith('blob:');
}

export function getUserRoleColor(role: string): [string, string] {
  switch (role) {
    case 'ADMIN':
      return ['bg-purple-500', 'text-purple-500'];
    case 'MONITOR':
      return ['bg-blue-500', 'text-blue-500'];
    case 'VISITOR':
      return ['bg-green-500', 'text-green-500'];
    default:
      return ['bg-gray-500', 'text-gray-500'];
  }
}

export function formatDate(date: string | Date): string {
  if (!date) return '';

  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}
