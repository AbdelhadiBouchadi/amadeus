'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnomalyCategory, SubcategoryDetail } from '@/types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createChecklist } from '@/lib/actions/checklist';
import { ChecklistFormValues, checklistSchema } from '@/lib/validator';
import { getSubcategoriesForCategory } from '@/constants';
import toast from 'react-hot-toast';
import { MultiCategorySelect } from './MultiCategorySelect';
import { MultiSubcategorySelect } from './MultiSubcategorySelect';
import SummaryCard from './SummaryCard';
import SubmitButton from '../SubmitButton';
import { Button } from '@/components/ui/button';
import { CheckCircle as CircleCheck, History } from 'lucide-react';
import AnomalyImagesUpload from './AnomalyImagesUploader';
import { useUploadThing } from '@/lib/uploadthing';
import SubcategoryDetailsList from './SubcategoryDetailsList';

const ChecklistForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [startTime] = useState(Date.now());

  const { startUpload } = useUploadThing('imageUploader');

  const form = useForm<ChecklistFormValues>({
    resolver: zodResolver(checklistSchema),
    defaultValues: {
      codeRoute: '',
      cofor: '',
      blNumber: '',
      reference: '',
      matricule: '',
      project: '',
      shift: '',
      providerName: '',
      shipmentType: 'NORMALE',
      deliveryType: 'CONFORME',
      conformityComment: '',
      categories: [],
      subcategories: [],
      subcategoryDetails: [],
      images: [],
    },
  });

  const selectedCategories = form.watch('categories');
  const selectedSubcategories = form.watch('subcategories');
  const subcategoryDetails = form.watch('subcategoryDetails') || [];
  const deliveryType = form.watch('deliveryType');

  useEffect(() => {
    if (deliveryType === 'CONFORME') {
      form.setValue('categories', []);
      form.setValue('subcategories', []);
      form.setValue('subcategoryDetails', []);
    }
  }, [deliveryType, form]);

  useEffect(() => {
    const existingDetails = new Set(
      subcategoryDetails.map((detail) => detail.subcategory)
    );

    const newDetails: SubcategoryDetail[] = [...subcategoryDetails];

    selectedSubcategories.forEach((subcategory) => {
      if (!existingDetails.has(subcategory)) {
        newDetails.push({
          subcategory,
          um: false,
          uc: false,
          ums: false,
          bl: false,
          aviexp: false,
          comment: '',
        });
      }
    });

    const filteredDetails = newDetails.filter((detail) =>
      selectedSubcategories.includes(detail.subcategory)
    );

    if (filteredDetails.length !== subcategoryDetails.length) {
      form.setValue('subcategoryDetails', filteredDetails);
    }
  }, [selectedSubcategories, form, subcategoryDetails]);

  const onSubmit = async (data: ChecklistFormValues) => {
    try {
      setIsSubmitting(true);

      let uploadedImageUrls = data.images || [];

      if (files.length > 0) {
        const uploadedImages = await startUpload(files);
        if (!uploadedImages) return;
        uploadedImageUrls = uploadedImages.map((img) => img.url);
      }

      const timeSpent = Math.floor((Date.now() - startTime) / 1000);

      const result = await createChecklist({
        ...data,
        images: uploadedImageUrls,
        timeSpent,
      });

      if (result.success) {
        form.reset();
        toast.success('Votre checklist a été créée avec succès');
      } else {
        console.error('Failed to submit checklist:', result.error);
        toast.error('Une erreur est survenue lors de la création.');
      }
    } catch (error) {
      console.error('Error submitting checklist:', error);
      toast.error('Erreur lors de la soumission du formulaire.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveCategory = (category: AnomalyCategory) => {
    const updatedCategories = selectedCategories.filter((c) => c !== category);
    form.setValue('categories', updatedCategories);

    const categorySubcategories = getSubcategoriesForCategory(category);
    const updatedSubcategories = selectedSubcategories.filter(
      (sub) => !categorySubcategories.includes(sub)
    );

    form.setValue('subcategories', updatedSubcategories);
  };

  const handleSubcategoryDetailsChange = (
    updatedDetails: SubcategoryDetail[]
  ) => {
    form.setValue('subcategoryDetails', updatedDetails);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-lg shadow-sm border border-subMain dark:border-border p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-6">Nouvelle Checklist</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <FormField
                  control={form.control}
                  name="project"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="font-semibold">Projet</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Entrez le nom du projet"
                          {...field}
                          className="border-subMain dark:border-border"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shift"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="font-semibold">Shift</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Entrez le shift"
                          {...field}
                          className="border-subMain dark:border-border"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="providerName"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="font-semibold">
                        Fournisseur
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Entrez le nom du fournisseur"
                          {...field}
                          className="border-subMain dark:border-border"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shipmentType"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="font-semibold">
                        Type d'expédition
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-subMain dark:border-border">
                            <SelectValue placeholder="Sélectionnez le type d'expédition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="NORMALE">Normale</SelectItem>
                          <SelectItem value="GROUPAGE">Groupage</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deliveryType"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="font-semibold">
                        Type de livraison
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-subMain dark:border-border">
                            <SelectValue placeholder="Sélectionnez le type de livraison" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CONFORME">Conforme</SelectItem>
                          <SelectItem value="NON_CONFORME">
                            Non Conforme
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="codeRoute"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="font-semibold">
                        Code Route
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Entrez le code route"
                          {...field}
                          className="border-subMain dark:border-border"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cofor"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="font-semibold">
                        COFOR (Code Fournisseur)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Entrez le code fournisseur"
                          {...field}
                          className="border-subMain dark:border-border"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="blNumber"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="font-semibold">Numéro BL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Entrez le numéro BL"
                          {...field}
                          className="border-subMain dark:border-border"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="font-semibold">Référence</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Entrez la référence"
                          {...field}
                          className="border-subMain dark:border-border"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="matricule"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel className="font-semibold">Matricule</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Entrez le matricule"
                          {...field}
                          className="border-subMain dark:border-border"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {deliveryType === 'CONFORME' && (
                  <FormField
                    control={form.control}
                    name="conformityComment"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="font-semibold">
                          Commentaire de conformité
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ajoutez un commentaire sur la conformité..."
                            {...field}
                            className="min-h-[100px] border-subMain dark:border-border"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                )}

                {deliveryType === 'NON_CONFORME' && (
                  <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel className="text-secondary-foreground font-semibold">
                          Catégories d'Anomalies
                        </FormLabel>
                        <FormControl>
                          <MultiCategorySelect
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>

            {deliveryType === 'NON_CONFORME' &&
              selectedCategories.length > 0 && (
                <div className="rounded-lg shadow-sm border border-subMain dark:border-border p-4 sm:p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Détails de l'Anomalie
                  </h3>

                  <FormField
                    control={form.control}
                    name="subcategories"
                    render={({ field }) => (
                      <FormItem className="mb-6">
                        <FormLabel>Sous-catégories</FormLabel>
                        <FormControl>
                          <MultiSubcategorySelect
                            value={field.value}
                            onChange={field.onChange}
                            categories={selectedCategories as AnomalyCategory[]}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  {selectedSubcategories.length > 0 && (
                    <>
                      <SummaryCard
                        categories={selectedCategories as AnomalyCategory[]}
                        subcategories={selectedSubcategories}
                      />

                      <div className="mt-6">
                        <h4 className="font-medium mb-3">
                          Détails des sous-catégories
                        </h4>
                        <FormField
                          control={form.control}
                          name="subcategoryDetails"
                          render={({ field }) => (
                            <FormItem>
                              <SubcategoryDetailsList
                                selectedCategories={
                                  selectedCategories as AnomalyCategory[]
                                }
                                selectedSubcategories={selectedSubcategories}
                                subcategoryDetails={field.value || []}
                                onDetailChange={handleSubcategoryDetailsChange}
                              />
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                          <FormItem className="mt-6">
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                              <AnomalyImagesUpload
                                onFieldChange={field.onChange}
                                imageUrls={field.value}
                                setFiles={setFiles}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
              )}

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => form.reset()}
                className="px-6 rounded-md w-full"
              >
                <History className="mr-2 size-5" />
                Réinitialiser
              </Button>
              <SubmitButton
                isLoading={isSubmitting}
                className="px-6 rounded-md w-full"
              >
                <CircleCheck className="mr-2 size-5" />
                Créer
              </SubmitButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChecklistForm;
