/**
 * Configuração de Content Security Policy (CSP)
 * Implementa headers de segurança para prevenir ataques XSS, clickjacking, etc.
 */

import type { NextRequest } from 'next/server';

// ==================== CONFIGURAÇÃO CSP ====================

export const CSP_DIRECTIVES = {
  // Fontes padrão - apenas HTTPS e self
  'default-src': ["'self'"],

  // Scripts - apenas self, inline hashes específicos e CDNs confiáveis
  'script-src': [
    "'self'",
    "'unsafe-inline'", // TODO: Remover e usar nonces em produção
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://vercel.live',
  ],

  // Estilos - self, inline e CDNs de fontes
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Necessário para Tailwind
    'https://fonts.googleapis.com',
  ],

  // Imagens - self, data URIs, e CDNs confiáveis
  'img-src': [
    "'self'",
    'data:',
    'https:',
    'blob:',
    'https://images.unsplash.com',
    'https://via.placeholder.com',
  ],

  // Fontes
  'font-src': ["'self'", 'https://fonts.gstatic.com'],

  // Conectar - APIs e websockets
  'connect-src': [
    "'self'",
    'https://api.cades.org.br',
    'https://www.google-analytics.com',
    'https://vitals.vercel-insights.com',
    'wss:',
  ],

  // Frames - apenas domínios específicos
  'frame-src': [
    "'self'",
    'https://www.youtube.com',
    'https://player.vimeo.com',
  ],

  // Worker scripts
  'worker-src': ["'self'", 'blob:'],

  // Objetos (desabilitar por segurança)
  'object-src': ["'none'"],

  // Base URI
  'base-uri': ["'self'"],

  // Form actions
  'form-action': ["'self'"],

  // Frame ancestors (previne clickjacking)
  'frame-ancestors': ["'none'"],

  // Upgrade insecure requests
  'upgrade-insecure-requests': [],
};

// ==================== GERAÇÃO DE CSP ====================

/**
 * Gera string CSP a partir das diretivas
 */
export function generateCSP(isDevelopment = false): string {
  const directives = { ...CSP_DIRECTIVES };

  // Em desenvolvimento, ser mais permissivo
  if (isDevelopment) {
    directives['script-src'].push("'unsafe-eval'"); // Para hot reload
    directives['connect-src'].push('http://localhost:*', 'ws://localhost:*');
  }

  return Object.entries(directives)
    .map(([directive, sources]) => {
      if (sources.length === 0) {
        return directive;
      }
      return `${directive} ${sources.join(' ')}`;
    })
    .join('; ');
}

// ==================== OUTROS HEADERS DE SEGURANÇA ====================

export const SECURITY_HEADERS = {
  // Previne clickjacking
  'X-Frame-Options': 'DENY',

  // Previne MIME sniffing
  'X-Content-Type-Options': 'nosniff',

  // Ativa proteção XSS do browser
  'X-XSS-Protection': '1; mode=block',

  // Força HTTPS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',

  // Política de referrer
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Permissions Policy (antiga Feature Policy)
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'fullscreen=(self)',
  ].join(', '),
};

// ==================== MIDDLEWARE DE SEGURANÇA ====================

/**
 * Aplica headers de segurança à resposta
 */
export function applySecurityHeaders(
  response: Response,
  request?: NextRequest
): Response {
  const isDevelopment = process.env.NODE_ENV === 'development';

  // CSP
  response.headers.set('Content-Security-Policy', generateCSP(isDevelopment));

  // Outros headers de segurança
  Object.entries(SECURITY_HEADERS).forEach(([header, value]) => {
    response.headers.set(header, value);
  });

  // CORS em desenvolvimento
  if (isDevelopment) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
  }

  return response;
}

// ==================== VALIDAÇÃO DE ORIGEM ====================

/**
 * Valida se a origem da requisição é permitida
 */
export function isValidOrigin(
  origin: string | null,
  allowedOrigins: string[] = []
): boolean {
  if (!origin) return true; // Requisições sem origem (mesmo domínio)

  const defaultAllowed = [
    'https://cades.org.br',
    'https://www.cades.org.br',
    'http://localhost:3000',
    'http://localhost:3001',
  ];

  const allowed = [...defaultAllowed, ...allowedOrigins];

  return allowed.some(allowed => {
    if (allowed.includes('*')) {
      const pattern = allowed.replace('*', '.*');
      return new RegExp(pattern).test(origin);
    }
    return origin === allowed;
  });
}

// ==================== NONCE GENERATOR ====================

/**
 * Gera nonce para scripts inline (use em produção)
 */
export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// ==================== VALIDAÇÃO DE CONTENT-TYPE ====================

/**
 * Valida Content-Type para prevenir ataques
 */
export function isValidContentType(
  contentType: string | null,
  expected: string[]
): boolean {
  if (!contentType) return false;

  const normalizedContentType = contentType.split(';')[0]?.trim().toLowerCase();
  const normalizedExpected = expected.map(type => type.toLowerCase());

  if (!normalizedContentType) return false;

  return normalizedExpected.includes(normalizedContentType);
}
