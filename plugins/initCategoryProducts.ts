// plugins/initCategoryProducts.ts
import { defineNuxtPlugin } from 'nuxt/app'
import { useCategoryProducts } from '~/stores/useCategoryProducts'

export default defineNuxtPlugin(async () => {
  const store = useCategoryProducts()
  const defaultCategoryId = '892'

  // ✅ Only fetch if different category is not already loaded
  if (store.loadedCategoryId !== defaultCategoryId) {
    await store.fetchCategoryProducts(defaultCategoryId)
  }
})
