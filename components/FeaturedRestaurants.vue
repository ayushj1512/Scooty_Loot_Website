<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSssConfig } from '@/stores/useSssConfig'

const router = useRouter()
const store = useSssConfig()

const isLoading = ref(true)

// Add "OYE-ASIAN" restaurant manually
const restaurants = computed(() => {
  const oyeAsian = {
    name: 'OYE-ASIAN',
    img: '/OYEASIAN.png',
    url: '/oye-asian', // Customize route if needed
    cuisine: 'Asian Fusion',
    deliveryTime: 20,
    rating: 4.6
  }

  const restList = store.data?.featured_restaurants || []
  return [oyeAsian, ...restList] // Add to top. Use [...restList, oyeAsian] to add to bottom.
})

// Simulate loading delay (for skeleton)
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1200)
})

const openRestaurant = (rest, index) => {
  const targetUrl = rest.url || `/${index + 1}`
  router.push(targetUrl)
}
</script>


<template>
  <section class="py-10 bg-white">
    <h2 class="text-2xl font-bold text-gray-900 text-center mb-4">Featured Restaurants</h2>

    <div class="max-w-7xl mx-auto px-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
      <div class="flex space-x-4 min-w-max">
        <!-- 🚀 SKELETON -->
        <template v-if="isLoading">
          <div v-for="n in 4" :key="n"
            class="snap-start min-w-[250px] w-[250px] rounded-xl bg-white shadow animate-pulse">
            <div class="h-40 bg-gray-200 rounded-t-xl"></div>
            <div class="p-3 space-y-2">
              <div class="h-4 bg-gray-300 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
              <div class="flex justify-between items-center mt-2">
                <div class="h-3 bg-gray-300 rounded w-1/4"></div>
                <div class="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        </template>

        <!-- ✅ REAL DATA -->
        <template v-else>
          <div v-for="(rest, index) in restaurants" :key="rest.name" @click="openRestaurant(rest, index)"
            class="snap-start min-w-[250px] w-[250px] bg-white rounded-xl shadow hover:shadow-md hover:scale-[1.01] transition duration-300 cursor-pointer">
            <div class="relative h-40 overflow-hidden rounded-t-xl">
              <img :src="rest.img" :alt="rest.name"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                @error="e => e.target.src = '/fallback-banner.png'" />
              <span
                class="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full shadow">
                Open Now
              </span>
              <span v-if="rest.deliveryTime && rest.deliveryTime <= 25"
                class="absolute top-2 right-2 bg-white text-red-600 text-[10px] font-semibold px-2 py-[2px] rounded-full border border-red-500">
                Fast Delivery
              </span>
            </div>

            <div class="p-3">
              <h3 class="text-sm font-bold text-gray-900 truncate">{{ rest.name }}</h3>
              <p class="text-gray-500 text-xs mb-2 truncate">
                {{ rest.cuisine || 'Multi-cuisine' }} • {{ rest.deliveryTime || 30 }} mins
              </p>
              <div class="flex items-center justify-between">
                <div class="text-yellow-500 text-xs font-semibold flex items-center gap-1">
                  ⭐ {{ rest.rating || '4.5' }}
                </div>
                <button class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md">
                  View →
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
