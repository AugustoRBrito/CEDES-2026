/**
 * Props interfaces para todos os componentes da aplicação
 * Tipagem rigorosa com validação em tempo de compilação
 */

import type {
  AnimatedComponentProps,
  BaseComponentProps,
  BlogItem,
  MenuItem,
  ProjectItem,
} from '@/types';
import type { ReactNode } from 'react';

// ==================== PROPS BASE ====================

/** Props para componentes de layout */
export interface LayoutProps extends BaseComponentProps {
  readonly title?: string;
  readonly description?: string;
}

// ==================== HERO SECTION ====================

/** Props para o componente Hero */
export interface HeroProps extends AnimatedComponentProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly ctaText?: string;
  readonly ctaLink?: string;
}

// ==================== PROJETOS ====================

/** Props para lista de projetos */
export interface ProjectsProps extends AnimatedComponentProps {
  readonly projects?: readonly ProjectItem[];
  readonly limit?: number;
  readonly showAll?: boolean;
}

/** Props para card de projeto */
export interface ProjectCardProps extends BaseComponentProps {
  readonly project: ProjectItem;
  readonly variant?: 'default' | 'featured' | 'compact';
  readonly onSelect?: (project: ProjectItem) => void;
}

// ==================== BLOG ====================

/** Props para lista do blog */
export interface BlogProps extends AnimatedComponentProps {
  readonly posts?: readonly BlogItem[];
  readonly limit?: number;
  readonly category?: string;
}

/** Props para card do blog */
export interface BlogCardProps extends BaseComponentProps {
  readonly post: BlogItem;
  readonly variant?: 'default' | 'featured' | 'minimal';
  readonly showReadMore?: boolean;
}

// ==================== NAVEGAÇÃO ====================

/** Props para o navbar */
export interface NavbarProps extends BaseComponentProps {
  readonly items?: readonly MenuItem[];
  readonly brand?: string;
  readonly fixed?: boolean;
}

/** Props para o footer */
export interface FooterProps extends BaseComponentProps {
  readonly links?: readonly MenuItem[];
  readonly socialLinks?: readonly SocialLink[];
  readonly companyInfo?: CompanyInfo;
}

/** Link social */
export interface SocialLink {
  readonly name: string;
  readonly url: string;
  readonly icon: string;
}

/** Informações da empresa */
export interface CompanyInfo {
  readonly name: string;
  readonly description?: string;
  readonly address?: string;
  readonly phone?: string;
  readonly email?: string;
}

// ==================== SEÇÕES ====================

/** Props para seção About */
export interface AboutProps extends AnimatedComponentProps {
  readonly title?: string;
  readonly content?: string;
  readonly imageUrl?: string;
  readonly stats?: readonly StatItem[];
}

/** Item de estatística */
export interface StatItem {
  readonly label: string;
  readonly value: string | number;
  readonly description?: string;
}

/** Props para seção What We Do */
export interface WhatWeDoProps extends AnimatedComponentProps {
  readonly title?: string;
  readonly services?: readonly ServiceItem[];
}

/** Item de serviço */
export interface ServiceItem {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

// ==================== COMPONENTS UTILITÁRIOS ====================

/** Props para button customizado */
export interface ButtonProps extends BaseComponentProps {
  readonly variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly loading?: boolean;
  readonly disabled?: boolean;
  readonly onClick?: () => void | Promise<void>;
  readonly type?: 'button' | 'submit' | 'reset';
}

/** Props para modal */
export interface ModalProps extends BaseComponentProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title?: string;
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
  readonly closeable?: boolean;
}

/** Props para loading spinner */
export interface LoadingProps extends BaseComponentProps {
  readonly size?: 'sm' | 'md' | 'lg';
  readonly text?: string;
  readonly overlay?: boolean;
}

/** Props para error boundary */
export interface ErrorBoundaryProps extends BaseComponentProps {
  readonly fallback?: ReactNode | ((error: Error) => ReactNode);
  readonly onError?: (error: Error, errorInfo: string) => void;
}

// ==================== FORMS ====================

/** Props base para inputs */
export interface InputProps extends BaseComponentProps {
  readonly name: string;
  readonly label?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly error?: string;
}

/** Props para text input */
export interface TextInputProps extends InputProps {
  readonly type?: 'text' | 'email' | 'password' | 'url';
  readonly value?: string;
  readonly onChange?: (value: string) => void;
}

/** Props para textarea */
export interface TextareaProps extends InputProps {
  readonly value?: string;
  readonly rows?: number;
  readonly onChange?: (value: string) => void;
}

/** Props para select */
export interface SelectProps extends InputProps {
  readonly options: readonly SelectOption[];
  readonly value?: string;
  readonly onChange?: (value: string) => void;
  readonly multiple?: boolean;
}

/** Opção do select */
export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

// ==================== ANIMATION PROPS ====================

/** Props específicas para animações Framer Motion */
export interface MotionProps extends BaseComponentProps {
  readonly initial?: Record<string, unknown>;
  readonly animate?: Record<string, unknown>;
  readonly exit?: Record<string, unknown>;
  readonly transition?: {
    readonly duration?: number;
    readonly delay?: number;
    readonly ease?: string;
  };
}

/** Props para scroll animations */
export interface ScrollAnimationProps extends BaseComponentProps {
  readonly triggerOnce?: boolean;
  readonly threshold?: number;
  readonly rootMargin?: string;
}
