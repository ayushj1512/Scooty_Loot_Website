/// <reference types="@nuxt/ui" />

import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: {
    enabled: true, // ✅ This is the correct place to enable Nuxt DevTools
  },

  css: ['~/assets/css/main.css'],

  modules: [
    // ✅ Pinia for state management
    ['@pinia/nuxt', {
      autoImports: ['defineStore'],
    }],

    // ✅ Nuxt UI for built-in components
    ['@nuxt/ui', {
      global: true,
    }],

    // ✅ Composables & utilities
    '@vueuse/nuxt',

    // ✅ Icon module
    ['@nuxt/icon', {
      collections: ['heroicons', 'simple-icons'],
    }],

    // ✅ Toast / Notification
    'vue-sonner/nuxt',
  ],

  imports: {
    dirs: ['stores'], // Auto-import Pinia stores
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000/api',
    },
  },

  plugins: [
    '~/plugins/motion.client.ts',
    '~/plugins/initSssConfig.ts',
    // '~/plugins/initCategoryProducts.ts', // Uncomment if needed
    '~/plugins/piniaPersist.client.ts',
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

  // ✅ If you need Vue devtools for debugging, set this in nuxt.config:
  vue: {
    compilerOptions: {},
  },

  nitro: {
    preset: 'node',
  },
})
