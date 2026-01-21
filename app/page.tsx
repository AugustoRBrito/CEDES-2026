'use client';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { memo, useEffect } from 'react';

// Critical components (load immediately)
import { About } from '@/components/About';
import { Hero } from '@/components/Hero';

// Non-critical components (lazy load)
import { LazyBlog, LazyProjetos, LazyWhatWeDo } from '@/components/lazy';

// Performance utilities
import { IntelligentSplit } from '../src/utils/code-splitting-clean';

const Home = memo(() => {
  useEffect(() => {
    const initAos = async () => {
      await import('aos');
      AOS.init({
        duration: 1000,
        easing: 'ease',
        once: true,
        anchorPlacement: 'top-bottom',
      });
    };
    initAos();
  }, []);

  return (
    <main className='w-full overflow-x-hidden bg-neutral-200'>
      {/* Hero Section - Critical, load immediately */}
      <Hero />

      {/* About Section - Critical, load immediately */}
      <About />

      {/* Our Mission Section - Lazy load with viewport detection */}
      <IntelligentSplit viewport priority='medium'>
        <LazyWhatWeDo />
      </IntelligentSplit>

      {/* Projects Section - Lazy load with viewport detection */}
      <IntelligentSplit viewport priority='medium'>
        <LazyProjetos />
      </IntelligentSplit>

      {/* Blog Section - Lazy load, lower priority */}
      <IntelligentSplit viewport priority='low'>
        <LazyBlog />
      </IntelligentSplit>
    </main>
  );
});

Home.displayName = 'HomePage';

export default Home;
