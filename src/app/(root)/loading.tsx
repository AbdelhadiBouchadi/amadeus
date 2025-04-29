'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div className="w-full grid sm:grid-cols-3 grid-cols-1 gap-4">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="rounded-xl border-[1px] border-border p-5 shadow-sm"
          >
            <div className="flex gap-4 items-center">
              <Skeleton className="w-10 h-10 rounded-md" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="grid grid-cols-8 gap-4 mt-4 py-5 px-8 items-center rounded-xl shadow-md">
              <div className="col-span-5">
                <Skeleton className="h-[100px] w-full" />
              </div>
              <div className="flex flex-col gap-4 col-span-3">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
        <div className="xl:col-span-8 w-full">
          <div className="rounded-xl border-[1px] border-border relative xl:mt-6 overflow-hidden">
            <Skeleton className="w-full h-72" />
            <div className="space-y-4 py-5 md:px-12 px-6 absolute top-0 bottom-0 left-0 right-0 bg-subMain bg-opacity-10 flex flex-col justify-center">
              <Skeleton className="h-8 w-96" />
              <Skeleton className="h-12 w-96" />
            </div>
          </div>
          <div className="mt-6 rounded-xl border-[1px] border-border p-5">
            <div className="flex-btn gap-2">
              <Skeleton className="h-6 w-40" />
              <div className="flex gap-4 items-center">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
            <div className="mt-4">
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
