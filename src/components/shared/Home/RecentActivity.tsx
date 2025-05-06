import React from 'react';
import { formatDate, truncateText, getCategoryColor } from '@/lib/utils';
import { ChecklistData, AnomalyCategory } from '@/types';
import { ClipboardCheck } from 'lucide-react';

interface RecentActivityCardProps {
  checklists: ChecklistData[];
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  checklists,
}) => {
  if (!checklists || checklists.length === 0) {
    return (
      <div className="rounded-xl border-[1px] border-subMain dark:border-border shadow-sm p-5 my-2">
        <h3 className="text-lg font-semibold">Activité récente</h3>
        <div className="flex justify-center items-center h-40 text-gray-400 font-medium">
          Aucune activité récente
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-[1px] border-subMain dark:border-border shadow-sm p-5 mb-6">
      <h3 className="text-lg font-semibold">Activité récente</h3>
      <div className="mt-4 space-y-4">
        {checklists.map((checklist) => {
          // Get the first category for display
          const primaryCategory =
            checklist.categories![0] || AnomalyCategory.EDI;
          const [, textColor] = getCategoryColor(primaryCategory);

          return (
            <div
              key={checklist.id}
              className="flex items-center space-x-3 space-y-4"
            >
              <div className={`p-2 rounded-lg ${textColor} bg-opacity-10 mt-1`}>
                <ClipboardCheck className={`size-8 ${textColor}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">
                    {truncateText(
                      `${checklist.blNumber} - ${checklist.reference}`,
                      30
                    )}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {formatDate(checklist.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {`Par ${checklist.createdBy.firstName || ''} ${
                    checklist.createdBy.lastName || ''
                  }`}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {checklist.categories!.map((category, index) => {
                    const [bgColor] = getCategoryColor(category);
                    return (
                      <span
                        key={`${checklist.id}-${index}`}
                        className={`${bgColor} text-white text-xs px-2 py-1 rounded-md`}
                      >
                        {truncateText(category, 15)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivityCard;
