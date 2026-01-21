/**
 * Sistema de logging estruturado e seguro
 * Remove informações sensíveis e organiza logs por severidade
 */

// ==================== TIPOS DE LOG ====================

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
  context?: string;
  userId?: string;
  sessionId?: string;
  ip?: string;
  userAgent?: string;
}

export interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableFile: boolean;
  sensitiveFields: string[];
}

// ==================== CONFIGURAÇÃO DEFAULT ====================

const DEFAULT_CONFIG: LoggerConfig = {
  level: process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
  enableConsole: true,
  enableFile: process.env.NODE_ENV === 'production',
  sensitiveFields: [
    'password',
    'token',
    'authorization',
    'cookie',
    'session',
    'apikey',
    'secret',
    'key',
    'cnpj',
    'cpf',
    'email',
    'phone',
    'address',
    'credit_card',
    'ssn',
  ],
};

// ==================== CLASSE LOGGER ====================

export class Logger {
  private config: LoggerConfig;
  private context: string;

  constructor(context: string = 'App', config: Partial<LoggerConfig> = {}) {
    this.context = context;
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ==================== MÉTODOS PÚBLICOS ====================

  debug(message: string, data?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, error?: Error | Record<string, unknown>): void {
    const data =
      error instanceof Error
        ? { error: error.message, stack: error.stack }
        : error;

    this.log(LogLevel.ERROR, message, data);
  }

  fatal(message: string, error?: Error | Record<string, unknown>): void {
    const data =
      error instanceof Error
        ? { error: error.message, stack: error.stack }
        : error;

    this.log(LogLevel.FATAL, message, data);
  }

  // ==================== MÉTODOS PRIVADOS ====================

  private log(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>
  ): void {
    if (level < this.config.level) return;

    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message: this.sanitizeMessage(message),
      context: this.context,
    };

    if (data) {
      logEntry.data = this.sanitizeData(data);
    }

    if (this.config.enableConsole) {
      this.logToConsole(logEntry);
    }

    if (this.config.enableFile) {
      this.logToFile(logEntry);
    }
  }

  private sanitizeMessage(message: string): string {
    let sanitized = message;

    // Remove informações sensíveis da mensagem
    this.config.sensitiveFields.forEach(field => {
      const regex = new RegExp(`${field}[:\\s]*['"]*[^\\s'"]+`, 'gi');
      sanitized = sanitized.replace(regex, `${field}: [REDACTED]`);
    });

    return sanitized;
  }

  private sanitizeData(data: Record<string, unknown>): Record<string, unknown> {
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
      const keyLower = key.toLowerCase();

      // Verificar se é campo sensível
      if (
        this.config.sensitiveFields.some(field =>
          keyLower.includes(field.toLowerCase())
        )
      ) {
        sanitized[key] = '[REDACTED]';
        continue;
      }

      // Recursivamente sanitizar objetos aninhados
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        sanitized[key] = this.sanitizeData(value as Record<string, unknown>);
      } else if (Array.isArray(value)) {
        sanitized[key] = value.map(item =>
          typeof item === 'object' && item !== null
            ? this.sanitizeData(item as Record<string, unknown>)
            : item
        );
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  private logToConsole(entry: LogEntry): void {
    const levelName = LogLevel[entry.level];
    const color = this.getLogColor(entry.level);

    const prefix = `%c[${entry.timestamp}] [${levelName}] [${entry.context}]`;
    const message = `${prefix} ${entry.message}`;

    if (entry.data) {
      console.log(message, color, entry.data);
    } else {
      console.log(message, color);
    }
  }

  private logToFile(entry: LogEntry): void {
    // Em ambiente Node.js, salvar em arquivo
    if (typeof window === 'undefined') {
      // TODO: Implementar salvamento em arquivo ou envio para serviço de log
      console.log(JSON.stringify(entry));
    }
  }

  private getLogColor(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return 'color: #8B5CF6';
      case LogLevel.INFO:
        return 'color: #3B82F6';
      case LogLevel.WARN:
        return 'color: #F59E0B';
      case LogLevel.ERROR:
        return 'color: #EF4444';
      case LogLevel.FATAL:
        return 'color: #DC2626; font-weight: bold';
      default:
        return 'color: inherit';
    }
  }
}

// ==================== INSTÂNCIA GLOBAL ====================

export const logger = new Logger('CADES');

// ==================== LOGGERS ESPECÍFICOS ====================

export const authLogger = new Logger('Auth');
export const apiLogger = new Logger('API');
export const errorLogger = new Logger('Error');
export const securityLogger = new Logger('Security');

// ==================== MIDDLEWARE DE LOG ====================

export function createLoggerMiddleware(context: string) {
  const middlewareLogger = new Logger(context);

  return {
    logRequest: (req: Request, additionalData?: Record<string, unknown>) => {
      middlewareLogger.info(`${req.method} ${req.url}`, {
        method: req.method,
        url: req.url,
        headers: Object.fromEntries(req.headers.entries()),
        ...additionalData,
      });
    },

    logResponse: (req: Request, res: Response, duration: number) => {
      middlewareLogger.info(`${req.method} ${req.url} - ${res.status}`, {
        method: req.method,
        url: req.url,
        status: res.status,
        duration: `${duration}ms`,
      });
    },

    logError: (error: Error, req?: Request) => {
      middlewareLogger.error('Request error', {
        error: error.message,
        stack: error.stack,
        method: req?.method,
        url: req?.url,
      });
    },
  };
}

// ==================== UTILITÁRIOS ====================

/**
 * Cria um logger com contexto específico
 */
export function createLogger(
  context: string,
  config?: Partial<LoggerConfig>
): Logger {
  return new Logger(context, config);
}

/**
 * Log de performance para medir tempo de execução
 */
export function logPerformance<T>(
  logger: Logger,
  operation: string,
  fn: () => T
): T {
  const start = Date.now();

  try {
    const result = fn();
    const duration = Date.now() - start;

    logger.info(`Performance: ${operation}`, { duration: `${duration}ms` });

    return result;
  } catch (error) {
    const duration = Date.now() - start;

    logger.error(`Performance: ${operation} failed`, {
      duration: `${duration}ms`,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    throw error;
  }
}
