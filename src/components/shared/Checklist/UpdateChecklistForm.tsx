'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnomalyCategory, ChecklistData, SubcategoryDetail } from '@/types';
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
import { updateChecklist } from '@/lib/actions/checklist';
import { ChecklistFormValues, checklistSchema } from '@/lib/validator';
import { getSubcategoriesForCategory } from '@/constants';
import toast from 'react-hot-toast';
import { MultiCategorySelect } from './MultiCategorySelect';
import { MultiSubcategorySelect } from './MultiSubcategorySelect';
import SummaryCard from './SummaryCard';
import SubmitButton from '../SubmitButton';
import { Button } from '@/components/ui/button';
import { CheckCircle as CircleCheck, History } from 'lucide-react';
import { useUploadThing } from '@/lib/uploadthing';
import SubcategoryDetailsList from './SubcategoryDetailsList';
import { useRouter } from 'next/navigation';
import { isBlobUrl } from '@/lib/utils';
import AnomalyImagesUpload from './AnomalyImagesUploader';

interface UpdateChecklistFormProps {
  checklist: ChecklistData;
}

const UpdateChecklistForm: React.FC<UpdateChecklistFormProps> = ({
  checklist,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader');

  const form = useForm<ChecklistFormValues>({
    resolver: zodResolver(checklistSchema),
    defaultValues: {
      codeRoute: checklist.codeRoute,
      cofor: checklist.cofor,
      blNumber: checklist.blNumber,
      reference: checklist.reference,
      matricule: checklist.matricule,
      project: checklist.project,
      shift: checklist.shift,
      providerName: checklist.providerName,
      shipmentType: checklist.shipmentType,
      deliveryType: checklist.deliveryType,
      conformityComment: checklist.conformityComment || '',
      categories: checklist.categories,
      subcategories: checklist.subcategories || [],
      subcategoryDetails: checklist.subcategoryDetails?.map((detail) => ({
        subcategory: detail.subcategory,
        um: detail.um || false,
        uc: detail.uc || false,
        ums: detail.ums || false,
        bl: detail.bl || false,
        aviexp: detail.aviexp || false,
        comment: detail.comment || '',
        referenceIncoherence: detail.referenceIncoherence || '',
        codeEmballageBL: detail.codeEmballageBL || '',
        codeEmballageLivre: detail.codeEmballageLivre || '',
        quantite: detail.quantite || '',
        numEtiquette: detail.numEtiquette || '',
      })),
      images: checklist.images || [],
    },
  });

  const selectedCategories = form.watch('categories') || [];
  const selectedSubcategories = form.watch('subcategories') || [];
  const deliveryType = form.watch('deliveryType');

  useEffect(() => {
    if (deliveryType === 'CONFORME') {
      form.setValue('categories', []);
      form.setValue('subcategories', []);
      form.setValue('subcategoryDetails', []);
      form.setValue('images', []);
    }
  }, [deliveryType, form]);

  useEffect(() => {
    if (selectedSubcategories.length === 0) {
      form.setValue('subcategoryDetails', [], { shouldValidate: true });
      return;
    }

    const currentDetails = form.getValues('subcategoryDetails') || [];
    const existingDetails = new Map(
      currentDetails.map((detail) => [detail.subcategory, detail])
    );

    const newDetails = selectedSubcategories.map((subcategory) => {
      const existing = existingDetails.get(subcategory);
      if (existing) {
        return existing;
      }
      return {
        subcategory,
        um: false,
        uc: false,
        ums: false,
        bl: false,
        aviexp: false,
        comment: '',
        referenceIncoherence: '',
        codeEmballageBL: '',
        codeEmballageLivre: '',
        quantite: '',
        numEtiquette: '',
      };
    });

    form.setValue('subcategoryDetails', newDetails, { shouldValidate: true });
  }, [selectedSubcategories, form]);

  const onSubmit = async (data: ChecklistFormValues) => {
    try {
      setIsSubmitting(true);

      const permanentImageUrls = data.images.filter((url) => !isBlobUrl(url));
      let finalImageUrls = [...permanentImageUrls];

      if (files.length > 0) {
        const uploadedImages = await startUpload(files);
        if (uploadedImages) {
          finalImageUrls = [
            ...finalImageUrls,
            ...uploadedImages.map((img) => img.url),
          ];
        }
      }

      const formattedSubcategoryDetails =
        data.subcategoryDetails?.map((detail) => ({
          ...detail,
          um: detail.um || false,
          uc: detail.uc || false,
          ums: detail.ums || false,
          bl: detail.bl || false,
          aviexp: detail.aviexp || false,
          comment: detail.comment || '',
          referenceIncoherence: detail.referenceIncoherence || '',
          codeEmballageBL: detail.codeEmballageBL || '',
          codeEmballageLivre: detail.codeEmballageLivre || '',
          quantite: detail.quantite || '',
          numEtiquette: detail.numEtiquette || '',
        })) || [];

      const formattedData = {
        ...data,
        images: finalImageUrls,
        subcategories: data.subcategories || [],
        subcategoryDetails: formattedSubcategoryDetails,
      };

      const result = await updateChecklist(checklist.id, formattedData);

      if (result.success) {
        toast.success('Checklist mise à jour avec succès');
        router.push(`/checklist/${checklist.id}`);
      } else {
        console.error('Failed to update checklist:', result.error);
        toast.error('Une erreur est survenue lors de la mise à jour.');
      }
    } catch (error) {
      console.error('Error updating checklist:', error);
      toast.error('Erreur lors de la mise à jour du formulaire.');
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
    form.setValue('subcategoryDetails', updatedDetails, {
      shouldValidate: true,
    });
  };

  return (
    <div className="min-h-screen sm:p-6">
      <div className="max-w-5xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="rounded-lg shadow-sm border border-subMain dark:border-border p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-6">
                Modifier la Checklist
              </h2>

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
                          className="border-subMain dark:border-border"
                          {...field}
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
                          className="border-subMain dark:border-border"
                          {...field}
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
                          className="border-subMain dark:border-border"
                          {...field}
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
                          className="border-subMain dark:border-border"
                          {...field}
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
                          className="border-subMain dark:border-border"
                          {...field}
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
                  <h3 className="text-lg font-medium mb-4">
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
                            onChange={(value) => {
                              field.onChange(value);
                              form.trigger('subcategories');
                            }}
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
                variant="destructive"
                onClick={() => router.back()}
                className="px-6 rounded-md w-full"
              >
                <History className="mr-2 size-5" />
                Annuler
              </Button>
              <SubmitButton
                isLoading={isSubmitting}
                className="px-6 rounded-md w-full"
              >
                <CircleCheck className="mr-2 size-5" />
                Mettre à jour
              </SubmitButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateChecklistForm;
