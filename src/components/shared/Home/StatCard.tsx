'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: [string, string]; // [bgColor, textColor]
  description?: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  description,
  change,
}) => {
  return (
    <motion.div
      className="flex-btn gap-4 rounded-xl border-[1px] p-5 backdrop-blur-md border-subMain dark:border-border shadow-md h-[200px]"
      whileHover={{
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="w-3/4 flex flex-col justify-between h-full">
        <h2 className="text-sm font-bold uppercase truncate">{title}</h2>
        <h2 className="text-xl font-medium truncate">{value}</h2>
        <p className="text-xs text-main dark:text-subMain">
          {description || `Total ${title}`}
          {change && (
            <span
              className={cn(
                'ml-2 text-lg',
                change.isPositive ? 'text-green-500' : 'text-red-500'
              )}
            >
              {change.isPositive ? '+' : '-'}
              {Math.abs(change.value)}%
            </span>
          )}
        </p>
      </div>
      <div
        className={`w-10 h-10 flex-colo rounded-md text-white dark:text-gray-900 text-md ${color[0]}`}
      >
        <Icon />
      </div>
    </motion.div>
  );
};

export default StatCard;
