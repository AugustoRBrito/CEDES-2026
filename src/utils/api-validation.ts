/**
 * Utilitários para validação de dados de API
 * Garante que dados externos estejam seguros e válidos
 */

import { sanitizeJson } from '@/utils/sanitize';
import { z } from 'zod';

// ==================== TIPOS DE VALIDAÇÃO ====================

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
}

export interface ApiValidationOptions {
  sanitize?: boolean;
  maxSize?: number; // em bytes
  requiredFields?: string[];
}

// ==================== VALIDADOR GENÉRICO ====================

/**
 * Valida dados usando um schema Zod com sanitização opcional
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  options: ApiValidationOptions = {}
): ValidationResult<T> {
  const { sanitize = true, maxSize = 1024 * 1024 } = options; // 1MB padrão

  try {
    // Verificar tamanho dos dados
    const dataSize = JSON.stringify(data).length;
    if (dataSize > maxSize) {
      return {
        success: false,
        errors: ['Dados muito grandes para processamento'],
      };
    }

    // Sanitizar dados se solicitado
    const processedData = sanitize ? sanitizeJson(data) : data;

    // Validar com Zod
    const result = schema.safeParse(processedData);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      return {
        success: false,
        errors: result.error.issues.map(
          err => `${err.path.join('.')}: ${err.message}`
        ),
      };
    }
  } catch (error) {
    return {
      success: false,
      errors: ['Erro interno na validação dos dados'],
    };
  }
}

/**
 * Valida array de dados
 */
export function validateArray<T>(
  schema: z.ZodSchema<T>,
  data: unknown[],
  options: ApiValidationOptions = {}
): ValidationResult<T[]> {
  if (!Array.isArray(data)) {
    return {
      success: false,
      errors: ['Dados devem ser um array'],
    };
  }

  const arraySchema = z.array(schema);
  return validateData(arraySchema, data, options);
}

// ==================== VALIDAÇÃO DE RESPOSTA DE API ====================

/**
 * Valida resposta de API externa
 */
export async function validateApiResponse<T>(
  response: Response,
  schema: z.ZodSchema<T>
): Promise<ValidationResult<T>> {
  try {
    // Verificar status HTTP
    if (!response.ok) {
      return {
        success: false,
        errors: [`Erro HTTP: ${response.status} - ${response.statusText}`],
      };
    }

    // Verificar Content-Type
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return {
        success: false,
        errors: ['Resposta deve ser JSON'],
      };
    }

    // Tentar fazer parse do JSON
    const data = await response.json();

    // Validar dados
    return validateData(schema, data, { sanitize: true });
  } catch (error) {
    return {
      success: false,
      errors: ['Erro ao processar resposta da API'],
    };
  }
}

// ==================== VALIDAÇÃO DE UPLOAD ====================

/**
 * Valida arquivo para upload
 */
export function validateFile(
  file: File,
  options: {
    maxSize?: number;
    allowedTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): ValidationResult<File> {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB padrão
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.pdf'],
  } = options;

  const errors: string[] = [];

  // Verificar tamanho
  if (file.size > maxSize) {
    errors.push(`Arquivo muito grande. Máximo: ${maxSize / (1024 * 1024)}MB`);
  }

  // Verificar tipo MIME
  if (!allowedTypes.includes(file.type)) {
    errors.push(`Tipo de arquivo não permitido: ${file.type}`);
  }

  // Verificar extensão
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    errors.push(`Extensão não permitida: ${extension}`);
  }

  // Verificar nome do arquivo
  if (file.name.length > 255) {
    errors.push('Nome do arquivo muito longo');
  }

  if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
    errors.push('Nome do arquivo contém caracteres inválidos');
  }

  if (errors.length === 0) {
    return {
      success: true,
      data: file,
    };
  } else {
    return {
      success: false,
      errors,
    };
  }
}

// ==================== VALIDAÇÃO DE FORMULÁRIOS ====================

/**
 * Valida dados de formulário com sanitização automática
 */
export function validateFormData<T>(
  schema: z.ZodSchema<T>,
  formData: FormData,
  htmlFields: string[] = []
): ValidationResult<T> {
  try {
    // Converter FormData para objeto
    const data: Record<string, unknown> = {};

    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        // Sanitizar campos HTML se especificado
        if (htmlFields.includes(key)) {
          data[key] = value; // Será sanitizado pelo validateData
        } else {
          data[key] = value.trim();
        }
      } else {
        data[key] = value;
      }
    }

    return validateData(schema, data, { sanitize: true });
  } catch (error) {
    return {
      success: false,
      errors: ['Erro ao processar dados do formulário'],
    };
  }
}

// ==================== RATE LIMITING ====================

const requestCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * Implementa rate limiting simples
 */
export function isRateLimited(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutos
): boolean {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record || now > record.resetTime) {
    // Novo período ou primeiro request
    requestCounts.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count++;
  return false;
}

/**
 * Limpa registros antigos de rate limiting
 */
export function cleanupRateLimit(): void {
  const now = Date.now();
  for (const [key, record] of requestCounts.entries()) {
    if (now > record.resetTime) {
      requestCounts.delete(key);
    }
  }
}
