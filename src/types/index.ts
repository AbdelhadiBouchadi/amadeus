export enum UserRole {
  MONITOR = 'MONITOR',
  VISITOR = 'VISITOR',
  ADMIN = 'ADMIN',
}

export enum AnomalyCategory {
  EDI = 'EDI',
  EXPEDITION = 'EXPEDITION',
  ETIQUETTAGE = 'ETIQUETTAGE',
  ETIQUETTAGE_PALETTE_HOMOGENE = 'ETIQUETTAGE_PALETTE_HOMOGENE',
  ETIQUETTAGE_PALETTE_HETEROGENE = 'ETIQUETTAGE_PALETTE_HETEROGENE',
  PALETISATION = 'PALETISATION',
}

export enum EDISubcategory {
  MULTI_BL = 'MULTI_BL',
  MANQUE_BL = 'MANQUE_BL',
  BL_NON_CONFORME = 'BL_NON_CONFORME',
  MANQUE_AVIEXP = 'MANQUE_AVIEXP',
  INCOHERENCE_CONSTITUTION_PALETTE_EDI = 'INCOHERENCE_CONSTITUTION_PALETTE_EDI',
  INCOHERENCE_CODE_EMBALLAGE = 'INCOHERENCE_CODE_EMBALLAGE',
  NUMERO_BL_CMR_HORS_CRL = 'NUMERO_BL_CMR_HORS_CRL',
}

export enum ExpeditionSubcategory {
  TAUX_REMPLISSAGE = 'TAUX_REMPLISSAGE',
  DATE_FABRICATION_BATTERIE = 'DATE_FABRICATION_BATTERIE',
  FUITE_HUILE_REMORQUE = 'FUITE_HUILE_REMORQUE',
  CODE_ROUTAGE_TRANCHE_DEPASSEE = 'CODE_ROUTAGE_TRANCHE_DEPASSEE',
  CHARGEMENT_NON_CONFORME = 'CHARGEMENT_NON_CONFORME',
  TEMPERATURE_STOCKAGE_NON_RESPECTEE = 'TEMPERATURE_STOCKAGE_NON_RESPECTEE',
  INCOHERENCE_CONSTITUTION_LIVRAISON_EDI = 'INCOHERENCE_CONSTITUTION_LIVRAISON_EDI',
}

export enum EtiquettageSubcategory {
  ETIQUETTE_EM_NON_VISIBLE = 'ETIQUETTE_EM_NON_VISIBLE',
  ETIQUETTES_UM_UC_MAL_POSITIONNEES = 'ETIQUETTES_UM_UC_MAL_POSITIONNEES',
  MAUVAIS_FORMAT_ETIQUETTE = 'MAUVAIS_FORMAT_ETIQUETTE',
  MANQUE_ETIQUETTES_VIDE = 'MANQUE_ETIQUETTES_VIDE',
  ETIQUETTES_COLLEES_EMBALLAGE_DURABLE = 'ETIQUETTES_COLLEES_EMBALLAGE_DURABLE',
  PLUSIEURS_ETIQUETTES_UC = 'PLUSIEURS_ETIQUETTES_UC',
  DESTINATAIRE_ABSENT_ERRONE = 'DESTINATAIRE_ABSENT_ERRONE',
  EXPEDITEUR_ABSENT_ERRONE = 'EXPEDITEUR_ABSENT_ERRONE',
  POINT_CHARGEMENT_ABSENT_ERRONE = 'POINT_CHARGEMENT_ABSENT_ERRONE',
  CODE_PRODUIT_ABSENT = 'CODE_PRODUIT_ABSENT',
  CODE_VENDEUR_ABSENT_ERRONE = 'CODE_VENDEUR_ABSENT_ERRONE',
  QUANTITE_UC_ABSENTE_ERRONEE = 'QUANTITE_UC_ABSENTE_ERRONEE',
  NOMBRE_COLIS_PLEINS_ABSENT_ERRONE = 'NOMBRE_COLIS_PLEINS_ABSENT_ERRONE',
  NOMBRE_ETIQUETTE_INDICE_ABSENT_ERRONE = 'NOMBRE_ETIQUETTE_INDICE_ABSENT_ERRONE',
  POIDS_ABSENT_ERRONE = 'POIDS_ABSENT_ERRONE',
  DATE_ABSENTE_ERRONEE = 'DATE_ABSENTE_ERRONEE',
  CODE_BARRES_ILLISIBLE_ABSENT = 'CODE_BARRES_ILLISIBLE_ABSENT',
  ETIQUETTE_COMPLETE_COULEUR = 'ETIQUETTE_COMPLETE_COULEUR',
  ETIQUETTE_NE_CORRESPOND_PAS = 'ETIQUETTE_NE_CORRESPOND_PAS',
}

export enum EtiquettagePaletteHomogeneSubcategory {
  ABSENCE_ERREUR_CODE_ROUTAGE = 'ABSENCE_ERREUR_CODE_ROUTAGE',
  ABSENCE_ERREUR_POINT_DESTINATION = 'ABSENCE_ERREUR_POINT_DESTINATION',
  INCOHERENCE_CODE_ROUTAGE_DESTINATION = 'INCOHERENCE_CODE_ROUTAGE_DESTINATION',
}

export enum EtiquettagePaletteHeterogeneSubcategory {
  ABSENCE_ERREUR_CODE_ROUTAGE_UM = 'ABSENCE_ERREUR_CODE_ROUTAGE_UM',
  POINT_DESTINATION_CODE_PRODUIT_PRESENT = 'POINT_DESTINATION_CODE_PRODUIT_PRESENT',
  ABSENCE_ERREUR_CODE_ROUTAGE_UC = 'ABSENCE_ERREUR_CODE_ROUTAGE_UC',
  AUTRES_ANOMALIES_ETIQUETAGE = 'AUTRES_ANOMALIES_ETIQUETAGE',
}

export enum PaletisationSubcategory {
  TYPE_PALETTE_NON_CONFORME = 'TYPE_PALETTE_NON_CONFORME',
  PALETTE_NON_TRAITEE = 'PALETTE_NON_TRAITEE',
  UCS_NON_PALETTISE = 'UCS_NON_PALETTISE',
  MAUVAISE_CONSTITUTION_PALETTE = 'MAUVAISE_CONSTITUTION_PALETTE',
  PALETTE_FILMEE = 'PALETTE_FILMEE',
  CERCLAGE_NON_CONFORME_ABSENT = 'CERCLAGE_NON_CONFORME_ABSENT',
  MANQUE_COIFFE_NON_CONFORME = 'MANQUE_COIFFE_NON_CONFORME',
  PALETTE_NON_GERBABLE = 'PALETTE_NON_GERBABLE',
  PLUSIEURS_CODE_ROUTAGES = 'PLUSIEURS_CODE_ROUTAGES',
  PLUSIEURS_FOURNISSEURS = 'PLUSIEURS_FOURNISSEURS',
  POINTS_DECHARGEMENT_DIFFERENTS = 'POINTS_DECHARGEMENT_DIFFERENTS',
  AUTRES_ANOMALIES_PALETISATION = 'AUTRES_ANOMALIES_PALETISATION',
}

// Interface for subcategory info
export interface SubcategoryInfo {
  label: string;
  chapitreMLP: string;
  codeAnomalie: string;
}

export interface SubcategoryDetail {
  subcategory: string;
  um: boolean;
  uc: boolean;
  ums: boolean;
  bl: boolean;
  aviexp: boolean;
  comment?: string;
  referenceIncoherence?: string;
  codeEmballageBL?: string;
  codeEmballageLivre?: string;
  quantite?: string;
  numEtiquette?: string;
}

// Type for category to subcategory map
export type SubcategoryMap<T extends string> = Record<T, SubcategoryInfo>;

export enum DeliveryType {
  CONFORME = 'CONFORME',
  NON_CONFORME = 'NON_CONFORME',
}

export enum ShipmentType {
  GROUPAGE = 'GROUPAGE',
  NORMALE = 'NORMALE',
}

export interface ChecklistFormData {
  codeRoute: string;
  cofor: string;
  blNumber: string;
  reference: string;
  matricule: string;
  project: string;
  shift: string;
  providerName: string;
  shipmentType: ShipmentType;
  deliveryType: DeliveryType;
  conformityComment?: string;
  categories?: AnomalyCategory[];
  subcategories?: string[];
  subcategoryDetails?: SubcategoryDetail[];
  images?: string[];
}

export interface ChecklistData {
  id: string;
  codeRoute: string;
  cofor: string;
  blNumber: string;
  reference: string;
  matricule: string;
  project: string;
  shift: string;
  providerName: string;
  shipmentType: ShipmentType;
  deliveryType: DeliveryType;
  conformityComment?: string;
  categories: AnomalyCategory[];
  subcategories: string[];
  subcategoryDetails: SubcategoryDetail[];
  images: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  };
  timeSpent?: number;
}

export interface ChecklistStats {
  total: number;
  byCategory: Record<AnomalyCategory, number>;
}

export interface DashboardStats {
  userStats: {
    monitors: number;
    visitors: number;
    admins: number;
  };
  checklistStats: ChecklistStats;
  monthlyStats: {
    users: number[];
    checklists: number[];
  };
  recentChecklists: ChecklistData[];
}

export interface UserStats {
  monitors: number;
  visitors: number;
  admins: number;
}

export interface MonthlyStats {
  checklists: number[];
  users: number[];
}
