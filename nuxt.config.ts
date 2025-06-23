// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
    'vue-sonner/nuxt'
  ],

  // @ts-expect-error - not recognized by default Nuxt config types
  ui: {
    global: true
  },

  icon: {
    collections: ['heroicons', 'simple-icons']
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000/api'
    }
  },

  plugins: ['~/plugins/motion.client.ts'],

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/icons/scooter.png'
        }
      ]
    }
  }
})
