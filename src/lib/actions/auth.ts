'use server';

import { signIn, signOut } from '@/auth';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { comparePasswords, saltAndHashPassword } from '../utils';
import { UpdateUserProfileValues } from '../validator';
import { UserRole } from '@prisma/client';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: '/' });
  revalidatePath('/');
};

export const logout = async () => {
  await signOut({ redirectTo: '/' });
  revalidatePath('/');
};

export const loginWithCreds = async (formData: FormData): Promise<void> => {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password') as string,
    role: 'VISITOR',
    redirectTo: '/',
  };

  const existingUser = await getUserByEmail(formData.get('email') as string);

  if (!existingUser) {
    throw new Error("L'utilisateur n'existe pas");
  }

  // Check if hashedPassword is null
  if (!existingUser.hashedPassword) {
    throw new Error('No password found for the user.');
  }

  // Compare password with the stored hashed password
  const isPasswordCorrect = await comparePasswords(
    rawFormData.password,
    existingUser.hashedPassword
  );

  if (!isPasswordCorrect) {
    throw new Error('Incorrect password.');
  }

  try {
    await signIn('credentials', rawFormData);
  } catch (error: any) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          console.error('Invalid credentials!');
          break;
        default:
          console.error('Something went wrong!');
      }
    } else {
      throw error;
    }
  }

  revalidatePath('/');
};

export const registerUser = async (formData: FormData): Promise<void> => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const userId = formData.get('userId') as string;

  const hashedPassword = saltAndHashPassword(password);

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User already exists.');
  }

  // Create new user
  await db.user.create({
    data: {
      email,
      hashedPassword,
      firstName,
      lastName,
      userId,
    },
  });
};

export const updateUserProfile = async (
  userId: string,
  values: UpdateUserProfileValues
) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Remove password fields from update data
    const { currentPassword, newPassword, ...updateData } = values;

    // If changing password, verify current password
    if (currentPassword && newPassword) {
      if (!user.hashedPassword) {
        return { success: false, error: 'No password set for this account' };
      }

      const isPasswordValid = await comparePasswords(
        currentPassword,
        user.hashedPassword
      );

      if (!isPasswordValid) {
        return { success: false, error: 'Current password is incorrect' };
      }

      // Update the user with the new hashed password
      await db.user.update({
        where: { id: userId },
        data: {
          ...updateData,
          hashedPassword: saltAndHashPassword(newPassword),
        },
      });
    } else {
      // Update user without changing password
      await db.user.update({
        where: { id: userId },
        data: updateData,
      });
    }

    revalidatePath('/profile');
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error: 'Failed to update profile' };
  }
};

export async function getUsers() {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        userId: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
    });

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function getUserStats() {
  try {
    // Get all users with their roles
    const users = await db.user.findMany({
      select: {
        role: true,
      },
    });

    // Count users by role
    const stats = users.reduce(
      (acc, user) => {
        if (user.role === UserRole.ADMIN) {
          acc.admins++;
        } else if (user.role === UserRole.MONITOR) {
          acc.monitors++;
        } else if (user.role === UserRole.VISITOR) {
          acc.visitors++;
        }
        return acc;
      },
      { monitors: 0, visitors: 0, admins: 0 }
    );

    return stats;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

export async function deleteUser(id: string) {
  try {
    await db.user.delete({
      where: { id },
    });
    revalidatePath('/users');
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error: 'Failed to delete user' };
  }
}
