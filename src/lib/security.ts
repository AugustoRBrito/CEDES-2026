/**
 * Exportações centralizadas dos utilitários de segurança
 * Facilita importação e uso em toda a aplicação
 */

// ==================== VALIDAÇÃO E SCHEMAS ====================
export * from '@/schemas/base';
export * from '@/schemas/domain';

// ==================== SANITIZAÇÃO ====================
export {
  containsMaliciousScript,
  isSafeMimeType,
  sanitizeBasicHtml,
  sanitizeFilename,
  sanitizeFormData,
  sanitizeJson,
  sanitizeRichHtml,
  sanitizeText,
  sanitizeUrl,
} from '@/utils/sanitize';

// ==================== VALIDAÇÃO DE API ====================
export {
  cleanupRateLimit,
  isRateLimited,
  validateApiResponse,
  validateArray,
  validateData,
  validateFile,
  validateFormData,
} from '@/utils/api-validation';

export type {
  ApiValidationOptions,
  ValidationResult,
} from '@/utils/api-validation';

// ==================== SEGURANÇA ====================
export {
  CSP_DIRECTIVES,
  SECURITY_HEADERS,
  applySecurityHeaders,
  generateCSP,
  generateNonce,
  isValidContentType,
  isValidOrigin,
} from '@/utils/security';

// ==================== LOGGING ====================
export {
  LogLevel,
  Logger,
  apiLogger,
  authLogger,
  createLogger,
  createLoggerMiddleware,
  errorLogger,
  logPerformance,
  logger,
  securityLogger,
} from '@/utils/logger';

export type { LogEntry, LoggerConfig } from '@/utils/logger';

// ==================== ERROR BOUNDARY ====================
export {
  ErrorBoundary,
  withErrorBoundary,
} from '@/components/ui/ErrorBoundary';
