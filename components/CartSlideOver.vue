<template>
  <div class="fixed inset-0 z-50 overflow-hidden">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/60 transition-opacity duration-300" @click="cartStore.closeCart()"></div>

    <!-- Slide-over Cart Panel -->
    <div
      class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl rounded-l-xl transition-transform duration-300">
      <div class="flex flex-col h-full">
        <!-- Header -->
        <div class="flex items-center justify-between p-5 border-b border-gray-200">
          <h2 class="text-xl font-bold text-gray-900">🛒 Your Cart</h2>
          <button @click="cartStore.closeCart()" class="p-2 text-gray-400 hover:text-gray-700 transition">
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex flex-col flex-1 min-h-0">
          <div class="flex-1 overflow-y-auto px-5 py-4">
            <div v-if="cartStore.items.length === 0" class="text-center py-14">
              <Icon name="heroicons:shopping-bag" class="w-14 h-14 text-gray-300 mx-auto mb-4" />
              <p class="text-gray-500 text-lg font-medium">Your cart is empty</p>
              <p class="text-sm text-gray-400 mt-1">Start adding some tasty dishes!</p>
            </div>

            <div v-else class="space-y-5">
              <div v-for="item in cartStore.items" :key="`${item.id}-${item.selectedOptions?.join('-')}`"
                class="flex items-start gap-4 p-4 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition">
                <img :src="item.image" :alt="item.name" class="w-16 h-16 rounded-md object-cover" />
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900">{{ item.name }}</h4>
                  <p v-if="item.selectedOptions?.length" class="text-sm text-gray-500 mt-1">
                    Options: {{ item.selectedOptions.join(', ') }}
                  </p>

                  <div class="flex items-center justify-between mt-3">
                    <div class="flex items-center space-x-2">
                      <button @click="cartStore.updateQuantity(item.id, item.quantity - 1, item.selectedOptions)"
                        class="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition">
                        <Icon name="heroicons:minus" class="w-4 h-4" />
                      </button>
                      <span class="text-sm font-medium">{{ item.quantity }}</span>
                      <button @click="cartStore.updateQuantity(item.id, item.quantity + 1, item.selectedOptions)"
                        class="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition">
                        <Icon name="heroicons:plus" class="w-4 h-4" />
                      </button>
                    </div>
                    <span class="text-gray-900 font-semibold text-base">
                      ₹{{ (item.price * item.quantity).toFixed(0) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div v-if="cartStore.items.length > 0" class="border-t border-gray-200 p-5 bg-white shadow-inner space-y-3">
            <div class="flex justify-between items-center mb-1">
              <span class="text-lg font-semibold text-gray-800">Total</span>
              <span class="text-lg font-bold text-gray-900">
                ₹{{ cartStore.total.toFixed(0) }}
              </span>
            </div>

            <button @click="proceedToCheckout"
              class="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-300">
              Proceed to Checkout
            </button>

            <button @click="handleClearCart"
              class="w-full py-2 text-sm text-gray-500 hover:text-red-600 hover:underline transition duration-200">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
import { useSessionStore } from '~/stores/useSessionStore'
import { navigateTo } from '#app'
import { useToast } from '~/composables/useToast'

const cartStore = useCartStore()
const session = useSessionStore()
const { show: triggerToast } = useToast()

const proceedToCheckout = async () => {
  cartStore.closeCart()

  if (!session.isAuthenticated) {
    triggerToast('Please login to continue to checkout.', 'warning') // 👈 updated to warning toast
    session.setRedirect?.('/checkout')
    setTimeout(() => navigateTo('/login'), 1500)
  } else {
    navigateTo('/checkout')
  }
}

const handleClearCart = () => {
  cartStore.clearCart()
  triggerToast('Your cart has been cleared.', 'success') // ✅ keep this success
}
</script>
