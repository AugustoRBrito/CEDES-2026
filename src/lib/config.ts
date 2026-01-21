/**
 * Constantes de configuração da aplicação
 */

import { env } from '@/lib/env';

export const APP_CONFIG = {
  // URLs principais
  APP_URL: env.NEXT_PUBLIC_APP_URL,
  API_URL: env.NEXT_PUBLIC_API_URL,

  // Meta informações
  APP_NAME: 'CADES',
  APP_DESCRIPTION: 'Associação CADES - Servindo a comunidade',
  APP_KEYWORDS: ['cades', 'associação', 'comunidade', 'social', 'projetos'],

  // Configurações de mídia
  IMAGE_DOMAINS: env.NEXT_PUBLIC_IMAGES_DOMAIN
    ? [env.NEXT_PUBLIC_IMAGES_DOMAIN]
    : ['localhost'],

  // Navegação
  NAVIGATION_ITEMS: [
    { id: 1, label: 'Home', path: '/' },
    { id: 2, label: 'Sobre', path: '/#about' },
    { id: 3, label: 'O Que Fazemos', path: '/#whatWeDo' },
    { id: 4, label: 'Projetos', path: '/#projects' },
    { id: 6, label: 'Blog', path: '/#blog' },
    { id: 7, label: 'Transparência', path: '/transparency' },
  ] as const,

  // Contato
  CONTACT: {
    email: 'contato@cades.org.br',
    phone: '+55 (61) 9999-9999',
    address: 'Brasília, DF',
  },

  // Redes sociais
  SOCIAL_MEDIA: {
    facebook: 'https://facebook.com/cades',
    instagram: 'https://instagram.com/cades',
    linkedin: 'https://linkedin.com/company/cades',
    youtube: 'https://youtube.com/cades',
  },

  // Configurações de performance
  PERFORMANCE: {
    IMAGE_QUALITY: 85,
    IMAGE_PLACEHOLDER: 'blur',
    LAZY_LOADING_THRESHOLD: 300,
  },

  // Features flags
  FEATURES: {
    ANALYTICS: env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    ERROR_REPORTING: env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING,
    MAINTENANCE_MODE: false,
  },
} as const;

// Tipos derivados das constantes
export type NavigationItem = (typeof APP_CONFIG.NAVIGATION_ITEMS)[number];
