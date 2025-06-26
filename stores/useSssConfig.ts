import { defineStore } from 'pinia'

export const useSssConfig = defineStore('sssConfig', {
  state: () => ({
    loading: false,
    loaded: false,
    data: null as Record<string, any> | null, // ✅ Type-safe
  }),

  actions: {
    async fetchConfig() {
      if (this.loaded || this.loading) return // ✅ Skip if already fetched or fetching

      this.loading = true
      try {
        const res = await fetch(
          'https://api.streetstylestore.com/collections/sss_config/documents/scootyloot-slider?a=1&x-typesense-api-key=F5gdSFxpg6bi8ZXfuybIsQy074HtBDkC'
        )

        const json = await res.json()
        this.data = JSON.parse(json.data)
        this.loaded = true
      } catch (error) {
        console.error('❌ Error fetching SSS config:', error)
        this.data = null
        this.loaded = false
      } finally {
        this.loading = false
      }
    },
  },

  // ✅ Optional: Persist in client only (e.g. skip for server-side prefetching)
  persist: {
    storage: typeof window !== 'undefined' ? localStorage : undefined, // skip persist on SSR
  },
})
