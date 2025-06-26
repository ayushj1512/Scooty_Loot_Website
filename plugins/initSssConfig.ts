// plugins/initSssConfig.ts
import { defineNuxtPlugin } from 'nuxt/app'
import { useSssConfig } from '~/stores/useSssConfig'

export default defineNuxtPlugin(async (nuxtApp) => {
  const store = useSssConfig()

  // Avoid refetching if already loaded
  if (!store.loaded && !store.loading) {
    await store.fetchConfig()
  }
})
