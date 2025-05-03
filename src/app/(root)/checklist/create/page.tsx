import ChecklistForm from '@/components/shared/Checklist/ChecklistForm';
import Link from 'next/link';
import React from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

const page = () => {
  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          href="/checklist"
          className="border border-primary border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline className="text-xl" />
        </Link>
        <h1 className="sm:text-xl font-semibold">
          Créer une nouvelle checklist
        </h1>
      </div>
      <div className="col-span-12 lg:col-span-8 rounded-xl border-[1px] p-6 my-8 border-subMain dark:border-border">
        <ChecklistForm />
      </div>
    </>
  );
};

export default page;
