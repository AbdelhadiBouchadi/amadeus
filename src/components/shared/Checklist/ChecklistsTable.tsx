'use client';

import { FiDownload, FiEye } from 'react-icons/fi';
import Link from 'next/link';
import { Button, buttonVariants } from '../../ui/button';
import {
  cn,
  exportToExcel,
  formatDeliveryType,
  formatShipmentType,
} from '../../../lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChecklistData } from '@/types';
import { DeleteChecklist } from './DeleteChecklist';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

interface ChecklistsTableProps {
  data: ChecklistData[];
}

export const ChecklistsTable: React.FC<ChecklistsTableProps> = ({ data }) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const thClass = 'text-center text-sm font-bold py-3 px-2 whitespace-nowrap';
  const tdClass = 'text-xs py-4 px-2 whitespace-nowrap text-center';

  const filteredData = data.filter((checklist) => {
    if (!startDate && !endDate) return true;

    const checklistDate = new Date(checklist.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return checklistDate >= start && checklistDate <= end;
    } else if (start) {
      return checklistDate >= start;
    } else if (end) {
      return checklistDate <= end;
    }

    return true;
  });

  const handleExport = () => {
    const exportData = filteredData.map((checklist) => ({
      ID: checklist.id.slice(0, 8),
      'Code Fournisseur': checklist.cofor,
      'Numéro BL': checklist.blNumber,
      Matricule: checklist.matricule,
      Projet: checklist.project,
      Livraison: formatDeliveryType(checklist.deliveryType),
      Remorque: formatShipmentType(checklist.shipmentType),
      'Créé par': `${checklist.createdBy.firstName} ${checklist.createdBy.lastName}`,
      'Créé le': format(new Date(checklist.createdAt), 'Pp', { locale: fr }),
    }));

    exportToExcel(exportData, `checklists-${format(new Date(), 'yyyy-MM-dd')}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-end justify-between">
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Date début</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-[240px] justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, 'PPP', { locale: fr })
                  ) : (
                    <span>Sélectionner une date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date fin</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-[240px] justify-start text-left font-normal',
                    !endDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? (
                    format(endDate, 'PPP', { locale: fr })
                  ) : (
                    <span>Sélectionner une date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button onClick={handleExport} className="flex items-center gap-2">
          <FiDownload />
          Exporter
        </Button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table-auto min-w-full">
          <thead className="rounded-md overflow-hidden">
            <tr>
              <th className={thClass}>#</th>
              <th className={thClass}>Code Fournisseur</th>
              <th className={thClass}>Numéro BL</th>
              <th className={thClass}>Matricule</th>
              <th className={thClass}>Projet</th>
              <th className={thClass}>Livraison</th>
              <th className={thClass}>Remorque</th>
              <th className={thClass}>Créé par</th>
              <th className={thClass}>Créé le</th>
              <th className={thClass}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((checklist) => (
              <tr
                key={checklist.id}
                className="border-b border-subMain dark:border-border hover:bg-greyed/20 transition"
              >
                <td className={tdClass}>{checklist.id.slice(0, 8)}</td>
                <td className={tdClass}>{checklist.cofor}</td>
                <td className={tdClass}>{checklist.blNumber}</td>
                <td className={tdClass}>{checklist.matricule}</td>
                <td className={tdClass}>{checklist.project}</td>
                <td className={tdClass}>
                  {formatDeliveryType(checklist.deliveryType)}
                </td>
                <td className={tdClass}>
                  {formatShipmentType(checklist.shipmentType)}
                </td>
                <td className={tdClass}>
                  <p className="font-medium ">
                    {checklist.createdBy.firstName}{' '}
                    {checklist.createdBy.lastName}
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
                        buttonVariants({ variant: 'default', size: 'icon' })
                      )}
                    >
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
    </div>
  );
};
