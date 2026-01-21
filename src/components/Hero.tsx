'use client';

import { useReducedMotion, useScrollAnimation } from '@/hooks/useAnimations';
import type { HeroProps } from '@/types/components';
import {
  AnimationType,
  cascadeIn,
  cascadeItem,
  slideInLeft,
} from '@/utils/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { TextEffects } from './texts/TextEffects';

export const Hero = memo<HeroProps>(function Hero({
  title = 'Desenvolvendo Comunidades, Transformando Vidas',
  subtitle = 'Associação de desenvolvimento sustentável comprometida com a transformação social através de projetos inovadores e parcerias estratégicas.',
  ctaText = 'Conheça nossos projetos',
  ctaLink = '/projects',
  className,
  animate = true,
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();

  // Hooks de animação devem ser chamados no nível superior
  const titleAnimation = useScrollAnimation(AnimationType.SLIDE_UP, undefined, {
    duration: 1.2,
    delay: 0.2,
  });

  const subtitleAnimation = useScrollAnimation(
    AnimationType.FADE_IN,
    undefined,
    {
      duration: 0.8,
      delay: 0.5,
    }
  );

  const buttonAnimation = useScrollAnimation(AnimationType.FADE_IN, undefined, {
    duration: 0.6,
    delay: 0.8,
  });

  const handleSmoothScroll = useMemo(
    () => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      const target = document.querySelector('#about');
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    },
    []
  );

  return (
    <section id='hero'>
      <div className='relative w-full overflow-hidden'>
        {/* Container com fundo colorido para simular o overlay na imagem */}
        <div className='relative h-[60vh] w-full bg-blue-950/40 md:h-screen'>
          {/* Imagem com overlay semi-transparente */}
          <div className='relative w-full'>
            <Image
              src='/hero.webp'
              alt='Header Image'
              width={1920}
              height={600}
              className='h-[60vh] w-full object-cover md:h-screen'
              priority
            />
            {/* Overlay colorido para dar o efeito de cor na imagem */}
            <div className='absolute inset-0 z-10 h-[60vh] bg-black/80 md:h-screen'></div>
          </div>

          {/* Conteúdo de texto centralizado */}
          <div className='absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center text-white'>
            {/* Título principal com animação otimizada */}
            <motion.div
              ref={titleAnimation.ref}
              variants={cascadeIn}
              initial='initial'
              animate={titleAnimation.controls.animate}
              viewport={{ once: true }}
              className='mt-[5vh] mb-2 flex items-center justify-center px-10 sm:mt-[14vh] md:mt-[16vh]'
            >
              <motion.h1
                variants={cascadeItem}
                className='text-4xl font-semibold text-white md:text-5xl lg:text-7xl'
              >
                Associação
              </motion.h1>
              <motion.span
                variants={cascadeItem}
                className='text-4xl font-bold md:text-5xl lg:text-7xl'
              >
                {' '}
                <TextEffects />
              </motion.span>
            </motion.div>

            {/* Subtítulo com animação */}
            <motion.div
              ref={subtitleAnimation.ref}
              {...slideInLeft}
              initial='initial'
              animate={subtitleAnimation.controls.animate}
              viewport={{ once: true }}
              className='mb-5 flex items-center justify-center'
            >
              <h2 className='text-xl font-medium text-white md:text-2xl lg:text-3xl'>
                Servindo a Sociedade
              </h2>
            </motion.div>

            {/* Botão com animação bounce */}
            <motion.div
              ref={buttonAnimation.ref}
              {...buttonAnimation.animation}
              initial='initial'
              animate={buttonAnimation.controls.animate}
              viewport={{ once: true }}
              className='mx-auto mt-5'
            >
              <Link
                href='#about'
                onClick={handleSmoothScroll}
                className='relative z-30 cursor-pointer rounded-full bg-blue-600 px-6 py-3 text-base font-light text-white transition-colors duration-300 hover:bg-blue-400 md:text-lg'
              >
                Saiba Mais
              </Link>
            </motion.div>
          </div>

          {/* Curva na parte inferior - ajustada para corresponder exatamente à imagem */}
          <div className='absolute right-0 -bottom-6 left-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 1440 120'
              className='h-28 w-full'
              preserveAspectRatio='none'
              style={{ display: 'block' }}
            >
              <path
                fill='white'
                d='M0,0 C240,120 1200,120 1440,0 L1440,120 L0,120 Z'
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
});
