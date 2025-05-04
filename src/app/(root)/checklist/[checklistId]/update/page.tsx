import UpdateChecklistForm from '@/components/shared/Checklist/UpdateChecklistForm';
import { getChecklist } from '@/lib/actions/checklist';
import { ChecklistData } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

const UpdateChecklistPage = async ({
  params,
}: {
  params: { checklistId: string };
}) => {
  const checklist = await getChecklist(params.checklistId);

  if (!checklist.data) return notFound();

  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          href={`/checklist/${checklist.data.id}`}
          className="border border-subMain dark:border-border rounded-lg py-3 px-4 text-md group"
        >
          <IoArrowBackOutline className="text-xl text-primary group-hover:-translate-x-2 transition-all duration-300" />
        </Link>
        <h1 className="sm:text-xl font-semibold">
          Modifier la checklist #{checklist.data.id.slice(0, 8)}
        </h1>
      </div>
      <div className="col-span-12 lg:col-span-8 rounded-xl border-[1px] p-6 my-8 border-subMain dark:border-border">
        <UpdateChecklistForm checklist={checklist.data as ChecklistData} />
      </div>
    </>
  );
};

export default UpdateChecklistPage;
