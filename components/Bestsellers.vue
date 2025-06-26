<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'
import ProductDialog from '~/components/ProductDialog.vue'
import { useFetch } from 'nuxt/app'

// ✅ Define Bestseller type
interface Bestseller {
  id: string
  name: string
  price: number
  description: string
  image: string
  restaurantId?: string
}

// ✅ SSR fetch with correct type
const { data: bestsellers, pending: loadingBS } = useFetch<Bestseller[]>('/api/bestsellers')

const cartStore = useCartStore()
const selectedProduct = ref<Bestseller | null>(null)
const showDialog = ref(false)
const notificationMessage = ref('')
const showNotification = ref(false)

function triggerNotification(message: string) {
  notificationMessage.value = message
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 2500)
}

function openDialog(product: Bestseller) {
  selectedProduct.value = product
  showDialog.value = true
}

function addToCart(product: Bestseller) {
  const item = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    restaurantId: product.restaurantId || 'main',
  }

  if (cartStore.canAddFromRestaurant(item.restaurantId)) {
    cartStore.addItem(item)
    triggerNotification(`"${product.name}" added to cart`)
    showDialog.value = false
  } else {
    alert('You can only add items from the same restaurant.')
  }
}
</script>

<template>
  <!-- ✅ Notification -->
  <transition name="slide-fade">
    <div v-if="showNotification"
      class="fixed top-5 right-5 z-50 max-w-sm w-full bg-gradient-to-br from-green-50 to-white border-l-[6px] border-green-500 text-green-900 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-start gap-3 animate-fade-in-up"
      role="alert">
      <div class="text-2xl animate-bounce">✅</div>
      <div class="flex-1">
        <p class="font-semibold text-sm">Success</p>
        <p class="text-xs text-gray-700 mt-0.5">{{ notificationMessage }}</p>
      </div>
      <button @click="showNotification = false"
        class="text-green-800 hover:text-red-500 hover:rotate-90 transition duration-300 text-lg">
        &times;
      </button>
    </div>
  </transition>

  <!-- ✅ Product Dialog -->
  <ProductDialog v-if="selectedProduct" :product="selectedProduct" :show="showDialog" @close="showDialog = false" />

  <!-- ✅ Horizontal Bestseller Section -->
  <section class="py-12 bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-2xl font-extrabold text-gray-900">🔥 Bestsellers</h3>
        <NuxtLink to="/bestsellers" class="text-sm font-medium text-red-500 hover:underline">
          View All →
        </NuxtLink>
      </div>

      <!-- Loading shimmer -->
      <div v-if="loadingBS" class="flex space-x-4 overflow-x-auto no-scrollbar">
        <div v-for="i in 5" :key="i"
          class="min-w-[240px] bg-gray-100 shimmer-card h-64 rounded-xl shadow p-4 overflow-hidden relative">
          <div class="h-32 rounded mb-4 bg-gray-300 shimmer-box"></div>
          <div class="h-4 w-3/4 rounded mb-2 bg-gray-300 shimmer-box"></div>
          <div class="h-4 w-1/2 rounded bg-gray-300 shimmer-box"></div>
        </div>
      </div>

      <!-- Render bestsellers -->
      <div v-else-if="bestsellers?.length" class="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
        <div v-for="dish in bestsellers.slice(0, 5)" :key="dish.id"
          class="min-w-[240px] group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
          <img :src="dish.image" alt="" loading="lazy"
            class="w-full h-40 object-cover object-center transition duration-300 group-hover:scale-105 cursor-pointer"
            @click="openDialog(dish)" />
          <div class="p-4 flex flex-col justify-between h-[calc(100%-160px)]">
            <div>
              <h4 class="font-semibold text-lg text-gray-800 truncate">{{ dish.name }}</h4>
              <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ dish.description }}</p>
            </div>
            <div class="flex justify-between items-center mt-3">
              <p class="text-red-600 font-bold text-base">₹{{ dish.price }}</p>
              <button @click.stop="addToCart(dish)"
                class="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full text-xs transition shadow-md">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.shimmer-card::after {
  content: "";
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
</style>
