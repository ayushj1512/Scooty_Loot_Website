/// <reference types="@nuxt/ui" />

import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: {
    enabled: true,
  },

  // ✅ CSS Files (Tailwind & Main)
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/main.css'
  ],

  modules: [
    ['@pinia/nuxt', {
      autoImports: ['defineStore'],
    }],
    ['@nuxt/ui', {
      global: true,
    }],
    '@vueuse/nuxt',
    ['@nuxt/icon', {
      collections: ['heroicons', 'simple-icons'],
    }],
    'vue-sonner/nuxt',
  ],

  imports: {
    dirs: ['stores'],
  },

  runtimeConfig: {
    // 🔒 Server-only
    typesenseApiKey: process.env.TYPESENSE_API_KEY || '',

    public: {
      // 🌐 Public runtime values
      apiBase: process.env.API_BASE || 'http://localhost:3000/api',
      typesenseBaseUrl: process.env.TYPESENSE_BASE_URL || '',
      typesenseProductsApiKey: process.env.TYPESENSE_PRODUCTS_API_KEY || '',
      typesenseConfigApiKey: process.env.TYPESENSE_CONFIG_API_KEY || '',
    },
  },

  plugins: [
    '~/plugins/motion.client.ts',
    '~/plugins/initSssConfig.ts',
    '~/plugins/piniaPersist.client.ts',
    // '~/plugins/initCategoryProducts.ts',
  ],

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icons/scooter.png',
        },
      ],
    },
  },

  vue: {
    compilerOptions: {},
  },

  nitro: {
    preset: 'node',
  },

  // ✅ Prevent HMR issues in production
  vite: {
    server: {
      hmr: process.env.NODE_ENV === 'production' ? false : true,
    },
  },
})
