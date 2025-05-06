import { UserRole, AnomalyCategory } from '@/types';
import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Adresse Email Invalide' }),
  password: z.string().min(6, {
    message: 'Le mot de passe doit comporter au moins 6 caractères',
  }),
});

export const signupFormSchema = z
  .object({
    userId: z.string().min(1, { message: "L'identifiant est requis" }),
    firstName: z.string().min(1, { message: 'Le nom est requis' }),
    lastName: z.string().min(1, { message: 'Le nom est requis' }),
    email: z.string().email({ message: 'Adresse email invalide' }),
    password: z.string().min(6, {
      message: 'Le mot de passe doit comporter au moins 6 caractères',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Confirmer le mot de passe doit comporter au moins 6 caractères',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe doivent être conformes',
    path: ['confirmPassword'],
  });

export const updateUserProfileSchema = z.object({
  userId: z.string().min(1, { message: "L'identifiant est requis" }),
  firstName: z
    .string()
    .min(2, 'Le prénom doit comporter au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit comporter au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(6, 'Le mot de passe doit comporter au moins 6 caractères')
    .optional(),
  image: z.string().optional(),
  role: z.nativeEnum(UserRole),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

const subcategoryDetailSchema = z.object({
  subcategory: z.string(),
  um: z.boolean().default(false),
  uc: z.boolean().default(false),
  ums: z.boolean().default(false),
  bl: z.boolean().default(false),
  aviexp: z.boolean().default(false),
  comment: z.string().optional(),
  // New fields for INCOHERENCE_CONSTITUTION_PALETTE_EDI
  referenceIncoherence: z.string().optional(),
  codeEmballageBL: z.string().optional(),
  codeEmballageLivre: z.string().optional(),
  quantite: z.string().optional(),
  numEtiquette: z.string().optional(),
});

export const checklistSchema = z
  .object({
    codeRoute: z.string().min(1, 'Le code route est obligatoire'),
    cofor: z.string().min(1, 'Le code fournisseur est obligatoire'),
    blNumber: z.string().min(1, 'Le numéro BL est obligatoire'),
    reference: z.string().min(1, 'La référence est obligatoire'),
    matricule: z.string().min(1, 'Le matricule est obligatoire'),
    project: z.string().min(1, 'Le projet est obligatoire'),
    shift: z.string().min(1, 'Le shift est obligatoire'),
    providerName: z.string().min(1, 'Le nom du fournisseur est obligatoire'),
    shipmentType: z.enum(['GROUPAGE', 'NORMALE']),
    deliveryType: z.enum(['CONFORME', 'NON_CONFORME']),
    conformityComment: z.string().optional(),
    categories: z.array(z.nativeEnum(AnomalyCategory)).default([]),
    subcategories: z.array(z.string()).default([]),
    subcategoryDetails: z.array(subcategoryDetailSchema).optional().default([]),
    images: z.array(z.string()).default([]),
  })
  .refine(
    (data) => {
      if (data.deliveryType === 'NON_CONFORME') {
        return data.categories.length > 0 && data.subcategories.length > 0;
      }
      return true;
    },
    {
      message:
        'Les catégories et sous-catégories sont requises pour une livraison non conforme',
      path: ['categories', 'subcategories'],
    }
  );

export type ChecklistFormValues = z.infer<typeof checklistSchema>;
