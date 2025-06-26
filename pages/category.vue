<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryProducts } from '~/stores/useCategoryProducts'
import { useCartStore } from '~/stores/cart'
import { storeToRefs } from 'pinia'
import ProductQuickView from '../components/ProductDialog.vue'

const route = useRoute()
const store = useCategoryProducts()
const cartStore = useCartStore()

const { products, loading } = storeToRefs(store)
const selectedSort = ref('popular')

// ✅ Toast logic
const showToast = ref(false)
const toastMessage = ref('')
const triggerToast = (message: string) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => (showToast.value = false), 2500)
}

// ✅ Pagination
const currentPage = ref(1)
const itemsPerPage = 16

const paginatedSortedProducts = computed(() => {
  let sorted = [...products.value]
  if (selectedSort.value === 'priceLow') sorted.sort((a, b) => a.price - b.price)
  else if (selectedSort.value === 'priceHigh') sorted.sort((a, b) => b.price - a.price)
  const start = (currentPage.value - 1) * itemsPerPage
  return sorted.slice(start, start + itemsPerPage)
})

const totalPages = computed(() =>
  Math.ceil(products.value.length / itemsPerPage)
)

// ✅ Modal quick view state
const showModal = ref(false)
const selectedProduct = ref(null)

function openQuickView(product: any) {
  selectedProduct.value = product
  showModal.value = true
}

// ✅ Add to cart
function handleAddToCart(product: any) {
  const productWithRestaurant = {
    ...product,
    restaurantId: product.restaurantId || 'default-restaurant'
  }

  if (cartStore.canAddFromRestaurant(productWithRestaurant.restaurantId)) {
    cartStore.addItem(productWithRestaurant)
    triggerToast(`"${product.name}" added to cart`)
  } else {
    triggerToast('You can only add items from one restaurant at a time')
  }
}

// ✅ Fallback image
function onImageError(event: Event) {
  const target = event.target as HTMLImageElement
  if (target && target.tagName === 'IMG') target.src = '/fallback-icon.png'
}

// ✅ Fetch
onMounted(() => {
  const categoryId = (route.query.cat as string) || '892'
  store.fetchCategoryProducts(categoryId)
})

watch(() => route.query.cat, (newCat) => {
  store.fetchCategoryProducts((newCat as string) || '892')
})

watch(showModal, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<template>
  <!-- ✅ Toast -->
  <transition name="slide-fade">
    <div v-if="showToast"
      class="fixed top-6 right-6 z-50 max-w-sm w-full bg-white border-l-4 border-green-500 text-green-800 px-4 py-3 shadow-lg rounded-lg flex items-start gap-3"
      role="alert">
      <div class="text-2xl">✅</div>
      <div class="flex-1">
        <p class="font-semibold text-sm">Success</p>
        <p class="text-sm">{{ toastMessage }}</p>
      </div>
      <button @click="showToast = false" class="text-green-800 hover:text-red-500 text-xl font-bold ml-2 transition">
        &times;
      </button>
    </div>
  </transition>

  <div class="min-h-screen bg-white py-10 px-4 max-w-7xl mx-auto">
    <h1 class="text-3xl font-extrabold text-gray-900 mb-6 text-center">Category Products</h1>

    <!-- ✅ Sort Buttons -->
    <div class="flex flex-wrap justify-center gap-3 mb-10">
      <button class="px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200"
        :class="selectedSort === 'popular' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'"
        @click="selectedSort = 'popular'; currentPage = 1">
        Popular
      </button>
      <button class="px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200"
        :class="selectedSort === 'priceLow' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'"
        @click="selectedSort = 'priceLow'; currentPage = 1">
        Price: Low to High
      </button>
      <button class="px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200"
        :class="selectedSort === 'priceHigh' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'"
        @click="selectedSort = 'priceHigh'; currentPage = 1">
        Price: High to Low
      </button>
    </div>

    <!-- ✅ Shimmer Loader -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="n in 8" :key="n" class="animate-pulse bg-gray-100 p-4 rounded-xl shadow space-y-3">
        <div class="h-48 bg-gray-300 rounded-lg"></div>
        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="h-4 bg-gray-300 rounded w-1/4 mt-2"></div>
      </div>
    </div>

    <!-- ✅ Product Grid -->
    <transition-group name="fade-slide" tag="div" v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in paginatedSortedProducts" :key="product.id"
        class="bg-white border border-gray-200 rounded-xl shadow group hover:shadow-2xl transition p-4 cursor-pointer"
        @click="openQuickView(product)">
        <div class="relative overflow-hidden rounded-lg">
          <img :src="product.image" :alt="product.name"
            class="w-full h-48 object-cover rounded-lg transition duration-300 group-hover:scale-105"
            @error="onImageError" />
        </div>

        <h2 class="text-lg font-semibold text-gray-800 truncate mt-3">{{ product.name }}</h2>
        <p class="text-sm text-gray-500 line-clamp-2">{{ product.description }}</p>

        <div class="mt-3 flex justify-between items-center">
          <span class="text-red-600 font-bold text-base">₹{{ product.price }}</span>
          <button class="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition"
            @click.stop="handleAddToCart(product)">
            Add to Cart
          </button>
        </div>
      </div>
    </transition-group>

    <!-- ✅ Pagination Controls -->
    <div class="flex justify-center mt-10 space-x-4" v-if="totalPages > 1">
      <button @click="currentPage--" :disabled="currentPage === 1"
        class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm disabled:opacity-50">
        ← Prev
      </button>
      <button @click="currentPage++" :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm disabled:opacity-50">
        Next →
      </button>
    </div>
  </div>

  <!-- ✅ Product Modal -->
  <ProductQuickView v-if="selectedProduct" :show="showModal" :product="selectedProduct" @close="showModal = false" />
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 2s ease-in-out;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
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
