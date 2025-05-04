'use server';

import { db } from '@/db';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { AnomalyCategory, SubcategoryDetail } from '@/types';

interface CreateChecklistInput {
  codeRoute: string;
  cofor: string;
  blNumber: string;
  reference: string;
  matricule: string;
  categories: AnomalyCategory[];
  subcategories: string[];
  subcategoryDetails: SubcategoryDetail[];
  images: string[];
  timeSpent: number;
}

export async function createChecklist(data: CreateChecklistInput) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error('Unauthorized');

    const checklist = await db.checklist.create({
      data: {
        codeRoute: data.codeRoute,
        cofor: data.cofor,
        blNumber: data.blNumber,
        reference: data.reference,
        matricule: data.matricule,
        categories: data.categories,
        subcategories: data.subcategories,
        images: data.images || [],
        userId: session.user.id,
        timeSpent: data.timeSpent,
        subcategoryDetails: {
          create: data.subcategoryDetails.map((detail) => ({
            subcategory: detail.subcategory,
            um: detail.um,
            uc: detail.uc,
            ums: detail.ums,
            bl: detail.bl,
            aviexp: detail.aviexp,
            comment: detail.comment,
            // New fields for INCOHERENCE_CONSTITUTION_PALETTE_EDI
            referenceIncoherence: detail.referenceIncoherence,
            codeEmballageBL: detail.codeEmballageBL,
            codeEmballageLivre: detail.codeEmballageLivre,
            quantite: detail.quantite,
            numEtiquette: detail.numEtiquette,
          })),
        },
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

    revalidatePath('/checklists');
    return { success: true, data: checklist };
  } catch (error) {
    console.error('Error creating checklist:', error);
    return { success: false, error: 'Failed to create checklist' };
  }
}

export async function updateChecklist(
  id: string,
  data: Partial<CreateChecklistInput>
) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error('Unauthorized');

    // First, delete existing subcategory details
    if (data.subcategoryDetails) {
      await db.subcategoryDetail.deleteMany({
        where: { checklistId: id },
      });
    }

    const checklist = await db.checklist.update({
      where: { id },
      data: {
        codeRoute: data.codeRoute,
        cofor: data.cofor,
        blNumber: data.blNumber,
        reference: data.reference,
        matricule: data.matricule,
        categories: data.categories,
        subcategories: data.subcategories,
        images: data.images,
        subcategoryDetails: data.subcategoryDetails
          ? {
              create: data.subcategoryDetails.map((detail) => ({
                subcategory: detail.subcategory,
                um: detail.um,
                uc: detail.uc,
                ums: detail.ums,
                bl: detail.bl,
                aviexp: detail.aviexp,
                comment: detail.comment,
                // New fields for INCOHERENCE_CONSTITUTION_PALETTE_EDI
                referenceIncoherence: detail.referenceIncoherence,
                codeEmballageBL: detail.codeEmballageBL,
                codeEmballageLivre: detail.codeEmballageLivre,
                quantite: detail.quantite,
                numEtiquette: detail.numEtiquette,
              })),
            }
          : undefined,
      },
    });

    revalidatePath('/checklists');
    return { success: true, data: checklist };
  } catch (error) {
    console.error('Error updating checklist:', error);
    return { success: false, error: 'Failed to update checklist' };
  }
}

export async function deleteChecklist(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error('Unauthorized');

    await db.checklist.delete({
      where: { id },
    });

    revalidatePath('/checklists');
    return { success: true };
  } catch (error) {
    console.error('Error deleting checklist:', error);
    return { success: false, error: 'Failed to delete checklist' };
  }
}

export async function getChecklist(id: string) {
  try {
    const checklist = await db.checklist.findUnique({
      where: { id },
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

    return { success: true, data: checklist };
  } catch (error) {
    console.error('Error fetching checklist:', error);
    return { success: false, error: 'Failed to fetch checklist' };
  }
}

export async function getChecklists() {
  try {
    const checklists = await db.checklist.findMany({
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { success: true, data: checklists };
  } catch (error) {
    console.error('Error fetching checklists:', error);
    return { success: false, error: 'Failed to fetch checklists' };
  }
}

export async function getChecklistStats() {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error('Unauthorized');

    const isAdmin = session.user.role === 'ADMIN';

    // Query checklists based on user role
    const checklists = await db.checklist.findMany({
      where: isAdmin ? {} : { userId: session.user.id },
      select: {
        categories: true,
      },
    });

    // Initialize stats object with all categories set to 0
    const categoryStats = Object.values(AnomalyCategory).reduce(
      (acc, category) => {
        acc[category] = 0;
        return acc;
      },
      {} as Record<AnomalyCategory, number>
    );

    // Count occurrences of each category
    checklists.forEach((checklist) => {
      checklist.categories.forEach((category) => {
        categoryStats[category as AnomalyCategory]++;
      });
    });

    return {
      success: true,
      data: {
        total: checklists.length,
        byCategory: categoryStats,
      },
    };
  } catch (error) {
    console.error('Error fetching checklist stats:', error);
    return {
      success: false,
      error: 'Failed to fetch checklist statistics',
    };
  }
}
