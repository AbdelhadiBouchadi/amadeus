'use client';

import { useTransition } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FiTrash2 } from 'react-icons/fi';
import { deleteChecklist } from '@/lib/actions/checklist';

interface DeleteChecklistProps {
  checklistId: string;
  className?: string;
}

export const DeleteChecklist: React.FC<DeleteChecklistProps> = ({
  checklistId,
  className,
}) => {
  let [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          buttonVariants({ variant: 'destructive' }),
          'flex items-center gap-2  text-white ',
          className
        )}
      >
        Supprimer
        <FiTrash2 />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action ne peut pas être annulée. Cela supprimera
            définitivement la checklist et toutes les données associées.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteChecklist(checklistId);
                router.refresh();
              })
            }
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isPending ? 'En cours...' : 'Supprimer'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
