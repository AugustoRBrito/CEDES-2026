/**
 * Utilitários para lazy loading otimizado
 * Fase 4: Performance e Otimização
 */

import { lazy, Suspense, type ComponentType, type ReactNode } from 'react';

// ==================== LOADING COMPONENTS ====================

/** Skeleton loader simples */
export function SkeletonLoader({
  className = '',
  height = 'h-32',
  rows = 1,
}: {
  readonly className?: string;
  readonly height?: string;
  readonly rows?: number;
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className={`mb-4 rounded-md bg-gray-200 ${height}`} />
      ))}
    </div>
  );
}

/** Loading spinner minimalista */
export function LoadingSpinner({
  size = 'md',
  className = '',
}: {
  readonly size?: 'sm' | 'md' | 'lg';
  readonly className?: string;
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`}
      />
    </div>
  );
}

/** Loading com texto */
export function LoadingWithText({
  text = 'Carregando...',
  className = '',
}: {
  readonly text?: string;
  readonly className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-8 ${className}`}
    >
      <LoadingSpinner size='md' className='mb-4' />
      <p className='text-sm text-gray-600'>{text}</p>
    </div>
  );
}

// ==================== LAZY LOADING UTILITIES ====================

/** Configurações para diferentes tipos de loading */
export interface LazyLoadConfig {
  readonly fallback?: ReactNode;
  readonly delay?: number;
  readonly retryAttempts?: number;
}

/** Wrapper para lazy loading com fallback customizado */
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  config: LazyLoadConfig = {}
): ComponentType<React.ComponentProps<T>> {
  const LazyComponent = lazy(importFn);

  return function LazyWrapper(props) {
    const {
      fallback = <LoadingSpinner size='lg' className='py-8' />,
      delay = 0,
    } = config;

    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/** HOC para lazy loading com erro boundary */
export function withLazyLoading<T extends ComponentType<any>>(
  Component: T,
  config: LazyLoadConfig & {
    readonly errorFallback?: ReactNode;
  } = {}
): ComponentType<React.ComponentProps<T>> {
  return function LazyLoadedComponent(props) {
    const {
      fallback = <SkeletonLoader rows={3} className='mx-auto max-w-4xl px-4' />,
      errorFallback = (
        <div className='py-8 text-center'>
          <p className='text-red-600'>Erro ao carregar componente</p>
          <button
            onClick={() => window.location.reload()}
            className='mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            Tentar novamente
          </button>
        </div>
      ),
    } = config;

    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };
}

// ==================== INTERSECTION OBSERVER LAZY LOADING ====================

/** Hook para lazy loading baseado em visibilidade */
export function useIntersectionLazyLoad(
  options: IntersectionObserverInit = {}
) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry?.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
        ...options,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasLoaded, options]);

  return { targetRef, isVisible, hasLoaded };
}

/** Componente para lazy loading por visibilidade */
export function LazySection({
  children,
  fallback = <SkeletonLoader />,
  className = '',
  ...options
}: {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly className?: string;
} & IntersectionObserverInit) {
  const { targetRef, isVisible } = useIntersectionLazyLoad(options);

  return (
    <div ref={targetRef} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
}

// ==================== PRELOAD UTILITIES ====================

/** Preload de componente lazy */
export function preloadComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): void {
  // Preload em idle time
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => {
      importFn().catch(console.error);
    });
  } else {
    // Fallback para browsers sem requestIdleCallback
    setTimeout(() => {
      importFn().catch(console.error);
    }, 1000);
  }
}

/** Hook para preload inteligente */
export function usePreloadOnHover<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) {
  const [isPreloaded, setIsPreloaded] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (!isPreloaded) {
      importFn()
        .then(() => setIsPreloaded(true))
        .catch(console.error);
    }
  }, [importFn, isPreloaded]);

  return { handleMouseEnter, isPreloaded };
}

// ==================== PROGRESSIVE LOADING ====================

/** Carregamento progressivo de listas */
export function ProgressiveList<T>({
  items,
  renderItem,
  batchSize = 5,
  className = '',
  loadingComponent = <LoadingSpinner />,
}: {
  readonly items: readonly T[];
  readonly renderItem: (item: T, index: number) => ReactNode;
  readonly batchSize?: number;
  readonly className?: string;
  readonly loadingComponent?: ReactNode;
}) {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(() => {
    if (isLoading || visibleCount >= items.length) return;

    setIsLoading(true);

    // Simular delay para UX suave
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + batchSize, items.length));
      setIsLoading(false);
    }, 300);
  }, [batchSize, isLoading, items.length, visibleCount]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <div className={className}>
      {visibleItems.map(renderItem)}

      {hasMore && (
        <div className='mt-8 text-center'>
          {isLoading ? (
            loadingComponent
          ) : (
            <button
              onClick={loadMore}
              className='rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700'
            >
              Carregar mais
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ==================== IMPORTS ====================

import { useCallback, useEffect, useRef, useState } from 'react';
