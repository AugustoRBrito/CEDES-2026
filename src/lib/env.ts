import { z } from 'zod';

/**
 * Schema de validação para variáveis de ambiente
 * Garante que todas as variáveis necessárias estejam presentes e válidas
 */
const envSchema = z.object({
  // URLs principais
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),

  // Analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_HOTJAR_ID: z.string().optional(),

  // Configurações
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),

  // Feature flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .default('false')
    .transform(val => val === 'true'),
  NEXT_PUBLIC_ENABLE_ERROR_REPORTING: z
    .string()
    .default('false')
    .transform(val => val === 'true'),

  // Assets
  NEXT_PUBLIC_CDN_URL: z.string().url().optional(),
  NEXT_PUBLIC_IMAGES_DOMAIN: z.string().optional(),
});

/**
 * Validação das variáveis de ambiente
 * Falha na build se alguma variável obrigatória estiver ausente ou inválida
 */
const parseEnv = () => {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:', parsed.error.format());
    process.exit(1);
  }

  return parsed.data;
};

export const env = parseEnv();

// Export individual environment variables with proper typing
export const {
  NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_HOTJAR_ID,
  LOG_LEVEL,
  NEXT_PUBLIC_ENABLE_ANALYTICS,
  NEXT_PUBLIC_ENABLE_ERROR_REPORTING,
  NEXT_PUBLIC_CDN_URL,
  NEXT_PUBLIC_IMAGES_DOMAIN,
} = env;
