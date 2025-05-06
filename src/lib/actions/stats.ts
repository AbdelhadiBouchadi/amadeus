'use server';

import { db } from '@/db';
import { auth } from '@/auth';
import { getChecklistStats } from './checklist';
import { getUserStats } from './auth';
import {
  AnomalyCategory,
  DashboardStats,
  ChecklistData,
  SubcategoryDetail,
  ShipmentType,
  DeliveryType,
  TimeSpentStats,
} from '@/types';

async function getMonthlyTimeSpentStats() {
  const currentYear = new Date().getFullYear();
  const monthlyStats: TimeSpentStats = {
    conforme: Array(12).fill(0),
    nonConforme: Array(12).fill(0),
  };

  for (let month = 0; month < 12; month++) {
    const startDate = new Date(currentYear, month, 1);
    const endDate = new Date(currentYear, month + 1, 0);

    const conformeStats = await db.checklist.aggregate({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        deliveryType: 'CONFORME',
      },
      _avg: {
        timeSpent: true,
      },
    });

    const nonConformeStats = await db.checklist.aggregate({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        deliveryType: 'NON_CONFORME',
      },
      _avg: {
        timeSpent: true,
      },
    });

    monthlyStats.conforme[month] = conformeStats._avg.timeSpent || 0;
    monthlyStats.nonConforme[month] = nonConformeStats._avg.timeSpent || 0;
  }

  return monthlyStats;
}

async function getTopCoforWithAnomalies() {
  const coforStats = await db.checklist.groupBy({
    by: ['cofor'],
    where: {
      deliveryType: 'NON_CONFORME',
    },
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: 'desc',
      },
    },
    take: 10,
  });

  return coforStats.map((stat) => ({
    cofor: stat.cofor,
    count: stat._count.id,
  }));
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    // Get user and checklist stats
    const [userStatsResult, checklistStatsResult] = await Promise.all([
      getUserStats(),
      getChecklistStats(),
    ]);

    // Get monthly statistics
    const currentYear = new Date().getFullYear();
    const monthlyUsersPromises = [];
    const monthlyChecklistsPromises = [];

    // Get data for each month (0-11)
    for (let month = 0; month < 12; month++) {
      const startDate = new Date(currentYear, month, 1);
      const endDate = new Date(currentYear, month + 1, 0);

      // Format dates for database query
      const startDateStr = startDate.toISOString();
      const endDateStr = endDate.toISOString();

      // Query for users created in this month
      const usersPromise = db.user.count({
        where: {
          createdAt: {
            gte: startDateStr,
            lte: endDateStr,
          },
        },
      });

      // Query for checklists created in this month
      const checklistsPromise = db.checklist.count({
        where: {
          createdAt: {
            gte: startDateStr,
            lte: endDateStr,
          },
        },
      });

      monthlyUsersPromises.push(usersPromise);
      monthlyChecklistsPromises.push(checklistsPromise);
    }

    // Wait for all monthly queries to complete
    const [monthlyUsers, monthlyChecklists] = await Promise.all([
      Promise.all(monthlyUsersPromises),
      Promise.all(monthlyChecklistsPromises),
    ]);

    // Get recent checklists
    const recentChecklistsData = await db.checklist.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        subcategoryDetails: true,
      },
    });

    // Transform Prisma types to our application types
    const recentChecklists: ChecklistData[] = recentChecklistsData.map(
      (checklist) => ({
        id: checklist.id,
        codeRoute: checklist.codeRoute,
        cofor: checklist.cofor,
        blNumber: checklist.blNumber,
        reference: checklist.reference,
        matricule: checklist.matricule,
        project: checklist.project,
        shift: checklist.shift,
        providerName: checklist.providerName,
        shipmentType: checklist.shipmentType as ShipmentType,
        deliveryType: checklist.deliveryType as DeliveryType,
        conformityComment: checklist.conformityComment || undefined,
        categories: checklist.categories as AnomalyCategory[],
        subcategories: checklist.subcategories,
        subcategoryDetails: checklist.subcategoryDetails as SubcategoryDetail[],
        images: checklist.images,
        userId: checklist.userId,
        createdBy: {
          id: checklist.createdBy.id,
          firstName: checklist.createdBy.firstName || null,
          lastName: checklist.createdBy.lastName || null,
          email: checklist.createdBy.email || null,
        },
        timeSpent: checklist.timeSpent || undefined,
        createdAt: checklist.createdAt,
        updatedAt: checklist.updatedAt,
      })
    );

    // Initialize default category stats
    const defaultCategoryStats = Object.values(AnomalyCategory).reduce(
      (acc, category) => {
        acc[category] = 0;
        return acc;
      },
      {} as Record<AnomalyCategory, number>
    );

    // Ensure we have a valid ChecklistStats object
    const checklistStats = {
      total: checklistStatsResult.success
        ? checklistStatsResult.data?.total ?? 0
        : 0,
      byCategory: checklistStatsResult.success
        ? checklistStatsResult.data?.byCategory ?? defaultCategoryStats
        : defaultCategoryStats,
    };

    const [timeSpentStats, coforStats] = await Promise.all([
      getMonthlyTimeSpentStats(),
      getTopCoforWithAnomalies(),
    ]);

    return {
      userStats: userStatsResult,
      checklistStats,
      monthlyStats: {
        users: monthlyUsers,
        checklists: monthlyChecklists,
        timeSpent: timeSpentStats,
      },
      coforStats,
      recentChecklists,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    // Return default empty stats with proper types
    const defaultCategoryStats = Object.values(AnomalyCategory).reduce(
      (acc, category) => {
        acc[category] = 0;
        return acc;
      },
      {} as Record<AnomalyCategory, number>
    );

    return {
      userStats: { monitors: 0, visitors: 0, admins: 0 },
      checklistStats: {
        total: 0,
        byCategory: defaultCategoryStats,
      },
      monthlyStats: {
        users: Array(12).fill(0),
        checklists: Array(12).fill(0),
        timeSpent: {
          conforme: Array(12).fill(0),
          nonConforme: Array(12).fill(0),
        },
      },
      recentChecklists: [],
      coforStats: [],
    };
  }
}
