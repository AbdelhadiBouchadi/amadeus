'use client';

import { MenuDatas } from '@/lib/data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IconType } from 'react-icons/lib';
import { UserButton } from './Users/UserButton';
import { motion } from 'framer-motion';

interface SidebarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

interface SidebarLinkProps {
  title: string;
  path: string;
  icon: IconType;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { x: -20, opacity: 0 },
  show: { x: 0, opacity: 1 },
};

const SidebarLink = ({ title, path, icon }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className="w-full"
    >
      <Link
        href={path}
        scroll={false}
        className={`
            ${isActive ? 'bg-subMain' : ''}
            flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-subMain`}
      >
        {React.createElement(icon, {
          className: cn(
            'text-xl font-semibold hover:text-primary dark:hover:text-main group-hover:text-primary dark:group-hover:text-main',
            isActive
              ? 'text-primary dark:text-main'
              : 'text-secondary-foreground'
          ),
        })}
        <p
          className={`text-sm font-semibold group-hover:text-primary dark:group-hover:text-main ${
            isActive
              ? 'text-primary dark:text-main '
              : 'text-secondary-foreground'
          }`}
        >
          {title}
        </p>
      </Link>
    </motion.div>
  );
};

const Sidebar = ({ user }: SidebarProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className=" xl:shadow-lg py-6 px-4 h-screen w-full border-r border-subMain dark:border-border flex flex-col justify-between"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.png"
            alt="logo"
            className="object-cover"
            width={200}
            height={200}
          />
        </Link>
      </motion.div>
      <motion.div variants={container} className="flex-colo gap-2 mt-6">
        {MenuDatas.map((item, index) => (
          <SidebarLink
            key={index}
            path={item.path}
            icon={item.icon}
            title={item.title}
          />
        ))}
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex justify-center items-center"
      >
        <UserButton name={user?.name} email={user?.email} image={user?.image} />
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
