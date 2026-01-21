/**
 * Sistema de tipos centrais da aplicação
 * Fase 3: Tipagem TypeScript rigorosa e type-safe
 */

// ==================== TIPOS PRIMITIVOS ====================

/** ID único para entidades */
export type EntityId = number;

/** Timestamp ISO string */
export type ISODateString = string;

/** URL válida */
export type URLString = string;

/** HTML string sanitizado */
export type SafeHTML = string;

// ==================== INTERFACE BASE ====================

/** Interface base para todas as entidades */
export interface BaseEntity {
  readonly id: EntityId;
}

// ==================== DOMÍNIO: PROJETOS ====================

/** Status possíveis de um projeto */
export type ProjectStatus = 'planning' | 'active' | 'completed' | 'paused';

/** Interface para items de projeto */
export interface ProjectItem extends BaseEntity {
  readonly title: string;
  readonly description: SafeHTML;
  readonly imageUrl: URLString;
  readonly status?: ProjectStatus;
  readonly startDate?: ISODateString;
  readonly endDate?: ISODateString;
  readonly beneficiaries?: number;
  readonly tags?: readonly string[];
}

// ==================== DOMÍNIO: BLOG ====================

/** Categorias de artigos do blog */
export type BlogCategory =
  | 'projeto'
  | 'evento'
  | 'noticia'
  | 'educacao'
  | 'comunidade';

/** Interface para items do blog */
export interface BlogItem extends BaseEntity {
  readonly title: string;
  readonly description: string;
  readonly imageUrl: URLString;
  readonly date: ISODateString;
  readonly author?: string;
  readonly category?: BlogCategory;
  readonly tags?: readonly string[];
  readonly readTime?: number; // em minutos
}

// ==================== DOMÍNIO: NAVEGAÇÃO ====================

/** Interface para items do menu */
export interface MenuItem extends BaseEntity {
  readonly label: string;
  readonly path: string;
  readonly icon?: string;
  readonly isExternal?: boolean;
  readonly children?: readonly MenuItem[];
}

// ==================== API ====================

/** Resposta padrão da API */
export interface ApiResponse<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly message?: string;
  readonly timestamp: ISODateString;
}

/** Estados de carregamento */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// ==================== COMPONENTES REACT ====================

/** Props base para todos os componentes */
export interface BaseComponentProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
  readonly testId?: string;
}

/** Props para componentes animados */
export interface AnimatedComponentProps extends BaseComponentProps {
  readonly animate?: boolean;
  readonly animationDelay?: number;
  readonly animationDuration?: number;
}

// ==================== TYPE GUARDS ====================

/** Verifica se é uma string válida */
export function isValidString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/** Verifica se é um ID válido */
export function isValidEntityId(value: unknown): value is EntityId {
  return typeof value === 'number' && value > 0 && Number.isInteger(value);
}
