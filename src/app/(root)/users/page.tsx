import { Suspense } from 'react';
import Loading from './loading';
import UsersPage from '@/components/shared/Users/UsersPage';
import { auth } from '@/auth';
import { UserRole } from '@prisma/client';
import { getUsers, getUserStats } from '@/lib/actions/auth';
import { AdminAccessOnly } from '@/components/shared/Users/AdminAccessOnly';

export const revalidate = 0;

export default async function Page() {
  const session = await auth();

  if (!session?.user || session.user.role !== UserRole.ADMIN) {
    return <AdminAccessOnly />;
  }

  const [users, stats] = await Promise.all([getUsers(), getUserStats()]);

  return (
    <Suspense fallback={<Loading />}>
      <UsersPage users={users} stats={stats} />
    </Suspense>
  );
}
