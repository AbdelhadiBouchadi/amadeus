import React from 'react';
import MainDrawer from './MainDrawer';
import Sidebar from './Sidebar';

interface MainMenuProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

function MenuDrawer({ isOpen, toggleDrawer, user }: MainMenuProps) {
  return (
    <MainDrawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
      <Sidebar user={user} />
    </MainDrawer>
  );
}

export default MenuDrawer;
