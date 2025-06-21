<template>
  <section class="py-10 bg-white">
    <!-- Title -->
    <h2 class="text-2xl font-bold text-gray-900 text-center mb-4">Featured Restaurants</h2>

    <!-- Filter Chips -->
    <div class="flex flex-wrap justify-center gap-2 mb-6 px-4">
      <button
        v-for="filter in filters"
        :key="filter"
        @click="applyFilter(filter)"
        class="px-3 py-1 text-xs font-medium rounded-full border transition duration-200"
        :class="[
          selectedFilter === filter
            ? 'bg-red-500 text-white border-red-500'
            : 'text-gray-700 border-gray-300 hover:bg-gray-100',
        ]"
      >
        {{ filter }}
      </button>
    </div>

    <!-- Cards Section -->
    <div class="max-w-7xl mx-auto px-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory">
      <div class="flex space-x-4 min-w-max">
        <div
          v-for="rest in filteredRestaurants"
          :key="rest.id"
          @click="openRestaurant(rest)"
          class="snap-start min-w-[250px] w-[250px] bg-white rounded-xl shadow hover:shadow-md hover:scale-[1.01] transition duration-300 cursor-pointer"
        >
          <!-- Image -->
          <div class="relative h-40 overflow-hidden rounded-t-xl">
            <img
              :src="rest.image"
              :alt="rest.name"
              class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <span
              class="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full shadow"
            >
              Open Now
            </span>
            <span
              v-if="rest.deliveryTime <= 25"
              class="absolute top-2 right-2 bg-white text-red-600 text-[10px] font-semibold px-2 py-[2px] rounded-full border border-red-500"
            >
              Fast Delivery
            </span>
          </div>

          <!-- Info -->
          <div class="p-3">
            <h3 class="text-sm font-bold text-gray-900 truncate">{{ rest.name }}</h3>
            <p class="text-gray-500 text-xs mb-2 truncate">{{ rest.cuisine }} • {{ rest.deliveryTime }} mins</p>

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
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const restaurants = ref([
  {
    id: 1,
    name: 'Funky Panda',
    cuisine: 'Deserts', // ✅ Changed from Asian Fusion to Deserts
    deliveryTime: 20,
    image: '/fklogo.png', // ✅ From public folder
    rating: '4.7',
  },
  {
    id: 2,
    name: 'Bollywood Canteen',
    cuisine: 'Indian Street Food',
    deliveryTime: 25,
    image: '/BollywoodCanteenLogo.png', // ✅ From public folder
    rating: '4.6',
  }
])

const filters = ['All', 'Indian Street Food', 'Deserts', 'Fast Delivery']
const selectedFilter = ref('All')

const applyFilter = (filter) => {
  selectedFilter.value = filter
}

const filteredRestaurants = computed(() => {
  if (selectedFilter.value === 'All') return restaurants.value
  if (selectedFilter.value === 'Fast Delivery') {
    return restaurants.value.filter((rest) => rest.deliveryTime <= 25)
  }
  return restaurants.value.filter((rest) => rest.cuisine === selectedFilter.value)
})

const openRestaurant = (rest) => {
  router.push(`/restaurant/${rest.id}`)
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
