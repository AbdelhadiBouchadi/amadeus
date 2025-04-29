'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserRole } from '@prisma/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from '@/lib/validator';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FileUploader } from '../ImageUploader';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import SubmitButton from '../SubmitButton';
import { useRouter } from 'next/navigation';
import { useUploadThing } from '@/lib/uploadthing';
import { updateUserProfile } from '@/lib/actions/auth';
import { Eye, EyeOff } from 'lucide-react';
import { formatUserRole } from '@/lib/utils';

interface UserProfileFormProps {
  user: User;
  sessionUser?: User;
}

export function UserProfileForm({ user, sessionUser }: UserProfileFormProps) {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(
    user.image ?? undefined
  );
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { startUpload } = useUploadThing('imageUploader');

  const form = useForm<UpdateUserProfileValues>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      userId: user.userId || '',
      email: user.email || '',
      image: user.image || undefined,
      role: user.role || UserRole.VISITOR,
    },
  });

  const handleFileChange = (urls: string[]) => {
    if (urls.length > 0) {
      setPreviewImageUrl(urls[0]);
      form.setValue('image', urls[0]);
    } else {
      setPreviewImageUrl(undefined);
      form.setValue('image', undefined);
    }
  };

  async function onSubmit(values: UpdateUserProfileValues) {
    try {
      let finalImage = values.image;

      if (files.length > 0) {
        const uploadedImages = await startUpload(files);
        if (uploadedImages && uploadedImages[0]) {
          finalImage = uploadedImages[0].url;
        }
      }

      const result = await updateUserProfile(user.id, {
        ...values,
        image: finalImage,
      });

      if (result.success) {
        toast.success('Profil a été mis à jour avec succès');
        router.refresh();
        setFiles([]);
        setShowPasswordFields(false);
      } else {
        toast.error(result.error || 'Une erreure est survenue');
      }
    } catch (error) {
      toast.error('Une erreure est survenue');
      console.error(error);
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image De Profil</FormLabel>
              <FormControl>
                <FileUploader
                  onFieldChange={handleFileChange}
                  imageUrls={previewImageUrl ? [previewImageUrl] : []}
                  setFiles={setFiles}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={sessionUser?.role !== UserRole.ADMIN}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(UserRole).map((role) => (
                      <SelectItem key={role} value={role}>
                        {formatUserRole(role)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setShowPasswordFields(!showPasswordFields)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showPasswordFields ? 'Annuler' : 'Changer le mot de passe'}
          </button>

          {showPasswordFields && (
            <>
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe actuel</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Mot de passe"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nouveau mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Nouveau mot de passe"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        <SubmitButton isLoading={form.formState.isSubmitting}>
          Sauvegarder
          <HiOutlineCheckCircle className="text-xl" />
        </SubmitButton>
      </form>
    </Form>
  );
}
