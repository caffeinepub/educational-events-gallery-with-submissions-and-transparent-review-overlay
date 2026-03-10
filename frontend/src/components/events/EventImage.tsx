import { type ExternalBlob } from '../../backend';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface EventImageProps {
  image: ExternalBlob;
  alt: string;
}

export function EventImage({ image, alt }: EventImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const imageUrl = image.getDirectURL();

  return (
    <>
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </>
  );
}
