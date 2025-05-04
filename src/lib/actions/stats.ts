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
} from '@/types';

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
        categories: checklist.categories as AnomalyCategory[],
        subcategories: checklist.subcategories,
        subcategoryDetails: checklist.subcategoryDetails as SubcategoryDetail[],
        images: checklist.images,
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

    return {
      userStats: userStatsResult,
      checklistStats,
      monthlyStats: {
        users: monthlyUsers,
        checklists: monthlyChecklists,
      },
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
      },
      recentChecklists: [],
    };
  }
}
