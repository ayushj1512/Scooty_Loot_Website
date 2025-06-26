/// <reference types="@nuxt/ui" />

import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },

  css: ["~/assets/css/main.css"],

  modules: [
    // ✅ Pinia module config
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore"],
      },
    ],

    // ✅ Nuxt UI module config
    [
      "@nuxt/ui",
      {
        global: true,
      },
    ],

    "@vueuse/nuxt",

    // ✅ Nuxt Icon config
    [
      "@nuxt/icon",
      {
        collections: ["heroicons", "simple-icons"],
      },
    ],

    "vue-sonner/nuxt",
  ],

  imports: {
    dirs: ["stores"], // Auto-import Pinia stores
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "http://localhost:3000/api",
    },
  },

  plugins: [
    "~/plugins/motion.client.ts",
    "~/plugins/initSssConfig.ts",
    "~/plugins/initCategoryProducts.ts",
    "~/plugins/piniaPersist.client.ts",
  ],

  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/icons/scooter.png",
        },
      ],
    },
  },
});
