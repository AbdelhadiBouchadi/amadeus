import { UserProfile } from '@/components/shared/Users/UserProfile';
import { getUserById } from '@/lib/actions/auth';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { UserRole } from '@prisma/client';

export default async function UserPage({
  params,
}: {
  params: { userId: string };
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== UserRole.ADMIN) {
    redirect('/');
  }

  const user = await getUserById(params.userId);
  const sessionUser = await getUserById(session.user.id);

  if (!user || !sessionUser) {
    redirect('/users');
  }

  return <UserProfile user={user} sessionUser={sessionUser} />;
}
