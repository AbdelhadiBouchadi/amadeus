'use client';

import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { UploadDropzone } from '@/lib/uploadthing';
import { X, Upload, Image as ImageIcon, CloudUpload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImageSlider } from './ImageSlider';
import { cn, convertFileToUrl } from '@/lib/utils';
import { useDropzone } from '@uploadthing/react';
import { generateClientDropzoneAccept } from 'uploadthing/client';

interface AnomalyImagesUploadProps {
  onFieldChange: (urls: string[]) => void;
  imageUrls: string[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

export default function AnomalyImagesUpload({
  imageUrls,
  onFieldChange,
  setFiles,
}: AnomalyImagesUploadProps) {
  // Keep track of which URLs are temporary previews vs permanent uploads
  const [tempPreviewUrls, setTempPreviewUrls] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

      // Create preview URLs for the dropped files
      const newPreviewUrls = acceptedFiles.map((file) =>
        convertFileToUrl(file)
      );

      // Track these as temporary preview URLs
      setTempPreviewUrls((prev) => [...prev, ...newPreviewUrls]);

      // Add the preview URLs to the field value
      onFieldChange([...imageUrls, ...newPreviewUrls]);
    },
    [imageUrls, onFieldChange, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']),
    multiple: true,
  });

  const removeImage = (index: number) => {
    const urlToRemove = imageUrls[index];
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    onFieldChange(newImageUrls);

    // If it's a temp preview URL, remove it from that list too
    if (tempPreviewUrls.includes(urlToRemove)) {
      setTempPreviewUrls((prev) => prev.filter((url) => url !== urlToRemove));
    }

    setFiles((prevFiles) => {
      // Only remove file if it corresponds to a temp preview
      if (tempPreviewUrls.includes(urlToRemove)) {
        const newFiles = [...prevFiles];
        // Find the index of the file that matches this URL
        const fileIndex =
          newImageUrls.length >= index ? index : prevFiles.length - 1;
        if (fileIndex >= 0) {
          newFiles.splice(fileIndex, 1);
        }
        return newFiles;
      }
      return prevFiles;
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div
        {...getRootProps()}
        className="flex justify-center items-center bg-greyed/20 dark:bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border border-subMain dark:border-border cursor-pointer flex-col rounded-xl h-72"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        <div className="flex justify-center items-center flex-col py-5 text-gray-500">
          <CloudUpload className="size-12 text-main/80" />
          <h3 className="mb-2 mt-2">Placez vos images ici</h3>
          <p className="mb-4">SVG, PNG, JPG</p>
          <Button
            type="button"
            className="bg-gray-300 dark:bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg rounded-xl border border-subMain dark:border-border my-4 hover:bg-gray-400 "
            variant="outline"
          >
            Choisir à partir de l'appareil
          </Button>
        </div>
      </div>

      {imageUrls.length > 0 && (
        <div className="flex flex-col gap-4">
          <ImageSlider images={imageUrls} onRemove={removeImage} />
        </div>
      )}
    </div>
  );
}
