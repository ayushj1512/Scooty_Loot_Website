<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useSessionStore } from '@/stores/useSessionStore'
import OrderTracker from '@/components/OrderTracker.vue'

// Session store
const session = useSessionStore()
const isLoggedIn = computed(() => session.isLoggedIn)
const user = computed(() => session.user || { name: '', email: '', mobile: '' })

// UI state
const expandedOrderId = ref<string | null>(null)
const showAll = ref(false)
function toggleTracker(orderId: string) {
  expandedOrderId.value = expandedOrderId.value === orderId ? null : orderId
}
function handleLogout() {
  session.logout()
}

// Orders state
const loading = ref(false)
const paginatedOrders = ref<any[]>([])
const noOrders = computed(() => !loading.value && paginatedOrders.value.length === 0)

// Fetch orders from API (client-side only)
onMounted(async () => {
  if (!session.isLoggedIn || !user.value.mobile) return

  loading.value = true
  try {
    const res: any = await $fetch('https://gateway.streetstylestore.com/admin2014/custom-api/third-party/whatsapp/gallabox/', {
      method: 'POST',
      headers: {
        'x-api-key': 'xPr@ssB@@S',
        'Content-Type': 'application/json'
      },
      body: {
        type: 'verify_customer',
        mobile_number: user.value.mobile
      }
    })

    if (res?.status_code === 200) {
      paginatedOrders.value = res.order_list.map((order: any) => ({
        id: order.id,
        date: order.description.match(/\d{2}\/\w+\/\d{4}/)?.[0] || '-',
        status: order.description.split('Current Status: ')[1] || 'Pending',
        description: order.description
      }))
    } else {
      paginatedOrders.value = []
    }
  } catch (err) {
    console.error('API Error:', err)
    paginatedOrders.value = []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <!-- Not Logged In -->
  <ClientOnly>
    <div v-if="!isLoggedIn" class="min-h-screen flex items-center justify-center px-4"
      style="background-color: #fcf9f2">
      <div class="flex flex-col items-center justify-center text-center py-10 sm:py-16">
        <img src="/not_logged_in.png" alt="Login Required"
          class="w-10/12 max-w-[280px] sm:max-w-xs md:max-w-sm h-auto mb-6 opacity-90 object-contain" />

        <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-2 leading-snug">
          You're not logged in
        </h2>
        <p class="text-sm text-gray-500 max-w-[90%] sm:max-w-xs mb-6 leading-relaxed">
          Please log in to view your profile, track orders, and access your saved preferences.
        </p>

        <NuxtLink to="/login"
          class="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-md transition duration-300">
          🔐 Login to Continue
        </NuxtLink>
      </div>
    </div>

    <!-- Logged In -->
    <div v-else class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-red-100 via-rose-50 to-white">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 bg-red-200 text-3xl rounded-full flex items-center justify-center shadow-inner">👤
            </div>
            <div>
              <h2 class="text-xl font-semibold text-gray-800">{{ user.name || 'User' }}</h2>
              <p class="text-xs text-gray-500">Mobile: {{ user.mobile || '-' }}</p>
            </div>
          </div>
          <button @click="handleLogout"
            class="text-sm font-semibold text-red-600 hover:text-red-800 transition border border-red-300 px-3 py-1.5 rounded-lg">
            Logout
          </button>
        </div>

       

        <!-- Orders -->
        <div class="px-6 py-5">
          <h3 class="text-lg font-bold text-gray-800 mb-3">My Orders</h3>

          <div v-if="loading" class="text-center text-gray-500 py-6">Loading your orders...</div>
          <div v-else-if="noOrders" class="text-center text-gray-500 text-sm py-6">
            You have no orders yet.
          </div>

          <div v-else class="space-y-5">
            <div v-for="order in paginatedOrders" :key="order.id"
              class="bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
              <div class="flex flex-col sm:flex-row justify-between gap-3 px-4 py-3 sm:items-center">
                <div class="text-sm">
                  <p class="text-gray-500">
                    Order ID: <span class="text-gray-800 font-medium">{{ order.id }}</span>
                  </p>
                  <p class="text-gray-500">Date: <span class="text-gray-800">{{ order.date }}</span></p>
                </div>
                <div class="flex flex-col sm:items-end gap-1">
                  <p class="text-gray-500 text-sm">
                    Status: <span class="text-red-600 font-medium">{{ order.status }}</span>
                  </p>
                  <button @click="toggleTracker(order.id)"
                    class="bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm px-3 py-1.5 rounded-full transition">
                    {{ expandedOrderId === order.id ? 'Hide Tracking' : 'Track Order' }}
                  </button>
                </div>
              </div>

              <transition name="scale-fade">
                <div v-if="expandedOrderId === order.id" class="bg-white border-t px-4 pb-5">
                  <OrderTracker :status="order.status" />
                </div>
              </transition>
            </div>

            <!-- Load More -->
            <div v-if="!showAll" class="text-center mt-6">
              <button @click="showAll = true"
                class="px-5 py-2 bg-gray-100 hover:bg-gray-200 border rounded-lg text-sm font-semibold">
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
