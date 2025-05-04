import {
  AnomalyCategory,
  EDISubcategory,
  ExpeditionSubcategory,
  EtiquettageSubcategory,
  EtiquettagePaletteHomogeneSubcategory,
  EtiquettagePaletteHeterogeneSubcategory,
  PaletisationSubcategory,
  SubcategoryInfo,
} from '@/types';

// Category labels
export const CATEGORY_LABELS: Record<AnomalyCategory, string> = {
  [AnomalyCategory.EDI]: 'EDI',
  [AnomalyCategory.EXPEDITION]: 'Expédition',
  [AnomalyCategory.ETIQUETTAGE]: 'Etiquettage',
  [AnomalyCategory.ETIQUETTAGE_PALETTE_HOMOGENE]:
    'Etiquettage Palette Homogène',
  [AnomalyCategory.ETIQUETTAGE_PALETTE_HETEROGENE]:
    'Etiquettage Palette Hétérogène',
  [AnomalyCategory.PALETISATION]: 'Palétisation',
};

export const CATEGORY_COLORS: Record<AnomalyCategory, string> = {
  [AnomalyCategory.EDI]: 'bg-blue-100 text-blue-800 border-blue-300',
  [AnomalyCategory.EXPEDITION]: 'bg-green-100 text-green-800 border-green-300',
  [AnomalyCategory.ETIQUETTAGE]:
    'bg-purple-100 text-purple-800 border-purple-300',
  [AnomalyCategory.ETIQUETTAGE_PALETTE_HOMOGENE]:
    'bg-indigo-100 text-indigo-800 border-indigo-300',
  [AnomalyCategory.ETIQUETTAGE_PALETTE_HETEROGENE]:
    'bg-violet-100 text-violet-800 border-violet-300',
  [AnomalyCategory.PALETISATION]:
    'bg-amber-100 text-amber-800 border-amber-300',
};

export const EDI_SUBCATEGORY_MAP: Record<EDISubcategory, SubcategoryInfo> = {
  [EDISubcategory.MULTI_BL]: {
    label: 'Multi BL',
    chapitreMLP: 'Chap H S2.4',
    codeAnomalie: '136',
  },
  [EDISubcategory.MANQUE_BL]: {
    label: 'Manque BL',
    chapitreMLP: 'Chap H S2.4',
    codeAnomalie: '136',
  },
  [EDISubcategory.BL_NON_CONFORME]: {
    label: 'BL non conforme',
    chapitreMLP: 'Chap H S2.4',
    codeAnomalie: '136',
  },
  [EDISubcategory.MANQUE_AVIEXP]: {
    label: 'Manque AVIEXP / Saisie manuelle',
    chapitreMLP: 'Chap H S2.3',
    codeAnomalie: '141',
  },
  [EDISubcategory.INCOHERENCE_CONSTITUTION_PALETTE_EDI]: {
    label:
      'Incohérence entre la constitution physique de la palette et la constitution dans le message EDI ( vérification fiche palette hétérogène ou sur les fiches suiveuses)',
    chapitreMLP: 'Chap H S2.3',
    codeAnomalie: '113',
  },
  [EDISubcategory.INCOHERENCE_CODE_EMBALLAGE]: {
    label:
      "Incohérence entre code emballage fiche suiveuse et l'emballage livré",
    chapitreMLP: 'X',
    codeAnomalie: '113',
  },
  [EDISubcategory.NUMERO_BL_CMR_HORS_CRL]: {
    label: 'Numéro de BL sur la  CMR hors CRL',
    chapitreMLP: 'Chap C S3 pt 6',
    codeAnomalie: '136',
  },
};

// Expedition subcategory labels, chapitres and codes
export const EXPEDITION_SUBCATEGORY_MAP: Record<
  ExpeditionSubcategory,
  SubcategoryInfo
> = {
  [ExpeditionSubcategory.TAUX_REMPLISSAGE]: {
    label: 'Taux de remplissage',
    chapitreMLP: 'EXP-001',
    codeAnomalie: 'X001',
  },
  [ExpeditionSubcategory.DATE_FABRICATION_BATTERIE]: {
    label: 'Date fabrication batterie',
    chapitreMLP: 'EXP-002',
    codeAnomalie: 'X002',
  },
  [ExpeditionSubcategory.FUITE_HUILE_REMORQUE]: {
    label: 'Fuite huile remorque',
    chapitreMLP: 'EXP-003',
    codeAnomalie: 'X003',
  },
  [ExpeditionSubcategory.CODE_ROUTAGE_TRANCHE_DEPASSEE]: {
    label: 'Code routage tranche dépassée',
    chapitreMLP: 'EXP-004',
    codeAnomalie: 'X004',
  },
  [ExpeditionSubcategory.CHARGEMENT_NON_CONFORME]: {
    label: 'Chargement non conforme',
    chapitreMLP: 'EXP-005',
    codeAnomalie: 'X005',
  },
  [ExpeditionSubcategory.TEMPERATURE_STOCKAGE_NON_RESPECTEE]: {
    label: 'Température stockage non respectée',
    chapitreMLP: 'EXP-006',
    codeAnomalie: 'X006',
  },
  [ExpeditionSubcategory.INCOHERENCE_CONSTITUTION_LIVRAISON_EDI]: {
    label: 'Incohérence constitution livraison EDI',
    chapitreMLP: 'EXP-007',
    codeAnomalie: 'X007',
  },
};

// Etiquettage subcategory labels, chapitres and codes
export const ETIQUETTAGE_SUBCATEGORY_MAP: Record<
  EtiquettageSubcategory,
  SubcategoryInfo
> = {
  [EtiquettageSubcategory.ETIQUETTE_EM_NON_VISIBLE]: {
    label: 'Etiquette EM non visible',
    chapitreMLP: 'ETQ-001',
    codeAnomalie: 'T001',
  },
  [EtiquettageSubcategory.ETIQUETTES_UM_UC_MAL_POSITIONNEES]: {
    label: 'Etiquettes UM/UC mal positionnées',
    chapitreMLP: 'ETQ-002',
    codeAnomalie: 'T002',
  },
  [EtiquettageSubcategory.MAUVAIS_FORMAT_ETIQUETTE]: {
    label: 'Mauvais format étiquette',
    chapitreMLP: 'ETQ-003',
    codeAnomalie: 'T003',
  },
  [EtiquettageSubcategory.MANQUE_ETIQUETTES_VIDE]: {
    label: 'Manque étiquettes vide',
    chapitreMLP: 'ETQ-004',
    codeAnomalie: 'T004',
  },
  [EtiquettageSubcategory.ETIQUETTES_COLLEES_EMBALLAGE_DURABLE]: {
    label: 'Etiquettes collées emballage durable',
    chapitreMLP: 'ETQ-005',
    codeAnomalie: 'T005',
  },
  [EtiquettageSubcategory.PLUSIEURS_ETIQUETTES_UC]: {
    label: 'Plusieurs étiquettes UC',
    chapitreMLP: 'ETQ-006',
    codeAnomalie: 'T006',
  },
  [EtiquettageSubcategory.DESTINATAIRE_ABSENT_ERRONE]: {
    label: 'Destinataire absent/erroné',
    chapitreMLP: 'ETQ-007',
    codeAnomalie: 'T007',
  },
  [EtiquettageSubcategory.EXPEDITEUR_ABSENT_ERRONE]: {
    label: 'Expéditeur absent/erroné',
    chapitreMLP: 'ETQ-008',
    codeAnomalie: 'T008',
  },
  [EtiquettageSubcategory.POINT_CHARGEMENT_ABSENT_ERRONE]: {
    label: 'Point chargement absent/erroné',
    chapitreMLP: 'ETQ-009',
    codeAnomalie: 'T009',
  },
  [EtiquettageSubcategory.CODE_PRODUIT_ABSENT]: {
    label: 'Code produit absent',
    chapitreMLP: 'ETQ-010',
    codeAnomalie: 'T010',
  },
  [EtiquettageSubcategory.CODE_VENDEUR_ABSENT_ERRONE]: {
    label: 'Code vendeur absent/erroné',
    chapitreMLP: 'ETQ-011',
    codeAnomalie: 'T011',
  },
  [EtiquettageSubcategory.QUANTITE_UC_ABSENTE_ERRONEE]: {
    label: 'Quantité UC absente/erronée',
    chapitreMLP: 'ETQ-012',
    codeAnomalie: 'T012',
  },
  [EtiquettageSubcategory.NOMBRE_COLIS_PLEINS_ABSENT_ERRONE]: {
    label: 'Nombre colis pleins absent/erroné',
    chapitreMLP: 'ETQ-013',
    codeAnomalie: 'T013',
  },
  [EtiquettageSubcategory.NOMBRE_ETIQUETTE_INDICE_ABSENT_ERRONE]: {
    label: 'Nombre étiquette indice absent/erroné',
    chapitreMLP: 'ETQ-014',
    codeAnomalie: 'T014',
  },
  [EtiquettageSubcategory.POIDS_ABSENT_ERRONE]: {
    label: 'Poids absent/erroné',
    chapitreMLP: 'ETQ-015',
    codeAnomalie: 'T015',
  },
  [EtiquettageSubcategory.DATE_ABSENTE_ERRONEE]: {
    label: 'Date absente/erronée',
    chapitreMLP: 'ETQ-016',
    codeAnomalie: 'T016',
  },
  [EtiquettageSubcategory.CODE_BARRES_ILLISIBLE_ABSENT]: {
    label: 'Code barres illisible/absent',
    chapitreMLP: 'ETQ-017',
    codeAnomalie: 'T017',
  },
  [EtiquettageSubcategory.ETIQUETTE_COMPLETE_COULEUR]: {
    label: 'Etiquette complète couleur',
    chapitreMLP: 'ETQ-018',
    codeAnomalie: 'T018',
  },
  [EtiquettageSubcategory.ETIQUETTE_NE_CORRESPOND_PAS]: {
    label: 'Etiquette ne correspond pas',
    chapitreMLP: 'ETQ-019',
    codeAnomalie: 'T019',
  },
};

// Etiquettage Palette Homogene subcategory labels, chapitres and codes
export const ETIQUETTAGE_PALETTE_HOMOGENE_SUBCATEGORY_MAP: Record<
  EtiquettagePaletteHomogeneSubcategory,
  SubcategoryInfo
> = {
  [EtiquettagePaletteHomogeneSubcategory.ABSENCE_ERREUR_CODE_ROUTAGE]: {
    label: 'Absence/erreur code routage',
    chapitreMLP: 'EPH-001',
    codeAnomalie: 'H001',
  },
  [EtiquettagePaletteHomogeneSubcategory.ABSENCE_ERREUR_POINT_DESTINATION]: {
    label: 'Absence/erreur point destination',
    chapitreMLP: 'EPH-002',
    codeAnomalie: 'H002',
  },
  [EtiquettagePaletteHomogeneSubcategory.INCOHERENCE_CODE_ROUTAGE_DESTINATION]:
    {
      label: 'Incohérence code routage/destination',
      chapitreMLP: 'EPH-003',
      codeAnomalie: 'H003',
    },
};

// Etiquettage Palette Heterogene subcategory labels, chapitres and codes
export const ETIQUETTAGE_PALETTE_HETEROGENE_SUBCATEGORY_MAP: Record<
  EtiquettagePaletteHeterogeneSubcategory,
  SubcategoryInfo
> = {
  [EtiquettagePaletteHeterogeneSubcategory.ABSENCE_ERREUR_CODE_ROUTAGE_UM]: {
    label: 'Absence/erreur code routage UM',
    chapitreMLP: 'ETH-001',
    codeAnomalie: 'G001',
  },
  [EtiquettagePaletteHeterogeneSubcategory.POINT_DESTINATION_CODE_PRODUIT_PRESENT]:
    {
      label: 'Point destination/code produit présent',
      chapitreMLP: 'ETH-002',
      codeAnomalie: 'G002',
    },
  [EtiquettagePaletteHeterogeneSubcategory.ABSENCE_ERREUR_CODE_ROUTAGE_UC]: {
    label: 'Absence/erreur code routage UC',
    chapitreMLP: 'ETH-003',
    codeAnomalie: 'G003',
  },
  [EtiquettagePaletteHeterogeneSubcategory.AUTRES_ANOMALIES_ETIQUETAGE]: {
    label: 'Autres anomalies étiquetage',
    chapitreMLP: 'ETH-004',
    codeAnomalie: 'G004',
  },
};

// Paletisation subcategory labels, chapitres and codes
export const PALETISATION_SUBCATEGORY_MAP: Record<
  PaletisationSubcategory,
  SubcategoryInfo
> = {
  [PaletisationSubcategory.TYPE_PALETTE_NON_CONFORME]: {
    label: 'Type palette non conforme',
    chapitreMLP: 'PAL-001',
    codeAnomalie: 'P001',
  },
  [PaletisationSubcategory.PALETTE_NON_TRAITEE]: {
    label: 'Palette non traitée',
    chapitreMLP: 'PAL-002',
    codeAnomalie: 'P002',
  },
  [PaletisationSubcategory.UCS_NON_PALETTISE]: {
    label: 'UCs non palettisé',
    chapitreMLP: 'PAL-003',
    codeAnomalie: 'P003',
  },
  [PaletisationSubcategory.MAUVAISE_CONSTITUTION_PALETTE]: {
    label: 'Mauvaise constitution palette',
    chapitreMLP: 'PAL-004',
    codeAnomalie: 'P004',
  },
  [PaletisationSubcategory.PALETTE_FILMEE]: {
    label: 'Palette filmée',
    chapitreMLP: 'PAL-005',
    codeAnomalie: 'P005',
  },
  [PaletisationSubcategory.CERCLAGE_NON_CONFORME_ABSENT]: {
    label: 'Cerclage non conforme/absent',
    chapitreMLP: 'PAL-006',
    codeAnomalie: 'P006',
  },
  [PaletisationSubcategory.MANQUE_COIFFE_NON_CONFORME]: {
    label: 'Manque coiffe/non conforme',
    chapitreMLP: 'PAL-007',
    codeAnomalie: 'P007',
  },
  [PaletisationSubcategory.PALETTE_NON_GERBABLE]: {
    label: 'Palette non gerbable',
    chapitreMLP: 'PAL-008',
    codeAnomalie: 'P008',
  },
  [PaletisationSubcategory.PLUSIEURS_CODE_ROUTAGES]: {
    label: 'Plusieurs code routages',
    chapitreMLP: 'PAL-009',
    codeAnomalie: 'P009',
  },
  [PaletisationSubcategory.PLUSIEURS_FOURNISSEURS]: {
    label: 'Plusieurs fournisseurs',
    chapitreMLP: 'PAL-010',
    codeAnomalie: 'P010',
  },
  [PaletisationSubcategory.POINTS_DECHARGEMENT_DIFFERENTS]: {
    label: 'Points déchargement différents',
    chapitreMLP: 'PAL-011',
    codeAnomalie: 'P011',
  },
  [PaletisationSubcategory.AUTRES_ANOMALIES_PALETISATION]: {
    label: 'Autres anomalies palétisation',
    chapitreMLP: 'PAL-012',
    codeAnomalie: 'P012',
  },
};

export function getSubcategoriesForCategory(
  category: AnomalyCategory
): string[] {
  switch (category) {
    case AnomalyCategory.EDI:
      return Object.values(EDISubcategory);
    case AnomalyCategory.EXPEDITION:
      return Object.values(ExpeditionSubcategory);
    case AnomalyCategory.ETIQUETTAGE:
      return Object.values(EtiquettageSubcategory);
    case AnomalyCategory.ETIQUETTAGE_PALETTE_HOMOGENE:
      return Object.values(EtiquettagePaletteHomogeneSubcategory);
    case AnomalyCategory.ETIQUETTAGE_PALETTE_HETEROGENE:
      return Object.values(EtiquettagePaletteHeterogeneSubcategory);
    case AnomalyCategory.PALETISATION:
      return Object.values(PaletisationSubcategory);
    default:
      return [];
  }
}

// Helper functions for subcategory label lookup with type safety
export function getEDISubcategoryLabel(subcategory: EDISubcategory): string {
  return EDI_SUBCATEGORY_MAP[subcategory]?.label || subcategory;
}

export function getExpeditionSubcategoryLabel(
  subcategory: ExpeditionSubcategory
): string {
  return EXPEDITION_SUBCATEGORY_MAP[subcategory]?.label || subcategory;
}

export function getEtiquettageSubcategoryLabel(
  subcategory: EtiquettageSubcategory
): string {
  return ETIQUETTAGE_SUBCATEGORY_MAP[subcategory]?.label || subcategory;
}

export function getEtiquettagePaletteHomogeneSubcategoryLabel(
  subcategory: EtiquettagePaletteHomogeneSubcategory
): string {
  return (
    ETIQUETTAGE_PALETTE_HOMOGENE_SUBCATEGORY_MAP[subcategory]?.label ||
    subcategory
  );
}

export function getEtiquettagePaletteHeterogeneSubcategoryLabel(
  subcategory: EtiquettagePaletteHeterogeneSubcategory
): string {
  return (
    ETIQUETTAGE_PALETTE_HETEROGENE_SUBCATEGORY_MAP[subcategory]?.label ||
    subcategory
  );
}

export function getPaletisationSubcategoryLabel(
  subcategory: PaletisationSubcategory
): string {
  return PALETISATION_SUBCATEGORY_MAP[subcategory]?.label || subcategory;
}

// Type-safe subcategory label lookup
export function getSubcategoryLabel(
  category: AnomalyCategory,
  subcategory: string
): string {
  switch (category) {
    case AnomalyCategory.EDI:
      return getEDISubcategoryLabel(subcategory as EDISubcategory);
    case AnomalyCategory.EXPEDITION:
      return getExpeditionSubcategoryLabel(
        subcategory as ExpeditionSubcategory
      );
    case AnomalyCategory.ETIQUETTAGE:
      return getEtiquettageSubcategoryLabel(
        subcategory as EtiquettageSubcategory
      );
    case AnomalyCategory.ETIQUETTAGE_PALETTE_HOMOGENE:
      return getEtiquettagePaletteHomogeneSubcategoryLabel(
        subcategory as EtiquettagePaletteHomogeneSubcategory
      );
    case AnomalyCategory.ETIQUETTAGE_PALETTE_HETEROGENE:
      return getEtiquettagePaletteHeterogeneSubcategoryLabel(
        subcategory as EtiquettagePaletteHeterogeneSubcategory
      );
    case AnomalyCategory.PALETISATION:
      return getPaletisationSubcategoryLabel(
        subcategory as PaletisationSubcategory
      );
    default:
      return subcategory;
  }
}
