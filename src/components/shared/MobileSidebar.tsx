'use client';

import { MenuDatas } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { IconType } from 'react-icons/lib';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { UserButton } from './Users/UserButton';

interface MobileSidebarProps {
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
  onItemClick?: () => void;
}

const SidebarLink = ({ title, path, icon, onItemClick }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <Link
      href={path}
      className={`
            ${isActive ? 'bg-subMain' : ''}
            flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-subMain`}
      onClick={onItemClick}
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

const MobileSidebar = ({ user }: MobileSidebarProps) => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="size-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 w-[300px] bg-gradient-to-br from-main/20 via-subMain to-main/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 backdrop-blur-sm"
      >
        <div className="py-6 px-4 h-full flex flex-col justify-between">
          <Link
            href="/"
            className="flex justify-center items-center"
            onClick={handleLinkClick}
          >
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
                onItemClick={handleLinkClick}
              />
            ))}
          </div>
          <div className="flex justify-center items-center">
            <UserButton
              name={user?.name}
              email={user?.email}
              image={user?.image}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
