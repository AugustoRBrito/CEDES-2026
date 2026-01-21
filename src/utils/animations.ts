import type { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0 },
};

export const scaleInDelayed: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.2 },
  },
};

export const cascadeIn: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const cascadeItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const defaultTransition = {
  duration: 0.5,
  ease: 'easeOut' as const,
};

export const createAnimationByType = (
  type: AnimationType,
  direction?: AnimationDirection,
  config?: AnimationConfig
): Variants => {
  switch (type) {
    case AnimationType.FADE_IN:
      return fadeIn;
    case AnimationType.FADE_IN_UP:
      return fadeInUp;
    case AnimationType.SLIDE_LEFT:
      return slideLeft;
    case AnimationType.SLIDE_UP:
      return slideUp;
    default:
      return fadeIn;
  }
};

export function createTransition(config: AnimationConfig): {
  duration: number;
  delay: number;
};
export function createTransition(
  duration?: number,
  delay?: number
): { duration: number; delay: number };
export function createTransition(
  configOrDuration?: AnimationConfig | number,
  delay = 0
) {
  if (typeof configOrDuration === 'object' && configOrDuration !== null) {
    return {
      duration: configOrDuration.duration ?? 0.5,
      delay: configOrDuration.delay ?? 0,
    };
  }
  return {
    duration: configOrDuration ?? 0.5,
    delay,
  };
}

export enum AnimationType {
  FADE_IN = 'fadeIn',
  FADE_IN_UP = 'fadeInUp',
  SLIDE_LEFT = 'slideLeft',
  SLIDE_UP = 'slideUp',
}

export type AnimationDirection = 'up' | 'down' | 'left' | 'right';

export interface AnimationConfig {
  duration?: number;
  delay?: number;
}
