<template>
  <section class="py-16 bg-green-50">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">🚀 Quick Needs (Under 15 Mins)</h2>
        <NuxtLink to="/quick-needs" class="text-sm font-medium text-green-600 hover:underline">See All</NuxtLink>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        <div v-for="product in quickItems" :key="product.id"
          class="group bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col justify-between">
          <!-- Image -->
          <div class="relative cursor-pointer" @click="openDialog(product)">
            <img :src="product.thumbnail" alt="product"
              class="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
            <div class="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">15 min</div>
          </div>

          <!-- Info -->
          <div class="p-4 flex flex-col gap-2">
            <h3 class="text-sm font-bold text-gray-800 truncate">{{ product.title }}</h3>
            <p class="text-xs text-gray-500 line-clamp-2">{{ product.description }}</p>
            <div class="flex justify-between items-center text-xs font-medium text-gray-700">
              <span class="text-yellow-500">⭐ {{ product.rating }}</span>
              <span class="text-green-700 font-bold">₹{{ product.price }}</span>
            </div>

            <!-- Add to Cart Button -->
            <button @click="addToCart(product)"
              class="mt-2 py-1.5 w-full text-center text-xs font-semibold bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Dialog -->
    <ProductDialog v-if="showDialog" :product="selectedProduct" :show="showDialog" @close="showDialog = false"
      @add="addToCart" />

    <!-- Notification Toast -->
    <transition name="slide-fade">
      <div v-if="showNotification"
        class="fixed top-5 right-5 z-[9999] max-w-sm w-full bg-gradient-to-br from-green-50 to-white border-l-[6px] border-green-500 text-green-900 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-start gap-3 animate-fade-in-up"
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
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'
import ProductDialog from '~/components/ProductDialog.vue'

const cartStore = useCartStore()
const quickItems = ref([])

const showDialog = ref(false)
const selectedProduct = ref(null)

const showNotification = ref(false)
const notificationMessage = ref('')

function triggerNotification(msg) {
  notificationMessage.value = msg
  showNotification.value = true
  setTimeout(() => (showNotification.value = false), 2500)
}

onMounted(async () => {
  const res = await fetch('https://dummyjson.com/products?limit=10')
  const data = await res.json()
  quickItems.value = data.products
})

function openDialog(product) {
  selectedProduct.value = product
  showDialog.value = true
}

function addToCart(product) {
  const item = {
    id: product.id,
    name: product.title,
    price: product.price,
    image: product.thumbnail,
    restaurantId: product.restaurantId || 2
  }

  if (cartStore.canAddFromRestaurant(item.restaurantId)) {
    cartStore.addItem(item)
    triggerNotification(`"${item.name}" added to cart`)
    showDialog.value = false
  } else {
    alert('You can only add items from the same restaurant.')
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out;
}
</style>
