'use client';

import React from 'react';
import { ChecklistsTable } from './ChecklistsTable';
import { cn, formatCategory, getCategoryColor } from '../../../lib/utils';
import { motion } from 'framer-motion';
import { ChecklistData, ChecklistStats, AnomalyCategory } from '../../../types';
import { ClipboardCheck, List, AlertTriangle, Plus } from 'lucide-react';

interface ChecklistsPageProps {
  checklists: ChecklistData[];
  stats: ChecklistStats;
  isAdmin: boolean;
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

const ChecklistsPage: React.FC<ChecklistsPageProps> = ({
  checklists,
  stats,
  isAdmin,
}) => {
  // Get the top categories for display in statistics
  const topCategories = Object.entries(stats.byCategory)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 3)
    .map(([category]) => category as AnomalyCategory);

  // Create stat boxes for display
  const statBoxes = [
    {
      id: 1,
      title: 'Total Checklists',
      value: stats.total.toString(),
      color: ['bg-primary', 'text-primary'],
      icon: ClipboardCheck,
    },
    ...topCategories.map((category, index) => ({
      id: index + 2,
      title: formatCategory(category),
      value: stats.byCategory[category].toString(),
      color: getCategoryColor(category),
      icon: category === AnomalyCategory.EDI ? List : AlertTriangle,
    })),
  ];

  return (
    <>
      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        href="/checklist/create"
        className="w-16 h-16 border border-border z-50 bg-primary text-white rounded-full flex-colo fixed bottom-8 right-12 shadow-2xl"
      >
        <Plus className="size-8 text-primary-foreground" />
      </motion.a>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold"
      >
        {isAdmin ? 'Toutes les Checklists' : 'Mes Checklists'}
      </motion.h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
      >
        {statBoxes.map((box) => (
          <motion.div
            key={box.id}
            variants={item}
            className="flex-btn gap-4 rounded-xl border-[1px] p-5 backdrop-blur-md border-subMain dark:border-border shadow-md"
            whileHover={{
              y: -5,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="w-3/4">
              <h2 className="text-sm font-bold uppercase">{box.title}</h2>
              <h2 className="text-xl my-4 font-medium">{box.value}</h2>
              <p className="text-xs text-main dark:text-subMain">
                Total {box.title}
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
        <style jsx global>{`
          :root {
            --edi-bg: rgba(59, 130, 246, 0.1);
            --edi-text: rgb(59, 130, 246);
            --expedition-bg: rgba(249, 115, 22, 0.1);
            --expedition-text: rgb(249, 115, 22);
            --etiquettage-bg: rgba(102, 181, 163, 0.1);
            --etiquettage-text: rgb(102, 181, 163);
            --etiquettage-palette-homogene-bg: rgba(168, 85, 247, 0.1);
            --etiquettage-palette-homogene-text: rgb(168, 85, 247);
            --etiquettage-palette-heterogene-bg: rgba(234, 179, 8, 0.1);
            --etiquettage-palette-heterogene-text: rgb(234, 179, 8);
            --paletisation-bg: rgba(239, 68, 68, 0.1);
            --paletisation-text: rgb(239, 68, 68);
          }
        `}</style>
        <div className="mt-4 w-full overflow-x-auto">
          <ChecklistsTable data={checklists} />
        </div>
      </motion.div>
    </>
  );
};

export default ChecklistsPage;
