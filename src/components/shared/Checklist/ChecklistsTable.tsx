'use client';

import { FiEye, FiTrash } from 'react-icons/fi';
import Link from 'next/link';
import { buttonVariants } from '../../ui/button';
import { cn, formatCategory } from '../../../lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChecklistData } from '@/types';
import { DeleteChecklist } from './DeleteChecklist';

interface ChecklistsTableProps {
  data: ChecklistData[];
}

export const ChecklistsTable: React.FC<ChecklistsTableProps> = ({ data }) => {
  const thClass = 'text-center text-sm font-medium py-3 px-2 whitespace-nowrap';
  const tdClass = 'text-xs py-4 px-2 whitespace-nowrap text-center';

  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto min-w-full">
        <thead className="rounded-md overflow-hidden">
          <tr>
            <th className={thClass}>#</th>
            <th className={thClass}>Code Fournisseur</th>
            <th className={thClass}>Numéro BL</th>
            <th className={thClass}>Matricule</th>
            <th className={thClass}>Créé par</th>
            <th className={thClass}>Créé le</th>
            <th className={thClass}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((checklist) => (
            <tr
              key={checklist.id}
              className="border-b border-subMain dark:border-border hover:bg-greyed/20 transition"
            >
              <td className={tdClass}>{checklist.id.slice(0, 8)}</td>
              <td className={tdClass}>{checklist.cofor}</td>
              <td className={tdClass}>{checklist.blNumber}</td>
              {/* <td className={tdClass}>
                <div className="flex flex-wrap gap-1 justify-center">
                  {checklist.categories.map((category) => (
                    <span
                      key={category}
                      className="py-1 px-2 bg-opacity-10 text-xs rounded-xl inline-block mb-1"
                      style={{
                        backgroundColor: `var(--${category
                          .toLowerCase()
                          .replace('_', '-')}-bg, rgba(128, 128, 128, 0.1))`,
                        color: `var(--${category
                          .toLowerCase()
                          .replace('_', '-')}-text, gray)`,
                      }}
                    >
                      {formatCategory(category)}
                    </span>
                  ))}
                </div>
              </td> */}
              <td className={tdClass}>{checklist.matricule}</td>
              <td className={tdClass}>
                <p className="font-medium ">
                  {checklist.createdBy.firstName} {checklist.createdBy.lastName}
                </p>
              </td>
              <td className={tdClass}>
                {format(new Date(checklist.createdAt), 'Pp', { locale: fr })}
              </td>
              <td className={tdClass}>
                <div className="flex items-center justify-center gap-2">
                  <Link
                    href={`/checklist/${checklist.id}`}
                    className={cn(
                      buttonVariants({ variant: 'default' }),
                      'flex items-center gap-2'
                    )}
                  >
                    Voir
                    <FiEye className="text-xl" />
                  </Link>

                  <DeleteChecklist checklistId={checklist.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
