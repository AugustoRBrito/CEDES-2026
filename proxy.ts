/**
 * Middleware de segurança para Next.js
 * Aplica headers de segurança e validações em todas as requisições
 */

import { isRateLimited } from '@/utils/api-validation';
import {
  applySecurityHeaders,
  generateNonce,
  isValidContentType,
  isValidOrigin,
} from '@/utils/security';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// ==================== CONFIGURAÇÃO ====================

const PROTECTED_ROUTES = ['/api/', '/admin/'];
const PUBLIC_ROUTES = ['/', '/transparency', '/projects'];
const RATE_LIMIT_ROUTES = ['/api/'];

// ==================== MIDDLEWARE PRINCIPAL ====================

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get('origin');
  const userAgent = request.headers.get('user-agent') || '';
  const ip = getClientIP(request);

  // ==================== RATE LIMITING ====================

  // Aplicar rate limiting em rotas de API
  if (RATE_LIMIT_ROUTES.some(route => pathname.startsWith(route))) {
    if (isRateLimited(ip, 100, 15 * 60 * 1000)) {
      // 100 requests per 15 minutes
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
  }

  // ==================== VALIDAÇÃO DE ORIGEM ====================

  // Verificar origem para requisições com payload
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    if (!isValidOrigin(origin)) {
      return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
    }
  }

  // ==================== VALIDAÇÃO DE USER-AGENT ====================

  // Bloquear user-agents suspeitos
  if (isSuspiciousUserAgent(userAgent)) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  // ==================== VALIDAÇÃO DE CONTENT-TYPE ====================

  // Validar Content-Type para POST/PUT
  if (
    ['POST', 'PUT'].includes(request.method) &&
    pathname.startsWith('/api/')
  ) {
    const contentType = request.headers.get('content-type');
    const validTypes = [
      'application/json',
      'application/x-www-form-urlencoded',
      'multipart/form-data',
    ];

    if (!isValidContentType(contentType, validTypes)) {
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      );
    }
  }

  // ==================== HEADERS DE SEGURANÇA ====================

  // Criar resposta com headers de segurança
  const response = NextResponse.next();

  // Aplicar headers de segurança
  applySecurityHeaders(response, request);

  // Adicionar nonce para scripts (em produção)
  if (process.env.NODE_ENV === 'production') {
    const nonce = generateNonce();
    response.headers.set('x-nonce', nonce);
  }

  return response;
}

// ==================== FUNÇÕES AUXILIARES ====================

/**
 * Extrai IP do cliente considerando proxies
 */
function getClientIP(request: NextRequest): string {
  // Vercel
  const vercelIP = request.headers.get('x-real-ip');
  if (vercelIP) return vercelIP;

  // Cloudflare
  const cfIP = request.headers.get('cf-connecting-ip');
  if (cfIP) return cfIP;

  // Outros proxies
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return 'unknown';
}

/**
 * Detecta user-agents suspeitos
 */
function isSuspiciousUserAgent(userAgent: string): boolean {
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /php/i,
    /java/i,
    /scanner/i,
    /sql/i,
    /injection/i,
  ];

  // Lista de bots permitidos
  const allowedBots = [
    'Googlebot',
    'Bingbot',
    'facebookexternalhit',
    'Twitterbot',
    'LinkedInBot',
  ];

  // Se é um bot permitido, não bloquear
  if (allowedBots.some(bot => userAgent.includes(bot))) {
    return false;
  }

  // Se contém padrões suspeitos, bloquear
  return suspiciousPatterns.some(pattern => pattern.test(userAgent));
}

// ==================== CONFIGURAÇÃO DE ROTAS ====================

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
