/**
 * Hooks avançados para animações e interações
 * Continuação da Fase 3: Hooks especializados
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';
import type { AnimationConfig } from '../utils/animations';
import { createTransition } from '../utils/animations';

// Schema para configurações de animação por velocidade de scroll
const ScrollVelocityConfigSchema = z.object({
  sensitivity: z.number().min(0.1).max(2).optional(),
  threshold: z.number().min(1).max(100).optional(),
  direction: z.enum(['vertical', 'horizontal', 'both']).optional(),
});

export type ScrollVelocityConfig = z.infer<typeof ScrollVelocityConfigSchema>;

// Schema para configurações de mouse tracking
const MouseTrackingConfigSchema = z.object({
  sensitivity: z.number().min(0.01).max(1).optional(),
  bounds: z
    .object({
      x: z.number().optional(),
      y: z.number().optional(),
    })
    .optional(),
  smooth: z.boolean().optional(),
});

export type MouseTrackingConfig = z.infer<typeof MouseTrackingConfigSchema>;

/**
 * Hook para detectar velocidade de scroll e animar baseado nisso
 */
export function useScrollVelocity(config: ScrollVelocityConfig = {}) {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<
    'up' | 'down' | 'left' | 'right'
  >('down');
  const lastScrollPosition = useRef(0);
  const lastScrollTime = useRef(Date.now());

  // Validar configuração
  const validatedConfig = useMemo(() => {
    try {
      return ScrollVelocityConfigSchema.parse(config);
    } catch {
      return { sensitivity: 1, threshold: 10, direction: 'vertical' as const };
    }
  }, [config]);

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScroll =
        validatedConfig.direction === 'horizontal'
          ? window.scrollX
          : window.scrollY;

      const timeDiff = currentTime - lastScrollTime.current;
      const scrollDiff = currentScroll - lastScrollPosition.current;

      if (timeDiff > 0) {
        const velocity =
          (Math.abs(scrollDiff) / timeDiff) *
          (validatedConfig.sensitivity || 1);
        setScrollVelocity(velocity);

        // Determinar direção
        if (validatedConfig.direction === 'horizontal') {
          setScrollDirection(scrollDiff > 0 ? 'right' : 'left');
        } else {
          setScrollDirection(scrollDiff > 0 ? 'down' : 'up');
        }
      }

      lastScrollPosition.current = currentScroll;
      lastScrollTime.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [validatedConfig]);

  const isScrollingFast = scrollVelocity > (validatedConfig.threshold || 10);

  return {
    velocity: scrollVelocity,
    direction: scrollDirection,
    isScrollingFast,
    shouldReduceAnimations: isScrollingFast,
  };
}

/**
 * Hook para tracking de mouse com efeitos de parallax suave
 */
export function useMouseTracking(config: MouseTrackingConfig = {}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  // Validar configuração
  const validatedConfig = useMemo(() => {
    try {
      return MouseTrackingConfigSchema.parse(config);
    } catch {
      return { sensitivity: 0.1, smooth: true };
    }
  }, [config]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newPosition = { x: event.clientX, y: event.clientY };
      setMousePosition(newPosition);

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const relativeX =
          (event.clientX - centerX) * (validatedConfig.sensitivity || 0.1);
        const relativeY =
          (event.clientY - centerY) * (validatedConfig.sensitivity || 0.1);

        // Aplicar limites se especificados
        const boundedX = validatedConfig.bounds?.x
          ? Math.max(
              -validatedConfig.bounds.x,
              Math.min(validatedConfig.bounds.x, relativeX)
            )
          : relativeX;
        const boundedY = validatedConfig.bounds?.y
          ? Math.max(
              -validatedConfig.bounds.y,
              Math.min(validatedConfig.bounds.y, relativeY)
            )
          : relativeY;

        setRelativePosition({ x: boundedX, y: boundedY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [validatedConfig]);

  const getTransform = useCallback(
    (multiplier = 1) => {
      return `translate3d(${relativePosition.x * multiplier}px, ${relativePosition.y * multiplier}px, 0)`;
    },
    [relativePosition]
  );

  return {
    ref: containerRef,
    mousePosition,
    relativePosition,
    getTransform,
    style: {
      transform: getTransform(),
      transition: validatedConfig.smooth ? 'transform 0.1s ease-out' : 'none',
    },
  };
}

/**
 * Hook para animações baseadas em batimentos cardíacos/pulso
 */
export function usePulseAnimation(
  interval = 2000,
  config: AnimationConfig = {}
) {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), (config.duration || 0.5) * 1000);
    }, interval);

    return () => clearInterval(pulseInterval);
  }, [interval, config.duration]);

  const animation = useMemo(
    () => ({
      scale: isPulsing ? 1.1 : 1,
      transition: createTransition(config),
    }),
    [isPulsing, config]
  );

  return {
    isPulsing,
    animation,
    animate: animation,
  };
}

/**
 * Hook para animações de contador/números incrementais
 */
export function useCounterAnimation(
  end: number,
  start = 0,
  duration = 2000,
  enabled = true
) {
  const [current, setCurrent] = useState(start);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const startTime = Date.now();
    const difference = end - start;

    const updateCounter = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutQuart)
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      const newValue = start + difference * easedProgress;
      setCurrent(Math.round(newValue));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setIsComplete(true);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [start, end, duration, enabled]);

  return {
    current,
    isComplete,
    progress: (current - start) / (end - start),
  };
}

/**
 * Hook para animações de progresso de leitura
 */
export function useReadingProgress(containerSelector?: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const container = containerSelector
        ? document.querySelector(containerSelector)
        : document.documentElement;

      if (!container) return;

      const scrollTop = window.scrollY;
      const docHeight = container.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    calculateProgress();
    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress);

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, [containerSelector]);

  return {
    progress,
    percentage: progress,
    style: {
      width: `${progress}%`,
      transform: `scaleX(${progress / 100})`,
    },
  };
}

/**
 * Hook para animações de elementos "sticky" com efeitos
 */
export function useStickyAnimation() {
  const [isSticky, setIsSticky] = useState(false);
  const [stickyOffset, setStickyOffset] = useState(0);
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const isCurrentlySticky = rect.top <= 0;
      setIsSticky(isCurrentlySticky);

      if (isCurrentlySticky) {
        setStickyOffset(Math.abs(rect.top));
      } else {
        setStickyOffset(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Calcular estado inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const stickyStyles = useMemo(
    () => ({
      transform: isSticky
        ? `translateY(${Math.min(stickyOffset * 0.1, 20)}px)`
        : 'none',
      boxShadow: isSticky ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
      transition: 'all 0.3s ease',
    }),
    [isSticky, stickyOffset]
  );

  return {
    ref: elementRef,
    isSticky,
    stickyOffset,
    stickyStyles,
  };
}

/**
 * Hook para animações baseadas na visibilidade da página
 */
export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(!document.hidden);
  const [wasHidden, setWasHidden] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
        setWasHidden(true);
      } else {
        setIsVisible(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Animação para quando a página volta a ficar visível
  const returnAnimation = useMemo(
    () => ({
      initial: wasHidden ? { opacity: 0, scale: 0.95 } : undefined,
      animate: isVisible
        ? { opacity: 1, scale: 1 }
        : { opacity: 0.8, scale: 0.98 },
      transition: { duration: 0.4 },
    }),
    [isVisible, wasHidden]
  );

  return {
    isVisible,
    wasHidden,
    returnAnimation,
  };
}
