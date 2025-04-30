import React from 'react';
import Drawer from 'react-modern-drawer';

interface MainDrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  children: React.ReactNode;
}

function MainDrawer({ isOpen, toggleDrawer, children }: MainDrawerProps) {
  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="left"
      className="overflow-y-scroll"
    >
      {children}
    </Drawer>
  );
}

export default MainDrawer;
