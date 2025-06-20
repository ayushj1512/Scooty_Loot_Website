<template>
  <div class="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
    <img
      :src="item.image"
      :alt="item.name"
      class="w-20 h-20 object-cover rounded-lg flex-shrink-0"
    >
    
    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h4 class="font-semibold text-gray-900 mb-1">{{ item.name }}</h4>
          <p class="text-sm text-gray-600 mb-2">{{ item.description }}</p>
          <span class="text-lg font-bold text-gray-900">${{ item.price.toFixed(2) }}</span>
        </div>
        
        <button
          @click="addToCart"
          :disabled="!canAddToCart"
          :class="[
            'ml-4 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors',
            canAddToCart
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          <Icon name="heroicons:plus" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '~/stores/cart'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  restaurantId: {
    type: Number,
    required: true
  }
})

const cartStore = useCartStore()

const canAddToCart = computed(() => {
  return cartStore.canAddFromRestaurant(props.restaurantId)
})

const addToCart = () => {
  if (!canAddToCart.value) {
    // Show modal asking if user wants to clear cart
    if (confirm('Your cart contains items from a different restaurant. Would you like to clear your cart and add this item?')) {
      cartStore.clearCart()
      cartStore.addItem(props.item)
    }
    return
  }
  
  cartStore.addItem(props.item)
  
  // Show success message or animation
  // You could add a toast notification here
}
</script>