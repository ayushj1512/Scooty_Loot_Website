// plugins/piniaPersist.client.ts
import { defineNuxtPlugin } from 'nuxt/app'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { Pinia } from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia
  pinia.use(piniaPluginPersistedstate)
})
