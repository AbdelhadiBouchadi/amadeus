'use client';

import { UserTable } from './UsersTable';
import React from 'react';
import { cn } from '@/lib/utils';
import { EyeIcon, Handshake, ShieldCheckIcon } from 'lucide-react';
import { motion } from 'framer-motion';

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

interface UsersPageProps {
  users: UserData[];
  stats: {
    monitors: number;
    visitors: number;
    admins: number;
  };
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const UsersPage = ({ users, stats }: UsersPageProps) => {
  const boxes = [
    {
      id: 1,
      title: 'Moniteurs',
      value: stats.monitors.toString(),
      color: ['bg-primary', 'text-primary'],
      icon: Handshake,
    },
    {
      id: 2,
      title: 'Visiteurs',
      value: stats.visitors.toString(),
      color: ['bg-orange-500', 'text-orange-500'],
      icon: EyeIcon,
    },
    {
      id: 3,
      title: 'Administrateurs',
      value: stats.admins.toString(),
      color: ['bg-[#66B5A3]', 'text-[#66B5A3]'],
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold"
      >
        Utilisateurs
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
      >
        {boxes.map((box) => (
          <motion.div
            key={box.id}
            variants={item}
            className="flex-btn gap-4 rounded-xl border-[1px] p-5 backdrop-blur-md border-subMain dark:border-border shadow-md"
            whileHover={{
              y: -5,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div className="w-3/4">
              <h2 className="text-sm font-bold uppercase">{box.title}</h2>
              <h2 className="text-xl my-6 font-medium">{box.value}</h2>
              <p className="text-xs text-main dark:text-subMain">
                Total des {box.title}
                <span className={cn('ml-2 text-lg', box.color[1])}>
                  {box.value}
                </span>
              </p>
            </div>
            <div
              className={`w-10 h-10 flex-colo rounded-md text-white dark:text-gray-900 text-md ${box.color[0]}`}
            >
              <box.icon />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="my-8 rounded-xl border-[1px] border-subMain dark:border-border p-5 shadow-md"
      >
        <div className="mt-8 w-full overflow-x-scroll">
          <UserTable data={users} />
        </div>
      </motion.div>
    </>
  );
};

export default UsersPage;
