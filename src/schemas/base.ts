/**
 * Schemas base para validação de dados comuns
 */

import { z } from 'zod';

// ==================== SCHEMAS BÁSICOS ====================

export const EmailSchema = z
  .string()
  .min(1, 'Email é obrigatório')
  .email('Formato de email inválido')
  .max(255, 'Email muito longo');

export const UrlSchema = z
  .string()
  .url('URL inválida')
  .max(2048, 'URL muito longa');

export const PhoneSchema = z
  .string()
  .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Número de telefone inválido');

export const CNPJSchema = z
  .string()
  .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/, 'CNPJ inválido')
  .refine(cnpj => {
    const digits = cnpj.replace(/[^\d]/g, '');
    if (digits.length !== 14) return false;

    // Validação básica de CNPJ (algoritmo completo seria mais extenso)
    if (/^(\d)\1{13}$/.test(digits)) return false;

    return true;
  }, 'CNPJ inválido');

export const CEPSchema = z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido');

export const DateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD')
  .refine(date => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, 'Data inválida');

// ==================== SCHEMAS DE ID ====================

export const IdSchema = z
  .number()
  .int('ID deve ser um número inteiro')
  .positive('ID deve ser positivo');

export const SlugSchema = z
  .string()
  .min(1, 'Slug é obrigatório')
  .max(100, 'Slug muito longo')
  .regex(
    /^[a-z0-9-]+$/,
    'Slug deve conter apenas letras minúsculas, números e hífens'
  );

// ==================== SCHEMAS DE TEXTO ====================

export const TitleSchema = z
  .string()
  .min(1, 'Título é obrigatório')
  .max(200, 'Título muito longo')
  .trim();

export const DescriptionSchema = z
  .string()
  .min(10, 'Descrição deve ter pelo menos 10 caracteres')
  .max(1000, 'Descrição muito longa')
  .trim();

export const ContentSchema = z
  .string()
  .min(1, 'Conteúdo é obrigatório')
  .max(10000, 'Conteúdo muito longo')
  .trim();

// ==================== SCHEMAS DE UPLOAD ====================

export const ImageUrlSchema = z
  .string()
  .url('URL da imagem inválida')
  .refine(url => {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'];
    return validExtensions.some(
      ext =>
        url.toLowerCase().includes(ext) ||
        url.includes('placeholder') ||
        url.includes('unsplash') ||
        url.includes('cdn')
    );
  }, 'URL deve apontar para uma imagem válida');

// ==================== SCHEMAS DE CONTATO ====================

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo')
    .trim(),
  email: EmailSchema,
  phone: PhoneSchema.optional(),
  subject: TitleSchema,
  message: z
    .string()
    .min(10, 'Mensagem deve ter pelo menos 10 caracteres')
    .max(2000, 'Mensagem muito longa')
    .trim(),
  consent: z
    .boolean()
    .refine(val => val === true, 'É necessário concordar com os termos'),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
