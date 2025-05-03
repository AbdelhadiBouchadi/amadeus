import { HiOutlineHome, HiOutlineUsers } from 'react-icons/hi';
import { AiOutlineSetting } from 'react-icons/ai';
import { ClipboardCheck } from 'lucide-react';

export const MenuDatas = [
  {
    title: 'Acceuil',
    path: '/',
    icon: HiOutlineHome,
  },
  {
    title: 'Check-List',
    path: '/checklist',
    icon: ClipboardCheck,
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
