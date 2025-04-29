import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { UserProfileForm } from '@/components/shared/Users/UserProfileForm';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Paramètres de profil</h1>
        <div className="rounded-lg shadow p-6">
          <UserProfileForm user={user} />
        </div>
      </div>
    </div>
  );
}
