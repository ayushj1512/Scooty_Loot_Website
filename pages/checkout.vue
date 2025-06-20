<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-6xl mx-auto">
      <!-- Empty Cart State -->
      <div v-if="cartStore.isEmpty" class="text-center py-20">
        <Icon name="heroicons:shopping-bag" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p class="text-gray-600 mb-6">Add some delicious items to get started!</p>
        <NuxtLink to="/restaurants" class="btn-primary">Browse Restaurants</NuxtLink>
      </div>

      <!-- Checkout Page -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Form Section -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-xl shadow border border-gray-200 p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Verify Mobile via OTP</h2>
            <OtpVerification :cart-id="cartId" @verified="onOtpVerified" />

            <div :class="{ 'opacity-50 pointer-events-none': !isOtpVerified }" class="transition-opacity duration-300">
              <h2 class="text-2xl font-bold text-gray-900 mt-10 mb-6">Personal Details</h2>
              <form @submit.prevent class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="label">First Name</label>
                    <input v-model="form.firstName" type="text" required class="input-field" />
                  </div>
                  <div>
                    <label class="label">Last Name</label>
                    <input v-model="form.lastName" type="text" required class="input-field" />
                  </div>
                </div>

                <div>
                  <label class="label">Email</label>
                  <input v-model="form.email" type="email" required class="input-field" />
                </div>

                <hr class="my-6 border-gray-300" />
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Address Details</h2>

                <div>
                  <label class="label">Delivery Address</label>
                  <input v-model="form.address" type="text" required class="input-field" />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="label">City</label>
                    <input v-model="form.city" type="text" required class="input-field" />
                  </div>
                  <div>
                    <label class="label">State</label>
                    <input v-model="form.state" type="text" required class="input-field" />
                  </div>
                  <div>
                    <label class="label">ZIP Code</label>
                    <input v-model="form.zipCode" type="text" required class="input-field" />
                  </div>
                </div>

                <div>
                  <label class="label">Delivery Instructions (Optional)</label>
                  <textarea v-model="form.instructions" rows="3" class="input-field"
                    placeholder="e.g., Leave at the door..."></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- 💳 Order Summary Section -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow border border-gray-200 p-6 sticky top-24">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div class="space-y-4 mb-6">
              <div v-for="item in cartStore.items" :key="`${item.id}-${item.selectedOptions?.join('-')}`"
                class="flex items-start space-x-3">
                <img :src="item.image" :alt="item.name" class="w-12 h-12 object-cover rounded-lg" />
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">{{ item.name }}</h4>
                  <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
                </div>
                <span class="font-medium text-gray-900">
                  ₹{{ (item.price * item.quantity).toFixed(2) }}
                </span>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-4 space-y-3">
              <p class="text-green-600 font-medium text-sm">
                You're all set! 🎉 Just verify & place the order.
              </p>
              <div class="flex justify-between font-bold text-lg">
                <span class="text-gray-900">Total</span>
                <span class="text-gray-900">₹{{ grandTotal.toFixed(2) }}</span>
              </div>
            </div>

            <button @click="submitOrder" :disabled="!isOtpVerified || isSubmitting" :class="[
              'w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors',
              !isOtpVerified || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600 text-white'
            ]">
              <span v-if="isSubmitting">Placing Order...</span>
              <span v-else>Place Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'
import OtpVerification from '~/components/OtpVerification.vue'

useHead({
  title: 'Checkout - ScootyLoot',
  meta: [{ name: 'description', content: 'Complete your food delivery order checkout' }]
})

const cartStore = useCartStore()
const isSubmitting = ref(false)
const isOtpVerified = ref(false)
const phoneNumber = ref('')
const cartId = ref(`cart_${Date.now()}`)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  instructions: ''
})

const grandTotal = computed(() => cartStore.total)

const onOtpVerified = ({ phone }) => {
  phoneNumber.value = phone
  isOtpVerified.value = true
}

const submitOrder = async () => {
  isSubmitting.value = true
  try {
    const payload = {
      gateway_action: 'funky_panda/index',
      version: '1',
      type: 'saveSaleData',
      id_warehouse: '45',
      id_cart: cartId.value,
      microSite: 'funkypanda',
      paymentType: 'CASH',
      orderType: 'Live',
      customer_type: '1',
      id_customer: '3239',
      user_hash_key: '0e9adc3df6bb13546bea59ee3f2a0bbb1',
      address: {
        mobileNumber: phoneNumber.value,
        firstName: 'test',
        lastName: 'test',
        pinCode: form.value.zipCode,
        address1: form.value.address,
        address2: '',
        landmark: '',
        city: form.value.city,
        state: form.value.state,
        country: '110',
        idState: '345',
        alias: 'Home'
      },
      productDetail: cartStore.items.map(item => ({
        id: item.id.toString(),
        name: item.name,
        qty: item.quantity.toString(),
        price: item.price.toString(),
        idCategory: (item.categoryId || 851).toString(),
        combo: [],
        comboItem: []
      }))
    }

    await $fetch('/api/submit-order', {
      method: 'POST',
      body: payload
    })

    cartStore.clearCart()
    navigateTo('/order-success')
  } catch (err) {
    console.error('Order Error', err)
    alert('Something went wrong. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition;
}

.label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}
</style>
