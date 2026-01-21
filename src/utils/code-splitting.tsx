'use client';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';

// Tipos para code splitting
interface DynamicImportOptions {
  loading?: () => React.ReactElement;
  ssr?: boolean;
}

// Função helper para criar componentes dinâmicos
export const createDynamicComponent = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: DynamicImportOptions = {}
) => {
  const {
    loading = () => (
      <div className='flex items-center justify-center p-8'>
        <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
      </div>
    ),
    ssr = false,
  } = options;

  return dynamic(importFn, {
    loading: loading,
    ssr,
  });
};

// Componente para lazy loading simples
export const LazyComponent: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({
  children,
  fallback = (
    <div className='flex items-center justify-center p-4'>
      <div className='h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600'></div>
    </div>
  ),
}) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

// Wrapper para Suspense com fallback customizável
interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const SuspenseWrapper: React.FC<SuspenseWrapperProps> = ({
  children,
  fallback = (
    <div className='flex min-h-[200px] items-center justify-center'>
      <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600'></div>
    </div>
  ),
}) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

// Hook para preload de componentes
export const usePreloadComponent = (
  componentLoader: () => Promise<any>,
  condition: boolean = true
) => {
  React.useEffect(() => {
    if (condition) {
      const timer = setTimeout(() => {
        componentLoader().catch(() => {
          // Silently handle preload errors
        });
      }, 100); // Small delay to not block initial render

      return () => clearTimeout(timer);
    }
    // Return undefined when condition is false
    return undefined;
  }, [componentLoader, condition]);
};

// Utility para code splitting baseado em rota
export const RouteBasedCodeSplitting = {
  Home: createDynamicComponent(
    () => import('../../app/page'),
    { ssr: true } // SSR para página inicial
  ),

  Projects: createDynamicComponent(() => import('../../app/projects/page'), {
    ssr: false,
  }),

  Transparency: createDynamicComponent(
    () => import('../../app/transparency/page'),
    { ssr: false }
  ),
};

// Componente para bundle splitting inteligente
interface IntelligentSplitProps {
  children: React.ReactNode;
  priority?: 'high' | 'medium' | 'low';
  viewport?: boolean; // Only load when in viewport
}

export const IntelligentSplit: React.FC<IntelligentSplitProps> = ({
  children,
  priority = 'medium',
  viewport = false,
}) => {
  const [shouldLoad, setShouldLoad] = React.useState(!viewport);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (viewport && elementRef.current) {
      const observer = new IntersectionObserver(
        entries => {
          const entry = entries[0];
          if (entry && entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0.1,
          rootMargin: priority === 'high' ? '200px' : '100px',
        }
      );

      observer.observe(elementRef.current);
      return () => observer.disconnect();
    }
    // Return undefined when conditions are not met
    return undefined;
  }, [viewport, priority]);

  if (viewport && !shouldLoad) {
    return (
      <div
        ref={elementRef}
        className='flex min-h-[100px] items-center justify-center'
      >
        <div className='text-sm text-gray-400'>Carregando...</div>
      </div>
    );
  }

  return <SuspenseWrapper>{children}</SuspenseWrapper>;
};

export default {
  createDynamicComponent,
  SuspenseWrapper,
  LazyComponent,
  usePreloadComponent,
  IntelligentSplit,
};
