import { getChecklist } from '@/lib/actions/checklist';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  ClipboardCheck,
  Calendar,
  User,
  Truck,
  Package,
  FileText,
  Tag,
  CheckSquare,
  AlertTriangle,
  Clock,
  Pencil,
  Building2,
  Briefcase,
  Users,
  Box,
  CheckCircle2,
} from 'lucide-react';
import {
  EDI_SUBCATEGORY_MAP,
  EXPEDITION_SUBCATEGORY_MAP,
  ETIQUETTAGE_SUBCATEGORY_MAP,
  ETIQUETTAGE_PALETTE_HOMOGENE_SUBCATEGORY_MAP,
  ETIQUETTAGE_PALETTE_HETEROGENE_SUBCATEGORY_MAP,
  PALETISATION_SUBCATEGORY_MAP,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  getSubcategoriesForCategory,
} from '@/constants';
import { EDISubcategory, SubcategoryInfo } from '@/types';
import Link from 'next/link';
import { AnomalyCategory } from '@/types';
import ImageGallery from '@/components/shared/Checklist/ImageGallery';
import StatusBadges from '@/components/shared/Checklist/StatusBadge';
import EDIDetailsModal from '@/components/shared/Checklist/EDIDetailsModal';
import EDIDetailsButton from '@/components/shared/Checklist/EDIDetailsButton';
import { Button } from '@/components/ui/button';
import { DeleteChecklist } from '@/components/shared/Checklist/DeleteChecklist';
import { IoArrowBackOutline } from 'react-icons/io5';

type SubcategoryMap = {
  [AnomalyCategory.EDI]: typeof EDI_SUBCATEGORY_MAP;
  [AnomalyCategory.EXPEDITION]: typeof EXPEDITION_SUBCATEGORY_MAP;
  [AnomalyCategory.ETIQUETTAGE]: typeof ETIQUETTAGE_SUBCATEGORY_MAP;
  [AnomalyCategory.ETIQUETTAGE_PALETTE_HOMOGENE]: typeof ETIQUETTAGE_PALETTE_HOMOGENE_SUBCATEGORY_MAP;
  [AnomalyCategory.ETIQUETTAGE_PALETTE_HETEROGENE]: typeof ETIQUETTAGE_PALETTE_HETEROGENE_SUBCATEGORY_MAP;
  [AnomalyCategory.PALETISATION]: typeof PALETISATION_SUBCATEGORY_MAP;
};

function getSubcategoryInfo(
  category: AnomalyCategory,
  subcategory: string
): SubcategoryInfo | null {
  const maps: SubcategoryMap = {
    [AnomalyCategory.EDI]: EDI_SUBCATEGORY_MAP,
    [AnomalyCategory.EXPEDITION]: EXPEDITION_SUBCATEGORY_MAP,
    [AnomalyCategory.ETIQUETTAGE]: ETIQUETTAGE_SUBCATEGORY_MAP,
    [AnomalyCategory.ETIQUETTAGE_PALETTE_HOMOGENE]:
      ETIQUETTAGE_PALETTE_HOMOGENE_SUBCATEGORY_MAP,
    [AnomalyCategory.ETIQUETTAGE_PALETTE_HETEROGENE]:
      ETIQUETTAGE_PALETTE_HETEROGENE_SUBCATEGORY_MAP,
    [AnomalyCategory.PALETISATION]: PALETISATION_SUBCATEGORY_MAP,
  };

  const categoryMap = maps[category];
  if (!categoryMap) return null;

  return categoryMap[subcategory as keyof typeof categoryMap] || null;
}

function isSubcategoryInCategory(
  category: AnomalyCategory,
  subcategory: string
): boolean {
  const categorySubcategories = getSubcategoriesForCategory(category);
  return categorySubcategories.includes(subcategory);
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default async function ChecklistPage({
  params,
}: {
  params: { checklistId: string };
}) {
  const checklist = await getChecklist(params.checklistId);

  if (!checklist.data) return notFound();

  const data = checklist.data;
  const createdAt = new Date(data.createdAt);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="rounded-xl shadow-sm border border-subMain dark:border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg lg:text-2xl font-bold flex items-center gap-2">
              <ClipboardCheck className="h-6 w-6 text-main" />
              Checklist{' '}
              <span className="font-bold ml-2 underline">
                #{data.id.slice(0, 8)}
              </span>
            </h1>
          </div>

          {/* Metadata Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border border-subMain dark:border-border rounded-lg mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-main" />
              <div>
                <p className="text-sm text-gray-600">Date de création</p>
                <p className="font-medium">
                  {format(createdAt, "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                </p>
              </div>
            </div>

            {data.timeSpent && (
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-main" />
                <div>
                  <p className="text-sm text-gray-600">Temps de création</p>
                  <p className="font-medium">{formatTime(data.timeSpent)}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-main" />
              <div>
                <p className="text-sm text-gray-600">Créé par</p>
                <Link href={`/users/${data.createdBy.id}`}>
                  <span className="font-medium">
                    {data.createdBy.firstName} {data.createdBy.lastName}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 p-4 rounded-lg border border-subMain dark:border-border">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-main" />
              <div>
                <p className="text-sm text-gray-600">Projet</p>
                <p className="font-medium">{data.project}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-main" />
              <div>
                <p className="text-sm text-gray-600">Shift</p>
                <p className="font-medium">{data.shift}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-main" />
              <div>
                <p className="text-sm text-gray-600">Fournisseur</p>
                <p className="font-medium">{data.providerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Box className="h-5 w-5 text-main" />
              <div>
                <p className="text-sm text-gray-600">Type d'expédition</p>
                <p className="font-medium capitalize">
                  {data.shipmentType.toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 p-4 rounded-lg border border-subMain dark:border-border">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-main" />
              <div>
                <p className="text-sm text-gray-600">Code Route</p>
                <p className="font-medium">{data.codeRoute}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-main" />
              <div>
                <p className="text-sm text-gray-600">COFOR</p>
                <p className="font-medium">{data.cofor}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-main" />
              <div>
                <p className="text-sm text-gray-600">Numéro BL</p>
                <p className="font-medium">{data.blNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-main" />
              <div>
                <p className="text-sm text-gray-600">Référence</p>
                <p className="font-medium">{data.reference}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-main" />
              <div>
                <p className="text-sm text-gray-600">Matricule</p>
                <p className="font-medium">{data.matricule}</p>
              </div>
            </div>
          </div>
        </div>

        {data.deliveryType === 'CONFORME' ? (
          <div className="rounded-xl shadow-sm border border-green-200 bg-green-50 p-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              Livraison Conforme
            </h2>
            {data.conformityComment && (
              <p className="text-green-600 mt-2">{data.conformityComment}</p>
            )}
          </div>
        ) : (
          <>
            {/* Anomalies Section */}
            <div className="rounded-xl shadow-sm border border-subMain dark:border-border p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Anomalies Détectées
              </h2>

              <div className="space-y-6">
                {data.categories.map((category) => {
                  const categoryEnum = category as AnomalyCategory;
                  const categorySubcategories = data.subcategories.filter(
                    (sub) => isSubcategoryInCategory(categoryEnum, sub)
                  );

                  if (categorySubcategories.length === 0) return null;

                  return (
                    <div
                      key={category}
                      className="border border-subMain dark:border-border rounded-lg overflow-hidden"
                    >
                      <div className={`p-4 ${CATEGORY_COLORS[categoryEnum]}`}>
                        <h3 className="font-semibold">
                          {CATEGORY_LABELS[categoryEnum]}
                        </h3>
                      </div>
                      <div className="p-4">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-subMain dark:divide-border">
                            <thead>
                              <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                  Sous-catégorie
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                  Chapitre MLP
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                  Code Anomalie
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                  Statut
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-subMain dark:divide-border">
                              {categorySubcategories.map((subcategory) => {
                                const info = getSubcategoryInfo(
                                  categoryEnum,
                                  subcategory
                                );
                                const details = data.subcategoryDetails.find(
                                  (detail) => detail.subcategory === subcategory
                                );
                                const title = info?.label || subcategory;
                                const isEDIIncoherence =
                                  subcategory ===
                                  EDISubcategory.INCOHERENCE_CONSTITUTION_PALETTE_EDI;

                                return (
                                  <tr
                                    key={subcategory}
                                    className="hover:bg-greyed/20"
                                  >
                                    <td className="px-4 py-2 text-sm">
                                      {title}
                                    </td>
                                    <td className="px-4 py-2 text-sm font-medium text-blue-600">
                                      {info?.chapitreMLP || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-sm font-medium text-red-600">
                                      {info?.codeAnomalie || 'N/A'}
                                    </td>
                                    <td className="px-4 py-2">
                                      <StatusBadges
                                        um={details?.um || false}
                                        uc={details?.uc || false}
                                        ums={details?.ums || false}
                                        bl={details?.bl || false}
                                        aviexp={details?.aviexp || false}
                                        comment={details?.comment || undefined}
                                        title={title}
                                      />
                                    </td>
                                    <td className="px-4 py-2">
                                      {isEDIIncoherence && details && (
                                        <EDIDetailsButton details={details} />
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Images Section */}
              {data.images.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Images des Anomalies
                  </h3>
                  <ImageGallery images={data.images} />
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex items-center gap-3 my-4 w-full">
        <Button
          asChild
          variant="link"
          className="flex items-center gap-2 w-full bg-subMain hover:bg-main/20 dark:bg-secondary"
        >
          <Link href={`/checklist/${data.id}/update`}>
            <Pencil className="h-4 w-4" />
            Modifier
          </Link>
        </Button>
        <DeleteChecklist
          checklistId={data.id}
          className="w-full"
          text="Supprimer"
        />
      </div>
    </div>
  );
}
