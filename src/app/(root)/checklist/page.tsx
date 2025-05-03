import { Suspense } from 'react';
import Loading from './loading';
import { auth } from '@/auth';
import { getChecklists, getChecklistStats } from '@/lib/actions/checklist';
import ChecklistsPage from '@/components/shared/Checklist/ChecklistsPage';
import { redirect } from 'next/navigation';
import { ChecklistData } from '@/types';

export const revalidate = 0;

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  const isAdmin = session.user.role === 'ADMIN';

  // If admin, get all checklists; otherwise, get only the user's checklists
  const [checklistsResponse, statsResponse] = await Promise.all([
    getChecklists(),
    getChecklistStats(),
  ]);

  // Handle potential errors
  if (!checklistsResponse.success || !checklistsResponse.data) {
    // You could redirect to an error page or show error UI
    throw new Error(
      checklistsResponse.error || 'Failed to fetch checklist data'
    );
  }

  if (!statsResponse.success || !statsResponse.data) {
    throw new Error(
      statsResponse.error || 'Failed to fetch checklist statistics'
    );
  }

  const allChecklists = checklistsResponse.data as unknown as ChecklistData[];
  const stats = statsResponse.data;

  // Filter checklists by user if not admin
  const filteredChecklists = isAdmin
    ? allChecklists
    : allChecklists.filter(
        (checklist) => checklist.createdBy.id === session?.user?.id
      );

  return (
    <Suspense fallback={<Loading />}>
      <ChecklistsPage
        checklists={filteredChecklists}
        stats={stats}
        isAdmin={isAdmin}
      />
    </Suspense>
  );
}
