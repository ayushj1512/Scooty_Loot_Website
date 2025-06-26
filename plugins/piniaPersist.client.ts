import { defineNuxtPlugin } from 'nuxt/app'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Pinia } from 'pinia' // ✅ Import correct type

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia // ✅ Type assertion to avoid TS error
  pinia.use(piniaPluginPersistedstate)
})
