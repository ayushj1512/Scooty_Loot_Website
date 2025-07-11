import { defineStore } from 'pinia'
import { useRuntimeConfig } from '#imports'

export const useCategoryProducts = defineStore('categoryProducts', {
  state: () => ({
    items: [] as any[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchCategoryProducts() {
      const config = useRuntimeConfig()
      const baseUrl = config.public.typesenseBaseUrl
      const apiKey = config.public.typesenseProductsApiKey

      this.loading = true
      this.error = null

      console.log('📦 Base URL:', baseUrl)
      console.log('🔑 API Key:', apiKey)

      if (!baseUrl || !apiKey) {
        console.error('❌ Missing Typesense config')
        this.error = 'Missing Typesense config'
        this.loading = false
        return
      }

      try {
        const queryParams = new URLSearchParams({
          q: '*',
          filter_by: 'categories:=893',
          sort_by: 'date_updated_unix:desc',
          per_page: '50',
          page: '1'
        })

        const url = `${baseUrl}/products/documents/search?${queryParams.toString()}`
        console.log('🌐 Fetching category products from:', url)

        const response = await fetch(url, {
          headers: {
            'x-typesense-api-key': apiKey,
            'Content-Type': 'application/json'
          }
        })

        const json = await response.json()

        if (!response.ok) {
          console.error(`❌ HTTP ${response.status}: ${json.message || 'Unknown error'}`)
          throw new Error(json.message || 'Failed to fetch category products.')
        }

        const hits = json?.hits || []

        this.items = hits.map((hit: any) => {
          const doc = hit.document || hit
          const raw = doc.product_data ? JSON.parse(doc.product_data) : null
          const image = raw?.images?.[0]?.bigImg?.replace(/\\/g, '/') || doc.img || '/placeholder.png'

          return {
            id: doc.id,
            name: doc.name,
            price: doc.selling_price || doc.real_selling_price || 0,
            image
          }
        })
      } catch (err) {
        console.error('❌ Error fetching category products:', err)
        this.error = 'Failed to load category products.'
      } finally {
        this.loading = false
      }
    }
  }
})
