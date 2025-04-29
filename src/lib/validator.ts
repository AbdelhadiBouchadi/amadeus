import { UserRole } from '@prisma/client';
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
