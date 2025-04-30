'use client';

import React from 'react';
import { BiMenu } from 'react-icons/bi';
import { UserButton } from './Users/UserButton';
import MenuDrawer from './MenuDrawer';

interface HeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

function Header({ user }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      {isOpen && <MenuDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />}

      <div className="xl:w-5/6 w-full bg-dry grid md:grid-cols-2 grid-cols-12 items-center bg-opacity-95 fixed top-0 z-40 px-4 xs:pl-8">
        <div className="md:col-span-1 col-span-10 flex gap-4 items-center md:py-0 py-4">
          <button
            onClick={toggleDrawer}
            className="block xl:hidden border text-2xl bg-greyed w-16 md:w-12 h-12 rounded-md flex-colo text-textGray transitions hover:bg-border"
          >
            <BiMenu />
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
