import { AnomalyCategory } from '../types';
import { formatCategory } from './utils';

export function processAnomalyData(
  data: Record<AnomalyCategory, number>
): Record<string, number> {
  const processedData: Record<string, number> = {};

  // Initialize main categories
  processedData[AnomalyCategory.EDI] = data[AnomalyCategory.EDI] || 0;
  processedData[AnomalyCategory.EXPEDITION] =
    data[AnomalyCategory.EXPEDITION] || 0;
  processedData[AnomalyCategory.ETIQUETTAGE] =
    data[AnomalyCategory.ETIQUETTAGE] || 0;
  processedData[AnomalyCategory.PALETISATION] =
    data[AnomalyCategory.PALETISATION] || 0;

  // Consolidate etiquettage categories
  if (data[AnomalyCategory.ETIQUETTAGE_PALETTE_HOMOGENE]) {
    processedData[AnomalyCategory.ETIQUETTAGE] +=
      data[AnomalyCategory.ETIQUETTAGE_PALETTE_HOMOGENE];
  }

  if (data[AnomalyCategory.ETIQUETTAGE_PALETTE_HETEROGENE]) {
    processedData[AnomalyCategory.ETIQUETTAGE] +=
      data[AnomalyCategory.ETIQUETTAGE_PALETTE_HETEROGENE];
  }

  return processedData;
}

export function getChartData(data: Record<string, number>) {
  return Object.entries(data)
    .filter(([key]) => {
      // Filter out the categories we want to hide
      return (
        key !== AnomalyCategory.ETIQUETTAGE_PALETTE_HOMOGENE &&
        key !== AnomalyCategory.ETIQUETTAGE_PALETTE_HETEROGENE
      );
    })
    .map(([category, value]) => ({
      name: formatCategory(category as AnomalyCategory),
      value,
      category, // Keep original category key for color mapping
    }));
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case AnomalyCategory.EDI:
      return '#3B82F6'; // Blue
    case AnomalyCategory.EXPEDITION:
      return '#F97316'; // Orange
    case AnomalyCategory.ETIQUETTAGE:
    case AnomalyCategory.ETIQUETTAGE_PALETTE_HOMOGENE:
    case AnomalyCategory.ETIQUETTAGE_PALETTE_HETEROGENE:
      return '#14B8A6'; // Teal
    case AnomalyCategory.PALETISATION:
      return '#EF4444'; // Red
    default:
      return '#9CA3AF'; // Gray
  }
}
