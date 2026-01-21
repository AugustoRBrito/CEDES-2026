/**
 * Componentes lazy-loaded simplificados
 * Apenas componentes essenciais para evitar erros de importação
 */

import { createLazyComponent, SkeletonLoader } from '@/utils/lazy-loading';

// ==================== LAZY COMPONENTS ====================

/** Blog section - não crítico, carregar sob demanda */
export const LazyBlog = createLazyComponent(
  () => import('@/components/Blog').then(mod => ({ default: mod.Blog })),
  {
    fallback: (
      <section className='bg-gray-50 py-16'>
        <div className='container mx-auto px-4'>
          <SkeletonLoader
            height='h-12'
            rows={1}
            className='mx-auto mb-8 w-64'
          />
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {[1, 2, 3].map(i => (
              <div key={i} className='rounded-lg bg-white p-6 shadow-md'>
                <SkeletonLoader height='h-48' className='mb-4' />
                <SkeletonLoader height='h-6' className='mb-2' />
                <SkeletonLoader height='h-4' rows={3} />
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    delay: 300,
  }
);

/** Projetos section - carregar quando próximo ao viewport */
export const LazyProjetos = createLazyComponent(
  () =>
    import('@/components/Projetos').then(mod => ({ default: mod.Projetos })),
  {
    fallback: (
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <SkeletonLoader
            height='h-12'
            rows={1}
            className='mx-auto mb-12 w-80'
          />
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
            {[1, 2].map(i => (
              <div
                key={i}
                className='overflow-hidden rounded-lg bg-white shadow-lg'
              >
                <SkeletonLoader height='h-64' className='w-full' />
                <div className='p-6'>
                  <SkeletonLoader height='h-6' className='mb-3' />
                  <SkeletonLoader height='h-4' rows={4} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    delay: 200,
  }
);

/** WhatWeDo section - missão e valores */
export const LazyWhatWeDo = createLazyComponent(
  () =>
    import('@/components/WhatWeDo').then(mod => ({ default: mod.WhatWeDo })),
  {
    fallback: (
      <section className='bg-blue-50 py-16'>
        <div className='container mx-auto px-4'>
          <SkeletonLoader
            height='h-12'
            rows={1}
            className='mx-auto mb-12 w-72'
          />
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {[1, 2, 3].map(i => (
              <div key={i} className='rounded-lg bg-white p-8 shadow-md'>
                <SkeletonLoader height='h-16' className='mx-auto mb-6 w-16' />
                <SkeletonLoader height='h-6' className='mb-4' />
                <SkeletonLoader height='h-4' rows={3} />
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
    delay: 250,
  }
);

export default {
  LazyBlog,
  LazyProjetos,
  LazyWhatWeDo,
};
