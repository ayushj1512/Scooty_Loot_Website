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
            <span class="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full shadow">
              Open Now
            </span>
            <span v-if="rest.deliveryTime <= 25"
              class="absolute top-2 right-2 bg-white text-red-600 text-[10px] font-semibold px-2 py-[2px] rounded-full border border-red-500">
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

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const restaurants = ref([
  {
    id: 'fp',
    name: 'Funky Panda',
    cuisine: 'Asian Fusion',
    deliveryTime: 20,
    image: 'https://cdn.streetstylestore.com/2/9/2/4/3/5/292435-funky_food.webp',
    rating: '4.7',
  },
  {
    id: 'bc',
    name: 'Bollywood Canteen',
    cuisine: 'Indian Street Food',
    deliveryTime: 25,
    image: 'https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg',
    rating: '4.6',
  },
  {
    id: '1',
    name: 'Pizza Palace',
    cuisine: 'Italian',
    deliveryTime: 30,
    image: 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg',
    rating: '4.4',
  },
  {
    id: '2',
    name: 'Burger Hub',
    cuisine: 'American',
    deliveryTime: 25,
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
    rating: '4.3',
  },
  {
    id: '3',
    name: 'Sushi World',
    cuisine: 'Japanese',
    deliveryTime: 40,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
    rating: '4.8',
  },
  {
    id: '4',
    name: 'Taco Town',
    cuisine: 'Mexican',
    deliveryTime: 35,
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg',
    rating: '4.2',
  },
  {
    id: '5',
    name: 'Sweet Tooth',
    cuisine: 'Desserts',
    deliveryTime: 20,
    image: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg',
    rating: '4.9',
  },
])

const filters = ['All', 'Indian Street Food', 'Desserts', 'Fast Delivery']
const selectedFilter = ref('All')

const applyFilter = (filter: string) => {
  selectedFilter.value = filter
}

const filteredRestaurants = computed(() => {
  if (selectedFilter.value === 'All') return restaurants.value
  if (selectedFilter.value === 'Fast Delivery') {
    return restaurants.value.filter((rest) => rest.deliveryTime <= 25)
  }
  return restaurants.value.filter((rest) => rest.cuisine === selectedFilter.value)
})

const openRestaurant = (rest: { id: string }) => {
  router.push({ name: 'restaurant-menu', params: { id: rest.id } })
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
