/**
 * Utilitários para sanitização de dados
 * Previne ataques XSS e garante dados limpos
 */

import DOMPurify from 'dompurify';

// ==================== CONFIGURAÇÃO DO DOMPURIFY ====================

// Configuração básica para textos que podem conter HTML
const basicConfig = {
  ALLOWED_TAGS: ['b', 'i', 'u', 'em', 'strong', 'br', 'p'],
  ALLOWED_ATTR: [],
  KEEP_CONTENT: true,
};

// Configuração para conteúdo rico (blogs, descrições)
const richConfig = {
  ALLOWED_TAGS: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p',
    'br',
    'span',
    'div',
    'b',
    'i',
    'u',
    'em',
    'strong',
    'ul',
    'ol',
    'li',
    'a',
    'img',
    'blockquote',
    'code',
    'pre',
  ],
  ALLOWED_ATTR: [
    'href',
    'target',
    'rel',
    'src',
    'alt',
    'width',
    'height',
    'class',
  ],
  KEEP_CONTENT: true,
};

// Configuração restritiva (apenas texto)
const textOnlyConfig = {
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: [],
  KEEP_CONTENT: true,
};

// ==================== FUNÇÕES DE SANITIZAÇÃO ====================

/**
 * Sanitiza texto simples removendo todos os tags HTML
 */
export function sanitizeText(input: string): string {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input.trim(), textOnlyConfig);
}

/**
 * Sanitiza HTML básico permitindo apenas tags de formatação simples
 */
export function sanitizeBasicHtml(input: string): string {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input.trim(), basicConfig);
}

/**
 * Sanitiza HTML rico para conteúdo de blogs e descrições detalhadas
 */
export function sanitizeRichHtml(input: string): string {
  if (typeof input !== 'string') return '';
  return DOMPurify.sanitize(input.trim(), richConfig);
}

/**
 * Sanitiza e valida URLs
 */
export function sanitizeUrl(input: string): string {
  if (typeof input !== 'string') return '';

  const cleaned = input.trim();

  // Lista de protocolos permitidos
  const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];

  try {
    const url = new URL(cleaned);
    if (!allowedProtocols.includes(url.protocol)) {
      return '';
    }
    return url.toString();
  } catch {
    // Se não é uma URL válida, pode ser um caminho relativo
    if (cleaned.startsWith('/') || cleaned.startsWith('#')) {
      return cleaned;
    }
    return '';
  }
}

/**
 * Sanitiza dados de formulário
 */
export function sanitizeFormData<T extends Record<string, unknown>>(
  data: T,
  htmlFields: (keyof T)[] = []
): T {
  const sanitized = { ...data };

  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string') {
      if (htmlFields.includes(key as keyof T)) {
        sanitized[key as keyof T] = sanitizeBasicHtml(value) as T[keyof T];
      } else {
        sanitized[key as keyof T] = sanitizeText(value) as T[keyof T];
      }
    }
  }

  return sanitized;
}

/**
 * Remove caracteres perigosos de nomes de arquivo
 */
export function sanitizeFilename(filename: string): string {
  if (typeof filename !== 'string') return '';

  return filename
    .trim()
    .replace(/[^a-zA-Z0-9.-]/g, '_') // Substitui caracteres especiais por underscore
    .replace(/_{2,}/g, '_') // Remove underscores múltiplos
    .replace(/^_+|_+$/g, '') // Remove underscores do início e fim
    .toLowerCase();
}

/**
 * Sanitiza dados JSON removendo propriedades perigosas
 */
export function sanitizeJson(input: unknown): unknown {
  if (input === null || input === undefined) {
    return input;
  }

  if (typeof input === 'string') {
    return sanitizeText(input);
  }

  if (typeof input === 'number' || typeof input === 'boolean') {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map(item => sanitizeJson(item));
  }

  if (typeof input === 'object') {
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(
      input as Record<string, unknown>
    )) {
      // Remove propriedades que começam com __ (podem ser perigosas)
      if (
        !key.startsWith('__') &&
        !key.includes('script') &&
        !key.includes('eval')
      ) {
        sanitized[sanitizeText(key)] = sanitizeJson(value);
      }
    }

    return sanitized;
  }

  return input;
}

// ==================== VALIDAÇÕES DE SEGURANÇA ====================

/**
 * Verifica se uma string contém scripts maliciosos
 */
export function containsMaliciousScript(input: string): boolean {
  if (typeof input !== 'string') return false;

  const maliciousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi,
    /vbscript:/gi,
    /data:text\/html/gi,
  ];

  return maliciousPatterns.some(pattern => pattern.test(input));
}

/**
 * Valida se um tipo MIME é seguro para upload
 */
export function isSafeMimeType(mimeType: string): boolean {
  const safeMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/gif',
    'application/pdf',
    'text/plain',
    'text/csv',
  ];

  return safeMimeTypes.includes(mimeType.toLowerCase());
}
