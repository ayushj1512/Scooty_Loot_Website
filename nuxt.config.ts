/// <reference types="@nuxt/ui" />

import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

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
    // ❌ Private server-only (if needed)
    typesenseApiKey: process.env.TYPESENSE_API_KEY || '',

    public: {
      // ✅ Public client/server
      apiBase: process.env.API_BASE || 'http://localhost:3000/api',

      // ✅ Shared base URL for all Typesense endpoints
      typesenseBaseUrl: process.env.TYPESENSE_BASE_URL || '',

      // ✅ Separate API keys
      typesenseProductsApiKey: process.env.TYPESENSE_PRODUCTS_API_KEY || '',
      typesenseConfigApiKey: process.env.TYPESENSE_CONFIG_API_KEY || '',
    },
  },

  plugins: [
    '~/plugins/motion.client.ts',
    '~/plugins/initSssConfig.ts',
    '~/plugins/piniaPersist.client.ts',
    // '~/plugins/initCategoryProducts.ts', // Uncomment if needed
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
})
