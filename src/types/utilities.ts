/**
 * Utility types avançados para desenvolvimento type-safe
 * Tipos genéricos e auxiliares para manipulação de dados
 */

// ==================== UTILITY TYPES AVANÇADOS ====================

/** Extrai propriedades que são funções */
export type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

/** Extrai apenas as propriedades que são funções */
export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

/** Extrai propriedades que não são funções */
export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

/** Extrai apenas as propriedades que não são funções */
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

/** Torna todas as propriedades opcionais recursivamente */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/** Torna todas as propriedades obrigatórias recursivamente */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/** Cria um tipo união a partir das chaves de um objeto */
export type ValueOf<T> = T[keyof T];

/** Cria um tipo com apenas as propriedades especificadas como obrigatórias */
export type RequireExactlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

/** Cria um tipo com pelo menos uma propriedade obrigatória */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

// ==================== FORM UTILITIES ====================

/** Estado de campo de formulário */
export interface FieldState<T> {
  readonly value: T;
  readonly error?: string | undefined;
  readonly touched: boolean;
  readonly dirty: boolean;
  readonly valid: boolean;
}

/** Estado completo de formulário */
export interface FormState<T extends Record<string, any>> {
  readonly fields: {
    -readonly [K in keyof T]: FieldState<T[K]>;
  };
  readonly isSubmitting: boolean;
  readonly isValid: boolean;
  readonly isDirty: boolean;
  readonly errors: Partial<Record<keyof T, string>>;
}

/** Ações do formulário */
export interface FormActions<T extends Record<string, any>> {
  readonly setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  readonly setFieldError: <K extends keyof T>(field: K, error: string) => void;
  readonly setFieldTouched: <K extends keyof T>(
    field: K,
    touched: boolean
  ) => void;
  readonly resetField: <K extends keyof T>(field: K) => void;
  readonly resetForm: () => void;
  readonly validateField: <K extends keyof T>(field: K) => boolean;
  readonly validateForm: () => boolean;
  readonly submitForm: () => Promise<void>;
}

/** Hook de formulário completo */
export interface UseFormReturn<T extends Record<string, any>> {
  readonly state: FormState<T>;
  readonly actions: FormActions<T>;
}

// ==================== API UTILITIES ====================

/** Configuração de requisição */
export interface RequestConfig {
  readonly method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  readonly headers?: Record<string, string>;
  readonly timeout?: number;
  readonly retries?: number;
  readonly cache?: boolean;
}

/** Resposta de erro da API */
export interface ApiError {
  readonly code: string;
  readonly message: string;
  readonly details?: Record<string, unknown>;
  readonly timestamp: string;
}

/** Hook de dados async */
export interface UseAsyncData<T, P extends readonly unknown[] = []> {
  readonly data: T | null;
  readonly error: ApiError | null;
  readonly loading: boolean;
  readonly refetch: (...params: P) => Promise<void>;
  readonly mutate: (data: T | null) => void;
}

// ==================== EVENT HANDLERS ====================

/** Handler de evento com payload tipado */
export type TypedEventHandler<T> = (payload: T) => void | Promise<void>;

/** Handler de mudança com valor anterior e novo */
export type ChangeEventHandler<T> = (newValue: T, oldValue: T) => void;

/** Handler de validação */
export type ValidationHandler<T> = (value: T) => string | null;

/** Handler de submissão com resultado */
export type SubmissionHandler<T, R> = (data: T) => Promise<R>;

// ==================== COMPONENT UTILITIES ====================

/** Ref forwarding para componentes genéricos */
export type ForwardRefComponent<T, P = {}> = React.ForwardRefExoticComponent<
  P & React.RefAttributes<T>
>;

/** Props polimórficas para componentes que podem ser diferentes elementos */
export type PolymorphicComponentProps<E extends React.ElementType, P = {}> = P &
  Omit<React.ComponentProps<E>, keyof P> & {
    as?: E;
  };

/** Ref polimórfico */
export type PolymorphicRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>['ref'];

// ==================== DATA TRANSFORMATION ====================

/** Transforma um tipo em sua versão serializada para JSON */
export type Serialized<T> = T extends Date
  ? string
  : T extends Function
    ? never
    : T extends object
      ? { [K in keyof T]: Serialized<T[K]> }
      : T;

/** Remove propriedades do tipo Date para serialização */
export type WithoutDates<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};

/** Converte propriedades nullable em opcionais */
export type NullableToOptional<T> = {
  [K in keyof T as T[K] extends null | undefined ? K : never]?: T[K];
} & {
  [K in keyof T as T[K] extends null | undefined ? never : K]: T[K];
};

// ==================== ASYNC UTILITIES ====================

/** Estado de promise */
export type PromiseState<T> =
  | { status: 'pending' }
  | { status: 'fulfilled'; value: T }
  | { status: 'rejected'; reason: Error };

/** Resultado de operação assíncrona */
export type AsyncResult<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/** Task com retry */
export interface RetryableTask<T> {
  readonly execute: () => Promise<T>;
  readonly maxRetries: number;
  readonly retryDelay: number;
  readonly shouldRetry: (error: Error, attempt: number) => boolean;
}

// ==================== VALIDATION UTILITIES ====================

/** Schema de validação genérico */
export interface ValidationSchema<T> {
  readonly validate: (value: unknown) => value is T;
  readonly parse: (value: unknown) => T;
  readonly safeParse: (value: unknown) => AsyncResult<T, string>;
}

/** Regra de validação */
export interface ValidationRule<T> {
  readonly name: string;
  readonly message: string;
  readonly validate: (value: T) => boolean;
}

/** Validador customizado */
export type CustomValidator<T> = (value: T) => string | null;

// ==================== TYPE GUARDS AVANÇADOS ====================

/** Verifica se é um erro */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/** Verifica se é um array de um tipo específico */
export function isArrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

/** Verifica se é um objeto com propriedades específicas */
export function hasProperty<K extends string | number | symbol>(
  obj: unknown,
  prop: K
): obj is Record<K, unknown> {
  return typeof obj === 'object' && obj !== null && prop in obj;
}

/** Verifica se todas as propriedades existem */
export function hasAllProperties<T extends Record<string, unknown>>(
  obj: unknown,
  props: readonly (keyof T)[]
): obj is T {
  if (typeof obj !== 'object' || obj === null) return false;
  return props.every(prop => prop in obj);
}
