'use client';

import { FiEye } from 'react-icons/fi';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn, formatUserRole } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DeleteUser } from './DeleteUser';

type UserData = {
  id: string;
  userId: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  image: string | null;
  role: string | null;
  createdAt: Date;
};

interface UserTableProps {
  data: UserData[];
}

export const UserTable: React.FC<UserTableProps> = ({ data }) => {
  const thClass = 'text-center text-sm py-3 px-2 whitespace-nowrap font-bold';
  const tdClass = 'text-xs py-4 px-2 whitespace-nowrap text-center';

  return (
    <table className="table-auto w-full">
      <thead className="rounded-md overflow-hidden">
        <tr>
          <th className={thClass}>#</th>
          <th className={thClass}>Photo</th>
          <th className={thClass}>Nom</th>
          <th className={thClass}>Email</th>
          <th className={thClass}>Role</th>
          <th className={thClass}>Crée le</th>
          <th className={thClass}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr
            key={user.id}
            className="border-b border-subMain dark:border-border hover:bg-greyed/20 transition"
          >
            <td className={tdClass}>
              {user.userId ? (
                <span>{user.userId}</span>
              ) : (
                <span>{index + 1}</span>
              )}
            </td>
            <td className={tdClass}>
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.firstName || ''}
                  className="w-12 h-12 rounded-full object-cover border border-border mx-auto"
                />
              ) : (
                <span className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  {!user.firstName && !user.lastName ? (
                    user.email?.[0].toUpperCase()
                  ) : (
                    <span className="text-lg font-semibold">
                      {user.firstName?.[0].toUpperCase()}
                    </span>
                  )}
                </span>
              )}
            </td>
            <td className={tdClass}>
              <h4 className="text-sm font-medium capitalize">
                {!user.firstName && !user.lastName ? (
                  user.email
                ) : (
                  <span className="text-sm font-medium capitalize">
                    {user.lastName}
                  </span>
                )}
              </h4>
            </td>
            <td className={tdClass}>{user.email}</td>
            <td className={tdClass}>
              <span
                className={cn('py-1 px-4 bg-opacity-10 text-xs rounded-xl', {
                  'bg-subMain text-subMain': user.role === 'MONITOR',
                  'bg-orange-500 text-orange-500': user.role === 'VISITOR',
                  'bg-[#66B5A3] text-[#66B5A3]': user.role === 'ADMIN',
                })}
              >
                {formatUserRole(user.role!)}
              </span>
            </td>
            <td className={tdClass}>
              {format(new Date(user.createdAt), 'PP', { locale: fr })}
            </td>
            <td className={tdClass}>
              <div className="flex items-center justify-center gap-2">
                <Link
                  href={`/users/${user.id}`}
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'flex items-center gap-2'
                  )}
                >
                  Voir
                  <FiEye className="text-xl" />
                </Link>

                <DeleteUser userId={user.id} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
