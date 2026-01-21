/**
 * Schemas específicos para entidades do domínio CADES
 * Integrado com sistema de tipos rigoroso
 */

import type { ProjectItem as ProjectItemType } from '@/types';
import { z } from 'zod';
import {
  CEPSchema,
  CNPJSchema,
  DateStringSchema,
  DescriptionSchema,
  IdSchema,
  ImageUrlSchema,
  TitleSchema,
} from './base';

// ==================== SCHEMA DE PROJETO ====================

export const ProjectItemSchema = z.object({
  id: IdSchema,
  title: TitleSchema,
  description: DescriptionSchema,
  imageUrl: ImageUrlSchema,
}) satisfies z.ZodType<
  Pick<ProjectItemType, 'id' | 'title' | 'description' | 'imageUrl'>
>;

export type ProjectItem = z.infer<typeof ProjectItemSchema>;

// ==================== SCHEMA DE BLOG ====================

export const BlogItemSchema = z.object({
  id: IdSchema,
  title: TitleSchema,
  description: DescriptionSchema,
  imageUrl: ImageUrlSchema,
  date: DateStringSchema,
  slug: z.string().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type BlogItem = z.infer<typeof BlogItemSchema>;

// ==================== SCHEMA DE MENU ====================

export const MenuItemSchema = z.object({
  id: IdSchema,
  label: z
    .string()
    .min(1, 'Label do menu é obrigatório')
    .max(50, 'Label muito longo'),
  path: z.string().min(1, 'Path é obrigatório').max(200, 'Path muito longo'),
  external: z.boolean().optional(),
  icon: z.string().optional(),
});

export type MenuItem = z.infer<typeof MenuItemSchema>;

// ==================== SCHEMA DE PROJETO EM DESTAQUE ====================

export const EmphasisProjectSchema = z.object({
  id: IdSchema,
  title: TitleSchema,
  description: DescriptionSchema,
  imageUrl: ImageUrlSchema,
  date: DateStringSchema,
  category: z.string().optional(),
  featured: z.boolean().optional(),
});

export type EmphasisProject = z.infer<typeof EmphasisProjectSchema>;

// ==================== SCHEMA DE OSC ====================

export const OSCSchema = z.object({
  razaoSocial: z.string().min(1, 'Razão social é obrigatória'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  cnpj: CNPJSchema,
  localidade: z.string().min(1, 'Localidade é obrigatória'),
  uf: z.string().length(2, 'UF deve ter 2 caracteres'),
  cep: CEPSchema,
  representanteLegal: z.string().min(1, 'Representante legal é obrigatório'),
});

// ==================== SCHEMA DE DADOS COMPLEMENTARES ====================

export const DadosComplementaresSchema = z.object({
  emendaParlamentar: z.string().min(1, 'Emenda parlamentar é obrigatória'),
  proposta: z.string().min(1, 'Proposta é obrigatória'),
  processoAdministrativo: z
    .string()
    .min(1, 'Processo administrativo é obrigatório'),
});

// ==================== SCHEMA DE VALOR GLOBAL ====================

export const ValorGlobalSchema = z.object({
  valor: z.string().min(1, 'Valor é obrigatório'),
  acaoOrcamentaria: z.string().min(1, 'Ação orçamentária é obrigatória'),
  ptres: z.string().min(1, 'PTRES é obrigatório'),
  naturezaDespesa: z.string().min(1, 'Natureza da despesa é obrigatória'),
  notaEmpenho: z.string().min(1, 'Nota de empenho é obrigatória'),
  unidadeGestora: z.string().min(1, 'Unidade gestora é obrigatória'),
  fonteRecursos: z.string().min(1, 'Fonte de recursos é obrigatória'),
  valorRemuneracaoEquipeTrabalho: z
    .string()
    .min(1, 'Valor de remuneração é obrigatório'),
});

// ==================== SCHEMA COMPLETO DE PROJETO DE TRANSPARÊNCIA ====================

export const ProjetoTransparenciaSchema = z.object({
  tituloProjeto: z.string().min(1, 'Título do projeto é obrigatório'),
  osc: OSCSchema,
  dadosComplementares: DadosComplementaresSchema,
  descricaoObjeto: z.string().min(1, 'Descrição do objeto é obrigatória'),
  periodoExecucao: z.string().min(1, 'Período de execução é obrigatório'),
  valorGlobal: ValorGlobalSchema,
  prestacaoContas: z.string().min(1, 'Prestação de contas é obrigatória'),
  situacaoPrestacaoContas: z
    .string()
    .min(1, 'Situação da prestação de contas é obrigatória'),
  realizacaoImagem: ImageUrlSchema,
  apoioImagem: ImageUrlSchema,
});

export type ProjetoTransparencia = z.infer<typeof ProjetoTransparenciaSchema>;

// ==================== SCHEMA DE RESPOSTA DE API ====================

export const ApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    success: z.boolean(),
    error: z.string().optional(),
    message: z.string().optional(),
    timestamp: z.string().optional(),
  });

// ==================== SCHEMAS DE LISTAS ====================

export const ProjectListSchema = z.array(ProjectItemSchema);
export const BlogListSchema = z.array(BlogItemSchema);
export const MenuListSchema = z.array(MenuItemSchema);
