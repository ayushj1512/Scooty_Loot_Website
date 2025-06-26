<template>
  <!-- BACKDROP -->
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <!-- MODAL -->
      <div class="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden relative" @click.stop>
        <!-- Close Button -->
        <button
          class="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
          @click="emit('close')"
        >
          ✕
        </button>

        <!-- PRODUCT CONTENT -->
        <div class="p-5 space-y-4">
          <img
            :src="mainImage"
            :alt="product.title || 'Product Image'"
            class="w-full h-48 object-contain rounded-md "
            @error="imageError"
          />

          <div>
            <h2 class="text-xl font-bold text-gray-800 mb-1">{{ product.title }}</h2>
            <p class="text-sm text-gray-600 line-clamp-3">
              {{ product.description || 'This is a delicious bestselling product you can’t miss!' }}
            </p>
          </div>

          <div class="flex justify-between items-center mt-4">
            <span class="text-yellow-500 text-sm">⭐ {{ product.rating || '4.5' }}</span>
            <span class="text-red-600 font-bold text-lg">₹{{ product.price }}</span>
          </div>

          <!-- ADD TO CART -->
          <button
            @click="addToCart"
            class="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </transition>

  <!-- ✅ NOTIFICATION TOAST -->
  <transition name="slide-fade">
    <div
      v-if="showNotification"
      class="fixed top-5 right-5 z-[9999] max-w-sm w-full bg-gradient-to-br from-green-50 to-white border-l-[6px] border-green-500 text-green-900 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-start gap-3 animate-fade-in-up"
      role="alert"
    >
      <div class="text-2xl animate-bounce">✅</div>
      <div class="flex-1">
        <p class="font-semibold text-sm">Success</p>
        <p class="text-xs text-gray-700 mt-0.5">{{ notificationMessage }}</p>
      </div>
      <button
        @click="showNotification = false"
        class="text-green-800 hover:text-red-500 hover:rotate-90 transition duration-300 text-lg"
      >
        &times;
      </button>
    </div>
  </transition>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCartStore } from '~/stores/cart'

const emit = defineEmits(['close'])

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  show: {
    type: Boolean,
    required: true
  }
})

const cart = useCartStore()
const showNotification = ref(false)
const notificationMessage = ref('')

const triggerNotification = (message) => {
  notificationMessage.value = message
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 2500)
}

const mainImage = computed(() => {
  try {
    const raw = props.product.product_data ? JSON.parse(props.product.product_data) : null
    const images = raw?.images?.[0]?.bigImg || props.product.image || props.product.thumbnail
    return Array.isArray(images)
      ? images[0]?.replaceAll('\\', '/') || '/fallback.png'
      : images?.replaceAll('\\', '/') || '/fallback.png'
  } catch {
    return props.product.image || props.product.thumbnail || '/fallback.png'
  }
})

function addToCart() {
  const item = {
    id: props.product.id,
    name: props.product.name || props.product.title || 'Unknown Item',
    image: mainImage.value,
    price: props.product.price,
    restaurantId: props.product.restaurantId || 'main'
  }

  if (cart.canAddFromRestaurant(item.restaurantId)) {
    cart.addItem(item)
    triggerNotification(`"${item.name}" added to cart`)
    emit('close')
  } else {
    alert('You can only add items from the same restaurant.')
  }
}

function imageError(event) {
  event.target.src = '/fallback.png'
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}
</style>
