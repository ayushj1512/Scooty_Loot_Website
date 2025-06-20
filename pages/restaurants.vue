<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <div class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Restaurants near you</h1>
            <p class="text-gray-600 mt-1">{{ filteredRestaurants.length }} restaurants available</p>
          </div>

          <!-- Sort Dropdown -->
          <div class="flex items-center space-x-4">
            <select v-model="sortBy"
              class="text-sm bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition">
              <option value="rating">Sort by Rating</option>
              <option value="delivery_time">Delivery Time</option>
              <option value="delivery_fee">Delivery Fee</option>
            </select>
          </div>
        </div>

        <!-- Cuisine Tags -->
        <div class="mt-4 flex flex-wrap gap-2">
          <button @click="selectedCuisine = ''" :class="[
            'px-4 py-1 rounded-full text-sm font-medium transition',
            selectedCuisine === '' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]">
            All
          </button>
          <button v-for="cuisine in cuisines" :key="cuisine" @click="selectedCuisine = cuisine" :class="[
            'px-4 py-1 rounded-full text-sm font-medium transition',
            selectedCuisine === cuisine ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]">
            {{ cuisine }}
          </button>
        </div>
      </div>
    </div>

    <!-- Restaurants Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <transition-group name="fade" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-if="loading" v-for="n in 9" :key="`loader-${n}`" class="animate-pulse">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-200 h-48"></div>
            <div class="p-4 space-y-2">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-3 bg-gray-200 rounded w-2/3"></div>
              <div class="flex space-x-2">
                <div class="h-3 bg-gray-200 rounded w-16"></div>
                <div class="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>

        <RestaurantCard v-else v-for="restaurant in filteredRestaurants" :key="restaurant.id" :restaurant="restaurant"
          class="transition-transform transform hover:scale-[1.02]" />
      </transition-group>

      <!-- No Results -->
      <div v-if="!loading && filteredRestaurants.length === 0" class="text-center py-12">
        <Icon name="heroicons:building-storefront" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">No restaurants found</h3>
        <p class="text-gray-600">Try adjusting your filters or search in a different area</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// SEO
useHead({
  title: 'Restaurants - DoorDash',
  meta: [
    { name: 'description', content: 'Browse restaurants in your area. Order food delivery from hundreds of local restaurants.' }
  ]
})

const loading = ref(true)
const sortBy = ref('rating')
const selectedCuisine = ref('')

const restaurants = ref([
  {
    id: 1,
    name: "Mario's Pizza Palace",
    cuisine: 'Italian',
    rating: 4.8,
    reviewCount: 1200,
    deliveryTime: '25-35',
    deliveryFee: 2.99,
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    delivery_time: 30,
    delivery_fee: 2.99
  },
  {
    id: 2,
    name: 'Sakura Sushi',
    cuisine: 'Japanese',
    rating: 4.9,
    reviewCount: 850,
    deliveryTime: '30-40',
    deliveryFee: 3.49,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    delivery_time: 35,
    delivery_fee: 3.49
  },
  {
    id: 3,
    name: 'The Burger Joint',
    cuisine: 'American',
    rating: 4.7,
    reviewCount: 2100,
    deliveryTime: '20-30',
    deliveryFee: 1.99,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    delivery_time: 25,
    delivery_fee: 1.99
  },
  {
    id: 4,
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    rating: 4.6,
    reviewCount: 750,
    deliveryTime: '15-25',
    deliveryFee: 2.49,
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    delivery_time: 20,
    delivery_fee: 2.49
  },
  {
    id: 5,
    name: 'Golden Dragon',
    cuisine: 'Chinese',
    rating: 4.5,
    reviewCount: 950,
    deliveryTime: '25-35',
    deliveryFee: 2.99,
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    delivery_time: 30,
    delivery_fee: 2.99
  },
  {
    id: 6,
    name: 'Bella Napoli',
    cuisine: 'Italian',
    rating: 4.4,
    reviewCount: 680,
    deliveryTime: '30-40',
    deliveryFee: 3.99,
    image: 'https://images.pexels.com/photos/1435903/pexels-photo-1435903.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    delivery_time: 35,
    delivery_fee: 3.99
  }
])

const cuisines = computed(() => {
  return [...new Set(restaurants.value.map(r => r.cuisine))].sort()
})

const filteredRestaurants = computed(() => {
  let filtered = restaurants.value

  if (selectedCuisine.value) {
    filtered = filtered.filter(r => r.cuisine === selectedCuisine.value)
  }

  return filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'rating':
        return b.rating - a.rating
      case 'delivery_time':
        return a.delivery_time - b.delivery_time
      case 'delivery_fee':
        return a.delivery_fee - b.delivery_fee
      default:
        return 0
    }
  })
})

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
