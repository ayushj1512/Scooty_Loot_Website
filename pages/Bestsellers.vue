<template>
  <!-- ✅ Toast Notification -->
  <transition name="slide-fade">
    <div
      v-if="showToast"
      class="fixed top-6 right-6 z-50 max-w-sm w-full bg-white border-l-4 border-green-500 text-green-800 px-4 py-3 shadow-lg rounded-lg flex items-start gap-3"
      role="alert"
    >
      <div class="text-2xl">✅</div>
      <div class="flex-1">
        <p class="font-semibold text-sm">Success</p>
        <p class="text-sm">{{ toastMessage }}</p>
      </div>
      <button
        @click="showToast = false"
        class="text-green-800 hover:text-red-500 text-xl font-bold ml-2 transition"
      >
        &times;
      </button>
    </div>
  </transition>

  <!-- ✅ Main Section -->
  <div class="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
    <!-- ✅ Header -->
    <div class="text-center py-10 px-4">
      <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
        “Cravings? Here’s What Everyone’s Ordering!”
      </h1>
      <p class="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
        From spicy classics to sweet cravings — these are the dishes ruling everyone's cart!
      </p>
    </div>

    <!-- ✅ Sort Tags -->
    <div class="flex flex-wrap justify-center gap-3 px-4 mb-8">
      <button
        v-for="tag in sortTags"
        :key="tag.value"
        @click="sortBy = tag.value"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
          sortBy === tag.value
            ? 'bg-red-500 text-white shadow-md'
            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
        ]"
      >
        {{ tag.label }}
      </button>
    </div>

    <!-- ✅ Product Grid -->
    <div class="px-4 max-w-7xl mx-auto">
      <!-- 🌀 Shimmer Loader -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="i in shimmerCount"
          :key="i"
          class="relative bg-gray-100 shimmer-card h-64 rounded-xl shadow p-4 w-full overflow-hidden"
        >
          <div class="h-32 rounded mb-4 bg-gray-300 shimmer-box"></div>
          <div class="h-4 w-3/4 rounded mb-2 bg-gray-300 shimmer-box"></div>
          <div class="h-4 w-1/2 rounded bg-gray-300 shimmer-box"></div>
        </div>
      </div>

      <!-- ✅ Rendered Products -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="dish in paginatedProducts"
          :key="dish.id"
          class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300"
        >
          <img
            :src="dish.image"
            alt=""
            loading="lazy"
            class="w-full h-48 object-cover object-center transition duration-300 group-hover:scale-105 cursor-pointer"
          />
          <div class="p-4 flex flex-col justify-between h-[calc(100%-192px)]">
            <div>
              <h4 class="font-semibold text-lg text-gray-800 truncate">{{ dish.name }}</h4>
              <p class="text-sm text-gray-500 mt-1 line-clamp-2">
                {{ dish.description }}
              </p>
            </div>
            <div class="flex justify-between items-center mt-4">
              <p class="text-red-600 font-bold text-lg">₹{{ dish.price }}</p>
              <button
                @click="addToCart(dish)"
                class="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full text-xs transition shadow-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ Pagination -->
    <div class="flex justify-center mt-10 space-x-4">
      <button
        @click="currentPage--"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm disabled:opacity-50"
      >
        ← Previous
      </button>
      <button
        @click="currentPage++"
        :disabled="currentPage >= totalPages"
        class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const cartStore = useCartStore()

type SortType = 'latest' | 'priceAsc' | 'priceDesc'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  restaurantId?: string
  product_data?: any
}

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  restaurantId: string
  quantity: number
}

const bestsellers = ref<Product[]>([])
const loading = ref(true)
const shimmerCount = ref(8)
const currentPage = ref(1)
const perPage = 16
const sortBy = ref<SortType>('latest')

// Toast logic
const showToast = ref(false)
const toastMessage = ref('')
const triggerToast = (message: string) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => (showToast.value = false), 2500)
}

// ✅ Explicitly typed sort tags
const sortTags: { label: string; value: SortType }[] = [
  { label: 'Latest', value: 'latest' },
  { label: 'Price: Low to High', value: 'priceAsc' },
  { label: 'Price: High to Low', value: 'priceDesc' }
]

const totalPages = computed(() => Math.ceil(bestsellers.value.length / perPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return bestsellers.value.slice(start, start + perPage)
})

// API Fetch Logic
const fetchBestsellers = async () => {
  loading.value = true
  try {
const apiKey = config.public.typesenseProductsApiKey
    const baseUrl = config.public.typesenseBaseUrl

    console.log('📦 Typesense Base URL:', baseUrl)
    console.log('🔑 Typesense API Key:', apiKey)

    if (!apiKey || !baseUrl) {
      console.error('❌ Missing API key or base URL')
      return
    }

    const queryParams = new URLSearchParams({
      q: '*',
      filter_by: 'categories:=893',
      sort_by: 'date_updated_unix:desc',
      per_page: '100',
      page: '1',
      'x-typesense-api-key': apiKey
    })

    const url = `${baseUrl}/products/documents/search?${queryParams.toString()}`
    console.log('🌐 Fetching Bestsellers from URL:', url)

    const res = await fetch(url)
    const json = await res.json()

    if (!res.ok) {
      console.error(`❌ HTTP ${res.status}: ${json.message || 'Unknown error'}`)
      throw new Error(json.message || 'Failed to fetch bestsellers.')
    }

    console.log('✅ Response JSON:', json)

    if (!json?.hits || !Array.isArray(json.hits)) {
      console.warn('⚠️ Unexpected response structure:', json)
      bestsellers.value = []
      return
    }

    const data: Product[] = json.hits.map((h: any) => {
      const doc = h.document || h
      const raw = doc.product_data ? JSON.parse(doc.product_data) : null
      const image = raw?.images?.[0]?.bigImg?.replace(/\\/g, '/') || doc.img || '/placeholder.png'

      return {
        id: doc.id,
        name: doc.name,
        description: doc.description_short || 'This is a delicious bestselling product!',
        price: doc.selling_price || doc.real_selling_price || 0,
        image,
        restaurantId: doc.restaurantId || 'main',
        product_data: doc.product_data
      }
    })

    // Sort logic
    if (sortBy.value === 'priceAsc') data.sort((a, b) => a.price - b.price)
    else if (sortBy.value === 'priceDesc') data.sort((a, b) => b.price - a.price)

    bestsellers.value = data
    currentPage.value = 1
    console.log('🛒 Bestsellers loaded:', data)
  } catch (err) {
    console.error('❌ Error fetching bestsellers:', err)
    bestsellers.value = []
  } finally {
    loading.value = false
  }
}




const addToCart = (product: Product) => {
  const item: CartItem = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    restaurantId: product.restaurantId || 'main',
    quantity: 1
  }

  if (cartStore.canAddFromRestaurant(item.restaurantId)) {
    cartStore.addItem(item)
    triggerToast(`"${product.name}" added to cart`)
  } else {
    alert('You can only add items from the same restaurant.')
  }
}

onMounted(fetchBestsellers)
watch(sortBy, fetchBestsellers)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.shimmer-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0) 100%);
  animation: shimmer 1.3s infinite linear;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
