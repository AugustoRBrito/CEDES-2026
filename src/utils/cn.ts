/**
 * Utilitários para manipulação de classes CSS (principalmente Tailwind)
 */

import { type ClassValue, clsx } from 'clsx';

/**
 * Combina classes CSS de forma inteligente
 * Útil para componentes condicionais com Tailwind
 *
 * @example
 * cn('bg-blue-500', isActive && 'bg-red-500', className)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Utilitário para criação de variantes de componentes
 * Baseado no padrão CVA (Class Variance Authority)
 */
export function createVariants<
  T extends Record<string, Record<string, string>>,
>(config: {
  base?: string;
  variants?: T;
  defaultVariants?: {
    [K in keyof T]?: keyof T[K];
  };
}) {
  return (
    props?: {
      [K in keyof T]?: keyof T[K];
    } & { className?: string }
  ) => {
    const { className, ...variantProps } = props || {};

    const classes = [
      config.base,
      ...Object.entries(config.variants || {}).map(([key, variants]) => {
        const variant =
          (variantProps as any)?.[key] || config.defaultVariants?.[key];
        return variant ? variants[variant as string] : undefined;
      }),
      className,
    ].filter(Boolean);

    return cn(...classes);
  };
}
