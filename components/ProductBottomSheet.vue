<template>
  <div>
    <!-- Product Modal -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 bg-black bg-opacity-40 backdrop-blur-sm flex items-end md:items-center justify-center"
        @click.self="close"
      >
        <div class="bg-white w-full md:max-w-lg rounded-t-2xl md:rounded-2xl p-6 shadow-xl">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-lg font-semibold text-gray-900">{{ product.name }}</h2>
            <button class="text-gray-500 hover:text-red-500" @click="close">&times;</button>
          </div>

          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-48 object-cover rounded-lg mb-4"
          />

          <p class="text-gray-700 mb-4">{{ product.description }}</p>
          <div class="flex justify-between items-center">
            <p class="text-red-600 text-xl font-bold">₹{{ product.price }}</p>
            <button
              class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium"
              @click="addToCart"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Notification Toast -->
    <transition name="slide-fade">
      <div
        v-if="showNotification"
        class="fixed top-4 right-4 z-50 max-w-xs w-full bg-green-100 border-l-4 border-green-500 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-start space-x-3"
        role="alert"
      >
        <span class="text-xl">✅</span>
        <div class="flex-1">
          <p class="font-semibold text-sm">{{ notificationTitle }}</p>
          <p class="text-xs mt-0.5">{{ notificationMessage }}</p>
        </div>
        <button
          @click="showNotification = false"
          class="text-green-700 hover:text-green-900 transition text-lg leading-none"
        >
          &times;
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { useCartStore } from '~/stores/cart'

const props = defineProps<{
  isOpen: boolean
  product: any
}>()

const emit = defineEmits(['close'])
const cartStore = useCartStore()

const showNotification = ref(false)
const notificationMessage = ref('')
const notificationTitle = ref('Added to Cart')

const close = () => emit('close')

const triggerNotification = (message: string) => {
  notificationMessage.value = message
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
    notificationMessage.value = ''
  }, 2500)
}

const addToCart = () => {
  const item = {
    id: props.product.id,
    name: props.product.name,
    image: props.product.image,
    price: props.product.price,
    restaurantId: props.product.restaurantId || 'main'
  }

  if (cartStore.canAddFromRestaurant(item.restaurantId)) {
    cartStore.addItem(item)
    triggerNotification(`"${item.name}" has been added to your cart.`)
    close()
  } else {
    triggerNotification('You can only add items from the same restaurant.')
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
