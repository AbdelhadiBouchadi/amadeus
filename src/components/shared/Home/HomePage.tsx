'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DashboardStats, AnomalyCategory } from '@/types';
import { Users, ClipboardCheck, AlertTriangle, TrendingUp } from 'lucide-react';
import { getCategoryColor } from '@/lib/utils';
import StatCard from './StatCard';
import DashboardAreaChart from './DashboardAreaChart';
import DashboardPieChart from './DashboardPieChart';
import UserRoleChart from './UserRoleChart';
import DashboardBarChart from './DashboardBarChart';
import RecentActivityCard from './RecentActivity';

interface HomePageProps {
  stats: DashboardStats;
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

const HomePage: React.FC<HomePageProps> = ({ stats }) => {
  // Calculate totals
  const totalUsers =
    stats.userStats.admins +
    stats.userStats.monitors +
    stats.userStats.visitors;

  // Get the top anomaly category
  const topCategory = Object.entries(stats.checklistStats.byCategory)
    .sort(([, a], [, b]) => b - a)
    .shift();

  const topCategoryName = topCategory
    ? (topCategory[0] as AnomalyCategory)
    : AnomalyCategory.EDI;
  const [bgColor, textColor] = getCategoryColor(topCategoryName);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full space-y-8"
    >
      <motion.h1 variants={item} className="text-xl font-semibold">
        Tableau de bord
      </motion.h1>

      {/* Stats Cards Row */}
      <motion.div
        variants={container}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={item}>
          <StatCard
            title="Total Checklists"
            value={stats.checklistStats.total.toString()}
            icon={ClipboardCheck}
            color={['bg-blue-500', 'text-blue-500']}
            description="Nombre total de checklists"
            change={{ value: 12, isPositive: true }}
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            title="Utilisateurs"
            value={totalUsers.toString()}
            icon={Users}
            color={['bg-purple-500', 'text-purple-500']}
            description="Utilisateurs enregistrés "
            change={{ value: 8, isPositive: true }}
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            title="Anomalies"
            value={topCategory ? topCategoryName : 'Aucune'}
            icon={AlertTriangle}
            color={[bgColor, textColor]}
            description={
              topCategory
                ? `Occurrences d'anomalie`
                : 'Aucune anomalie détectée'
            }
            change={{
              value: topCategory ? topCategory[1] : 0,
              isPositive: true,
            }}
          />
        </motion.div>

        <motion.div variants={item}>
          <StatCard
            title="Croissance mensuelle"
            value={`${Math.round(
              (stats.monthlyStats.checklists[new Date().getMonth()] /
                (stats.monthlyStats.checklists[new Date().getMonth() - 1] ||
                  1) -
                1) *
                100
            )}%`}
            icon={TrendingUp}
            color={['bg-green-500', 'text-green-500']}
            description="Checklists par rapport au mois dernier"
            change={{
              value: Math.round(
                (stats.monthlyStats.checklists[new Date().getMonth()] /
                  (stats.monthlyStats.checklists[new Date().getMonth() - 1] ||
                    1) -
                  1) *
                  100
              ),
              isPositive: true,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Charts Row 1 */}
      <motion.div
        variants={container}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div variants={item}>
          <DashboardAreaChart
            checklistsData={stats.monthlyStats.checklists}
            usersData={stats.monthlyStats.users}
          />
        </motion.div>

        <motion.div variants={item}>
          <DashboardPieChart data={stats.checklistStats.byCategory} />
        </motion.div>
      </motion.div>

      {/* Charts Row 2 */}
      <motion.div
        variants={container}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <motion.div variants={item}>
          <UserRoleChart data={stats.userStats} />
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <DashboardBarChart
            data={stats.monthlyStats.checklists}
            label="Checklists par mois"
            color="#3B82F6"
          />
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={item}>
        <RecentActivityCard checklists={stats.recentChecklists} />
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
