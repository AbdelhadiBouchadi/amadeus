'use client';

import { MenuDatas } from '@/lib/data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IconType } from 'react-icons/lib';
import { UserButton } from './Users/UserButton';

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

const SidebarLink = ({ title, path, icon }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <Link
      href={path}
      className={`
            ${isActive ? 'bg-subMain' : ''}
            flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-subMain`}
    >
      {React.createElement(icon, {
        className: cn(
          'text-xl font-semibold hover:text-primary dark:hover:text-main group-hover:text-primary dark:group-hover:text-main',
          isActive ? 'text-primary dark:text-main' : 'text-secondary-foreground'
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
  );
};

const Sidebar = ({ user }: SidebarProps) => {
  return (
    <div className=" xl:shadow-lg py-6 px-4 xl:h-screen w-full border-r border-border flex flex-col justify-between">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          className="object-cover"
          width={200}
          height={200}
        />
      </Link>
      <div className="flex-colo gap-2 mt-6">
        {MenuDatas.map((item, index) => (
          <SidebarLink
            key={index}
            path={item.path}
            icon={item.icon}
            title={item.title}
          />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <UserButton name={user?.name} email={user?.email} image={user?.image} />
      </div>
    </div>
  );
};

export default Sidebar;
