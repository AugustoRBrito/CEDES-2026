'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function CadesHero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  return (
    <section className='relative overflow-hidden'>
      <div className='relative h-[60vh] w-full bg-gray-100 md:h-[80vh]'>
        <Image
          src='/sesc/hero-sesc.webp' // Replace with the actual image path
          alt='Hero Sesc'
          fill
          className='w-full object-cover'
          priority
        />
        <div className='absolute inset-0 z-10 h-[60vh] bg-black/40 md:h-[80vh]'></div>
        <div className='absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center text-white'>
          <motion.div
            initial='initial'
            whileInView='animate'
            viewport={{ once: true }}
          >
            <motion.h1 {...fadeInUp} className='text-4xl font-bold md:text-6xl'>
              DESENVOLVIMENTO COMUNITÁRIO
            </motion.h1>
            <motion.p {...fadeInUp} className='mt-4 text-lg md:text-2xl'>
              O Sesc atua para fortalecer o capital social e a capacidade de
              organização dos grupos.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
