import { HiOutlineHome, HiOutlineUsers } from 'react-icons/hi';
import { AiOutlineSetting } from 'react-icons/ai';

export const MenuDatas = [
  {
    title: 'Acceuil',
    path: '/',
    icon: HiOutlineHome,
  },
  {
    title: 'Utilisateurs',
    path: '/users',
    icon: HiOutlineUsers,
  },
  {
    title: 'Paramètres',
    path: '/settings',
    icon: AiOutlineSetting,
  },
];
