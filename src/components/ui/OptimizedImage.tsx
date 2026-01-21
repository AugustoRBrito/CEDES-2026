'use client';
import Image, { ImageProps } from 'next/image';
import type { CSSProperties } from 'react';
import React, { useEffect, useState } from 'react';

// Função para verificar suporte a WebP
const checkWebPSupport = (): Promise<boolean> => {
  return new Promise(resolve => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    const webp = new (globalThis as any).Image();
    webp.onload = webp.onerror = () => {
      resolve(webp.height === 2);
    };
    webp.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// Placeholders padrão
const DEFAULT_BLUR_DATA_URL = {
  webp: 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
  jpeg: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8A0XqFvVN+Vm2kYVJDYhKJDhvBAAASRj85x9f/2Q==',
};

interface OptimizedImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  src: string;
  webpSrc?: string;
  fallbackSrc?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  enableWebP?: boolean;
  showLoader?: boolean;
  errorFallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  webpSrc,
  fallbackSrc,
  objectFit = 'cover',
  enableWebP = true,
  showLoader = true,
  errorFallback,
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  quality = 75,
  sizes,
  loading = 'lazy',
  unoptimized = false,
  className = '',
  style,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isWebpSupported, setIsWebpSupported] = useState(false);

  // Verificar suporte a WebP
  useEffect(() => {
    if (enableWebP) {
      checkWebPSupport().then(setIsWebpSupported);
    }
  }, [enableWebP]);

  // Determinar a fonte da imagem
  const optimizedSrc = enableWebP && isWebpSupported && webpSrc ? webpSrc : src;

  // Blur data URL para placeholder
  const getBlurDataURL = (): string | undefined => {
    if (placeholder !== 'blur') return undefined;

    return (
      blurDataURL ||
      (isWebpSupported
        ? DEFAULT_BLUR_DATA_URL.webp
        : DEFAULT_BLUR_DATA_URL.jpeg)
    );
  };

  // Sizes responsivos padrão
  const responsiveSizes =
    sizes ||
    (fill
      ? '100vw'
      : width && typeof width === 'number' && width > 768
        ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        : '(max-width: 768px) 100vw, 50vw');

  const imageStyles: CSSProperties = {
    objectFit,
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoading ? 0 : 1,
    ...style,
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    if (errorFallback) {
      return <>{errorFallback}</>;
    }

    return (
      <div
        className={`flex items-center justify-center bg-gray-200 ${className}`}
        style={{
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
          minHeight: typeof height === 'number' ? height : 200,
        }}
        {...props}
      >
        <div className='text-center text-gray-500'>
          <svg
            className='mx-auto mb-2 h-12 w-12'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
          <p className='text-xs'>Erro ao carregar imagem</p>
        </div>
      </div>
    );
  }

  // Construir props do Image com tipagem correta
  const imageProps: ImageProps = {
    src: optimizedSrc,
    alt,
    priority,
    sizes: responsiveSizes,
    quality,
    style: imageStyles,
    loading: priority ? 'eager' : loading,
    unoptimized,
    onLoad: handleLoad,
    onError: handleError,
    className,
    ...(fill
      ? { fill: true }
      : { width: width as number, height: height as number }),
    ...(placeholder === 'blur' && getBlurDataURL()
      ? {
          placeholder: 'blur' as const,
          blurDataURL: getBlurDataURL()!,
        }
      : { placeholder: 'empty' as const }),
  };

  return (
    <div className='relative overflow-hidden' {...props}>
      <Image {...imageProps} />

      {/* Loading overlay */}
      {showLoader && isLoading && (
        <div className='absolute inset-0 flex animate-pulse items-center justify-center bg-gray-100'>
          <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
        </div>
      )}
    </div>
  );
};

// Componentes especializados
export const HeroImage: React.FC<
  Omit<OptimizedImageProps, 'fill' | 'priority'>
> = props => (
  <OptimizedImage
    {...props}
    fill
    priority
    objectFit='cover'
    placeholder='blur'
    quality={90}
    sizes='100vw'
  />
);

export const ThumbnailImage: React.FC<OptimizedImageProps> = props => (
  <OptimizedImage
    {...props}
    objectFit='cover'
    placeholder='blur'
    quality={75}
    loading='lazy'
  />
);

export const BackgroundImage: React.FC<
  Omit<OptimizedImageProps, 'fill'>
> = props => (
  <OptimizedImage
    {...props}
    fill
    objectFit='cover'
    placeholder='blur'
    quality={85}
    sizes='100vw'
  />
);

export default OptimizedImage;
