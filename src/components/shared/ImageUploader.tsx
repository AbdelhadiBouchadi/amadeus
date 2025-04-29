'use client';

import { useCallback, Dispatch, SetStateAction } from 'react';
import { useDropzone } from '@uploadthing/react/hooks';
import { generateClientDropzoneAccept } from 'uploadthing/client';
import { convertFileToUrl } from '@/lib/utils';
import { FiUploadCloud } from 'react-icons/fi';
import { XIcon } from 'lucide-react';

type FileUploaderProps = {
  onFieldChange: (urls: string[]) => void;
  imageUrls: string[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrls = [],
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
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
        className="px-6 lg:col-span-10 sm:col-span-8 col-span-12 pt-5 pb-6 border-2 border-primary border-dashed rounded-md cursor-pointer"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        <div className="w-full flex flex-col items-center justify-center">
          <span className="mx-auto flex justify-center">
            <FiUploadCloud className="text-3xl text-primary" />
          </span>
          <p className="text-sm mt-2">Placez l'image ici</p>
          <em className="text-xs text-gray-400">
            (Only *.jpeg and *.png images will be accepted)
          </em>
        </div>
      </div>

      {/* Image Previews */}
      <div className="flex flex-wrap gap-4 mt-4">
        {imageUrls.map((url, index) => (
          <div key={index} className="relative w-32 h-32">
            <img
              src={url}
              alt={`uploaded ${index}`}
              className="w-full h-full object-cover rounded-md"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:opacity-60 transition-all duration-300"
              onClick={() => removeImage(index)}
            >
              <XIcon className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
