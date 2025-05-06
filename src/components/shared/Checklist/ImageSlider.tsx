'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageSliderProps {
  images: string[];
  onRemove: (index: number) => void;
}

export function ImageSlider({ images, onRemove }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-60 md:h-72 rounded-xl overflow-hidden">
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <Button
            type="button"
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            onClick={goToNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Remove button */}
      <Button
        type="button"
        onClick={() => onRemove(currentIndex)}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
      >
        <X className="h-4 w-4" />
      </Button>

      {/* Image counter */}
      <div className="absolute bottom-2 right-2 py-0.5 px-2 rounded-full bg-black/50 text-white text-xs backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Thumbnail navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-1.5">
          {images.map((_, idx) => (
            <Button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                currentIndex === idx
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/70'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
