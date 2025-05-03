'use client';

import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { UploadDropzone } from '@/lib/uploadthing';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
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
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

      // Create preview URLs for the dropped files
      const newImageUrls = acceptedFiles.map((file) => convertFileToUrl(file));
      onFieldChange([...imageUrls, ...newImageUrls]);
    },
    [imageUrls, onFieldChange, setFiles]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(['image/*']),
    multiple: true,
  });

  const removeImage = (index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    onFieldChange(newImageUrls);

    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div
        {...getRootProps()}
        className="flex justify-center items-center bg-gray-100/20 dark:bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border cursor-pointer flex-col rounded-xl h-72"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        <div className="flex justify-center items-center flex-col py-5 text-gray-500">
          <img src="/upload.svg" width={77} height={77} alt="file upload" />
          <h3 className="mb-2 mt-2">Placez vos images ici</h3>
          <p className="mb-4">SVG, PNG, JPG</p>
          <Button
            type="button"
            className="bg-gray-100/20 dark:bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl border border-subMain dark:border-border my-4"
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
