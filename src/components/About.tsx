import { useReducedMotion, useScrollAnimation } from '@/hooks/useAnimations';
import type { AboutProps } from '@/types/components';
import {
  AnimationType,
  fadeInUp,
  scaleInDelayed,
  slideInRight,
} from '@/utils/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';

export const About = memo<AboutProps>(function About({
  title = 'Sobre a CADES',
  content,
  imageUrl = '/hero.webp',
  stats = [],
  className,
  animate = true,
  ...props
}) {
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const titleAnimation = useScrollAnimation(AnimationType.FADE_IN, undefined, {
    duration: 0.8,
  });

  const textAnimation = useScrollAnimation(AnimationType.SLIDE_UP, undefined, {
    duration: 0.6,
    delay: 0.2,
  });

  const imageAnimation = useScrollAnimation(AnimationType.FADE_IN, undefined, {
    duration: 1.0,
    delay: 0.4,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id='about'
      className='m-5 rounded-lg border border-neutral-200 bg-neutral-100 py-10 shadow-lg'
    >
      <div className='container mx-auto grid items-center gap-10 overflow-hidden px-4 md:grid-cols-2'>
        <motion.div ref={titleAnimation.ref} className='space-y-6'>
          <motion.h2
            {...fadeInUp}
            initial='initial'
            animate={titleAnimation.controls.animate}
            viewport={{ once: true }}
            className={`font-bold text-gray-800 ${
              isMobile ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'
            }`}
          >
            Sobre a <span className='text-red-600'>CADES</span>
          </motion.h2>

          <motion.p
            ref={textAnimation.ref}
            {...slideInRight}
            initial='initial'
            animate={textAnimation.controls.animate}
            viewport={{ once: true }}
            className='text-justify leading-relaxed wrap-break-word text-gray-700'
          >
            A Associação CADES (Associação Cultural, Ambiental, Desportiva,
            Educacional e Social), é uma entidade sem fins lucrativos, que vem
            atuando desde a sua criação em 2010 na promoção de ações visando
            promover a cidadania, autonomia econômica, saúde, esporte e lazer
            visando o desenvolvimento das pessoas da comunidade no entorno de
            sua sede no bairro do Guamá em Belém.
          </motion.p>
        </motion.div>

        <motion.div
          ref={imageAnimation.ref}
          {...scaleInDelayed}
          initial='initial'
          animate={imageAnimation.controls.animate}
          viewport={{ once: true }}
        >
          <div
            className={`my-4 space-y-4 rounded-lg bg-transparent py-4 text-center shadow-md shadow-blue-500 ${
              isMobile ? 'w-full' : ''
            }`}
          >
            <div className='mx-auto'>
              <Image
                src='/logo/LogoMarca.webp'
                alt='Sobre a CADES'
                width={isMobile ? 350 : 500}
                height={isMobile ? 300 : 400}
                className='mx-auto h-auto max-w-full rounded-lg px-4 md:px-0'
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});
