/**
 * Hooks personalizados para animações com Framer Motion
 * Fase 3: Sistema avançado de hooks para animações
 */

import { useInView } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';
import type { AnimationConfig, AnimationDirection } from '../utils/animations';
import {
  AnimationType,
  createAnimationByType,
  createTransition,
} from '../utils/animations';

// Schema para configurações de scroll animation
const ScrollAnimationConfigSchema = z.object({
  threshold: z.number().min(0).max(1).optional(),
  triggerOnce: z.boolean().optional(),
  rootMargin: z.string().optional(),
});

export type ScrollAnimationConfig = z.infer<typeof ScrollAnimationConfigSchema>;

// Schema para configurações de parallax
const ParallaxConfigSchema = z.object({
  speed: z.number().min(-2).max(2).optional(),
  direction: z.enum(['up', 'down', 'left', 'right']).optional(),
  enabled: z.boolean().optional(),
});

export type ParallaxConfig = z.infer<typeof ParallaxConfigSchema>;

/**
 * Hook para animações baseadas em scroll com Intersection Observer
 */
export function useScrollAnimation(
  type: AnimationType = AnimationType.FADE_IN,
  direction?: AnimationDirection,
  config?: ScrollAnimationConfig & AnimationConfig
) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Validar configuração
  const validatedConfig = useMemo(() => {
    try {
      return ScrollAnimationConfigSchema.parse(config || {});
    } catch {
      return { threshold: 0.1, triggerOnce: true };
    }
  }, [config]);

  const isInView = useInView(ref, {
    once: validatedConfig.triggerOnce ?? true,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const animation = useMemo(() => {
    return createAnimationByType(type, direction, config);
  }, [type, direction, config]);

  return {
    ref,
    isInView: validatedConfig.triggerOnce ? hasAnimated : isInView,
    animation,
    controls: {
      animate: (validatedConfig.triggerOnce ? hasAnimated : isInView)
        ? 'animate'
        : 'initial',
    },
  };
}

/**
 * Hook para efeito parallax com validação Zod
 */
export function useParallax(config: ParallaxConfig = {}) {
  const [scrollY, setScrollY] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  // Validar configuração
  const validatedConfig = useMemo(() => {
    try {
      return ParallaxConfigSchema.parse(config);
    } catch {
      return { speed: 0.5, direction: 'up' as const, enabled: true };
    }
  }, [config]);

  useEffect(() => {
    if (!validatedConfig.enabled) return;

    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

    return undefined;
  }, [validatedConfig.enabled]);

  const transform = useMemo(() => {
    if (!validatedConfig.enabled) return undefined;

    const offset = scrollY * (validatedConfig.speed || 0.5);

    switch (validatedConfig.direction) {
      case 'up':
        return `translateY(-${offset}px)`;
      case 'down':
        return `translateY(${offset}px)`;
      case 'left':
        return `translateX(-${offset}px)`;
      case 'right':
        return `translateX(${offset}px)`;
      default:
        return `translateY(-${offset}px)`;
    }
  }, [scrollY, validatedConfig]);

  return {
    ref: elementRef,
    transform,
    style: transform ? { transform } : undefined,
  };
}

/**
 * Hook para detectar preferências de movimento reduzido
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook para animações de hover responsivas
 */
export function useHoverAnimation(config: AnimationConfig = {}) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const animations = useMemo(() => {
    const transition = createTransition(config);

    return {
      whileHover: prefersReducedMotion
        ? {}
        : {
            scale: 1.05,
            transition,
          },
      whileTap: prefersReducedMotion
        ? {}
        : {
            scale: 0.95,
            transition: { ...transition, duration: 0.1 },
          },
    };
  }, [config, prefersReducedMotion]);

  return {
    isHovered,
    setIsHovered,
    animations,
    handlers: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    },
  };
}

/**
 * Hook para animações de página com transições suaves
 */
export function usePageTransition(
  type: 'fade' | 'slide' | 'scale' = 'fade',
  direction?: AnimationDirection
) {
  const prefersReducedMotion = useReducedMotion();

  const variants = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      };
    }

    const baseTransition = createTransition({
      duration: 0.3,
    });

    switch (type) {
      case 'slide':
        const slideDistance = 50;
        const slideConfig =
          direction === 'left'
            ? { x: -slideDistance }
            : direction === 'right'
              ? { x: slideDistance }
              : direction === 'down'
                ? { y: -slideDistance }
                : { y: slideDistance }; // up (default)

        return {
          initial: { opacity: 0, ...slideConfig },
          animate: { opacity: 1, x: 0, y: 0, transition: baseTransition },
          exit: { opacity: 0, ...slideConfig, transition: baseTransition },
        };

      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1, transition: baseTransition },
          exit: { opacity: 0, scale: 0.9, transition: baseTransition },
        };

      default: // fade
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: baseTransition },
          exit: { opacity: 0, transition: baseTransition },
        };
    }
  }, [type, direction, prefersReducedMotion]);

  return variants;
}

/**
 * Hook para animações sequenciais (timeline)
 */
export function useSequentialAnimation(
  items: unknown[],
  config: AnimationConfig & { staggerDelay?: number } = {}
) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const prefersReducedMotion = useReducedMotion();

  const staggerDelay = config.staggerDelay || 0.1;

  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentIndex(items.length - 1);
      return;
    }

    if (currentIndex < items.length - 1) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, staggerDelay * 1000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [currentIndex, items.length, staggerDelay, prefersReducedMotion]);

  const getItemAnimation = (index: number) => {
    const isVisible = index <= currentIndex;
    const transition = createTransition(config);

    return {
      initial: { opacity: 0, y: 20 },
      animate: isVisible
        ? { opacity: 1, y: 0, transition }
        : { opacity: 0, y: 20 },
    };
  };

  return {
    currentIndex,
    getItemAnimation,
    isComplete: currentIndex >= items.length - 1,
  };
}

/**
 * Hook para animações com gestos (mobile-friendly)
 */
export function useGestureAnimation() {
  const prefersReducedMotion = useReducedMotion();

  const gestureProps = useMemo(() => {
    if (prefersReducedMotion) {
      return {};
    }

    return {
      whileTap: { scale: 0.98 },
      whileHover: { scale: 1.02 },
      transition: createTransition({ duration: 0.2 }),
    };
  }, [prefersReducedMotion]);

  return gestureProps;
}
