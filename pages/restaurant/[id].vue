<template>
  <div v-if="restaurant" class="min-h-screen bg-white">
    <!-- Header with overlay -->
    <div class="relative h-64 md:h-80">
      <img :src="restaurant.image" :alt="restaurant.name" class="w-full h-full object-cover rounded-b-3xl" />
      <div class="absolute inset-0 bg-black bg-opacity-40 rounded-b-3xl"></div>
      <div class="absolute inset-0 flex items-end">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-white w-full">
          <p class="text-sm text-white mb-1">{{ greeting }}</p>
          <h1 class="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">{{ restaurant.name }}</h1>
          <div class="flex flex-wrap items-center gap-4 text-sm opacity-90">
            <div class="flex items-center gap-1">
              <Icon name="heroicons:star" class="w-5 h-5 text-yellow-400" />
              <span>{{ restaurant.rating }} ({{ restaurant.reviewCount }} reviews)</span>
            </div>
            <div class="flex items-center gap-1">
              <Icon name="heroicons:clock" class="w-5 h-5 text-white" />
              <span>{{ restaurant.deliveryTime }} min</span>
            </div>
            <div class="flex items-center gap-1">
              <Icon name="heroicons:banknotes" class="w-5 h-5 text-white" />
              <span class="text-white">₹{{ restaurant.deliveryFee }} delivery</span>
            </div>
            <span class="bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">{{ restaurant.cuisine }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Left: Menu Content -->
        <div class="flex-1">
          <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
            <!-- Search -->
            <input v-model="searchQuery" type="text" placeholder="Search dishes..."
              class="w-full px-4 py-2 border border-red-500 rounded-lg mb-6 focus:ring-red-500 focus:border-red-500 text-sm bg-white placeholder-gray-400 text-gray-900" />

            <!-- Tabs for Categories -->
            <div class="sticky top-20 z-10 bg-white py-2">
              <div class="flex space-x-1 bg-white p-1 rounded-lg mb-6">
                <button v-for="category in menuCategories" :key="category" @click="activeCategory = category" :class="[
                  'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all border border-red-200',
                  activeCategory === category
                    ? 'bg-red-500 text-white shadow-md'
                    : 'text-red-600 hover:text-red-800 hover:bg-red-50'
                ]">
                  {{ category }}
                </button>
              </div>
            </div>

            <!-- Menu Items -->
            <div class="grid gap-5 md:grid-cols-2">
              <MenuItemCard
                v-for="item in filteredMenuItems"
                :key="item.id"
                :item="item"
                :restaurant-id="restaurant.id"
              />
            </div>

            <!-- Review Section (Moved Here) -->
            <div class="">
              <div class="bg-white ">
                <ReviewSection />
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Sidebar -->
        <div class="lg:w-80 space-y-6">
          <div class="sticky top-24 space-y-6">
            <div class="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 class="font-semibold text-gray-900 mb-4">Restaurant Info</h3>
              <div class="space-y-3 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                  <Icon name="heroicons:map-pin" class="w-4 h-4 text-gray-500" />
                  <span>123 Main Street, City</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="heroicons:phone" class="w-4 h-4 text-gray-500" />
                  <span>(555) 123-4567</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="heroicons:clock" class="w-4 h-4 text-gray-500" />
                  <span>Open until 10:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Cart Button (Mobile only) -->
    <div class="fixed bottom-4 left-0 right-0 px-4 lg:hidden z-50">
      <NuxtLink to="/cart"
        class="block bg-red-500 text-white text-center py-3 rounded-full shadow-md text-sm font-semibold">
        View Cart (₹{{ cartStore.total.toFixed(2) }})
      </NuxtLink>
    </div>
  </div>

  <!-- Loader -->
  <div v-else class="min-h-screen bg-white flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading restaurant...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'
import ReviewSection from '~/components/ReviewSection.vue'

const route = useRoute()
const cartStore = useCartStore()
const restaurantId = parseInt(route.params.id)

const restaurant = ref(null)
const searchQuery = ref('')
const activeCategory = ref('Popular')

const restaurants = {
  1: {
    id: 1,
    name: "Mario's Pizza Palace",
    cuisine: 'Italian',
    rating: 4.8,
    reviewCount: 1200,
    deliveryTime: '25-35',
    deliveryFee: 30,
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1200'
  }
}

const menuItems = {
  1: [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomato sauce, basil, and olive oil',
      price: 169,
      category: 'Popular',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      restaurantId: 1
    }
  ]
}

const greeting = computed(() => {
  const hr = new Date().getHours()
  if (hr < 12) return 'Good morning 👋'
  else if (hr < 18) return 'Good afternoon ⛅️'
  else return 'Good evening 🌙'
})

const currentMenuItems = computed(() => menuItems[restaurantId] || [])
const menuCategories = computed(() => {
  const categories = [...new Set(currentMenuItems.value.map(item => item.category))]
  return categories.length > 0 ? categories : ['Popular']
})

const filteredMenuItems = computed(() => {
  return currentMenuItems.value.filter(
    item =>
      item.category === activeCategory.value &&
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

onMounted(() => {
  restaurant.value = restaurants[restaurantId]
  if (!restaurant.value) {
    throw createError({ statusCode: 404, statusMessage: 'Restaurant not found' })
  }
})

useHead(() => ({
  title: restaurant.value ? `${restaurant.value.name} - ScootyLoot` : 'Restaurant - ScootyLoot',
  meta: [
    {
      name: 'description',
      content: restaurant.value
        ? `Order from ${restaurant.value.name}. ${restaurant.value.cuisine} cuisine.`
        : 'Order food online'
    }
  ]
}))
</script>
