<template>
  <div v-if="restaurant" class="min-h-screen bg-white">
    <!-- Banner -->
    <div
      class="h-64 bg-cover bg-center flex items-end rounded-b-2xl shadow"
      :style="{ backgroundImage: `url('${restaurant.image}')` }"
    >
      <div class="bg-black/60 w-full p-5 text-white rounded-b-2xl backdrop-blur-sm">
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {{ restaurant.name }}
        </h1>
        <p class="text-sm opacity-90 mt-1">
          {{ restaurant.cuisine }} • {{ restaurant.deliveryTime }} mins
        </p>
        <p class="text-sm opacity-80">
          ⭐ {{ restaurant.rating }} ({{ restaurant.reviewCount }} reviews)
        </p>
      </div>
    </div>

    <!-- Notification -->
    <transition name="slide-fade">
      <div
        v-if="showNotification"
        class="fixed top-4 right-4 z-50 max-w-sm w-full bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg"
      >
        <p class="text-sm font-semibold">
          ✅
          <span class="text-green-800 font-bold">{{ lastAddedItemName }}</span>
          has been added to the cart
        </p>
      </div>
    </transition>

    <!-- Content -->
    <div class="w-full max-w-6xl mx-auto px-4 sm:px-5 lg:px-4 py-6 space-y-6">
      <!-- Review Section -->
      <div class="mb-2">
        <ReviewSection :restaurant="restaurant" />
      </div>

      <!-- Menu Header -->
      <div class="mt-2 mb-2 text-center md:text-left">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-800">
          Explore the Menu
        </h2>
        <p class="text-sm text-gray-500 mt-0.5">
          Handpicked dishes just for you ✨
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-10">
        <span class="text-gray-500">Fetching deliciousness...</span>
      </div>

      <!-- Menu Grid -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
      >
        <div
          v-for="item in menuItems"
          :key="item.id"
          class="bg-white rounded-xl border border-gray-100 shadow hover:shadow-md transition-all p-4 group"
        >
          <div class="flex gap-3 items-center">
            <img
              :src="item.image"
              alt="food"
              class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg bg-gray-100 border transition-transform duration-300 group-hover:scale-105"
            />
            <div class="flex-1">
              <h3
                class="text-base sm:text-lg font-semibold text-gray-800 leading-snug"
              >
                {{ item.name }}
              </h3>
              <p class="text-xs text-gray-500 mt-1">
                From <strong>{{ restaurant.name }}</strong>
              </p>
              <p class="text-red-600 font-bold mt-2 text-sm">
                ₹{{ item.price }}
              </p>
            </div>
          </div>
          <button
            class="mt-4 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm rounded-md transition w-full"
            @click="handleAddToCart(item)"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Fallback Loader -->
  <div v-else class="min-h-screen flex items-center justify-center bg-white">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-10 w-10 border-4 border-red-500 border-t-transparent mx-auto mb-4"
      />
      <p class="text-gray-600">Loading restaurant info...</p>
    </div>
  </div>
</template>




<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import axios from 'axios'
import ReviewSection from '@/components/ReviewSection.vue'

const route = useRoute()
const cartStore = useCartStore()

const restaurantId = parseInt(route.params.id)
const restaurant = ref(null)
const menuItems = ref([])
const loading = ref(false)
const showNotification = ref(false)
const lastAddedItemName = ref('')

// Static Restaurant Data
const allRestaurants = {
  1: {
    id: 1,
    name: 'Funky Panda',
    cuisine: 'Asian Fusion',
    rating: 4.7,
    reviewCount: 1100,
    deliveryTime: 20,
    deliveryFee: 30,
    image: 'https://cdn.streetstylestore.com/2/9/2/4/3/5/292435-funky_food.webp'
  },
  2: {
    id: 2,
    name: 'Bollywood Canteen',
    cuisine: 'Indian Street Food',
    rating: 4.6,
    reviewCount: 950,
    deliveryTime: 25,
    deliveryFee: 25,
    image: 'https://i.pinimg.com/736x/e7/f1/53/e7f1533b82336ca872abca3211d2e4b4.jpg'
  }
}

onMounted(async () => {
  restaurant.value = allRestaurants[restaurantId] || null
  if (restaurantId === 1) {
    await fetchFunkyPandaMenu()
  } else if (restaurantId === 2) {
    await loadBollywoodCanteenMenu()
  }
})

async function fetchFunkyPandaMenu() {
  loading.value = true
  try {
    const { data } = await axios.get(
      'https://api.streetstylestore.com/collections/products/documents/search',
      {
        params: {
          q: '*',
          filter_by: 'categories:=893',
          sort_by: 'date_updated_unix:desc',
          per_page: 50,
          page: 1,
          'x-typesense-api-key': 'Bm23NaocNyDb2qWiT9Mpn4qXdSmq7bqdoLzY6espTB3MC6Rx'
        }
      }
    )

    menuItems.value = data.hits.map((hit) => {
      const doc = hit.document
      const parsed = JSON.parse(doc.product_data || '{}')?.['0'] || {}
      const images = JSON.parse(doc.product_data || '{}')?.images || []
      const image =
        doc.img || doc.image || images?.[0]?.img || doc.alternate_img || 'https://via.placeholder.com/100'

      const price =
        parseFloat(parsed.selling_price) > 0
          ? parseFloat(parsed.selling_price)
          : parseFloat(doc.selling_price) > 0
            ? parseFloat(doc.selling_price)
            : 0

      return {
        id: doc.id,
        name: doc.name,
        price,
        image,
        restaurantId: restaurantId
      }
    })
  } catch (e) {
    console.error('Menu fetch error', e)
  } finally {
    loading.value = false
  }
}

async function loadBollywoodCanteenMenu() {
  loading.value = true
  menuItems.value = [
    {
      id: 201,
      name: 'Paneer Momos',
      price: 120,
      image: 'https://i.pinimg.com/736x/73/d2/fe/73d2fed4697d267c6584bcecbf41a326.jpg',
      restaurantId: restaurantId
    },
    {
      id: 202,
      name: 'Veg Momos',
      price: 100,
      image: 'https://i.pinimg.com/736x/fe/c3/b3/fec3b34d5edb094554ed761c0d6f9d17.jpg',
      restaurantId: restaurantId
    },
    {
      id: 203,
      name: 'Cheese Corn Momos',
      price: 130,
      image: 'https://i.pinimg.com/736x/85/43/cd/8543cd6668a18a97e0d7181046b31c7c.jpg',
      restaurantId: restaurantId
    },
    {
      id: 204,
      name: 'Creamy Cheese Momos',
      price: 140,
      image: 'https://i.pinimg.com/736x/51/08/c4/5108c431a8bfd00c32da4bff45b4427c.jpg',
      restaurantId: restaurantId
    },
    {
      id: 205,
      name: 'Soya Chaap Bao',
      price: 160,
      image: 'https://i.pinimg.com/736x/2e/8e/e6/2e8ee6fb76cdffd4d07c64bd75518fd3.jpg',
      restaurantId: restaurantId
    },
    {
      id: 206,
      name: 'Vegetable Bao',
      price: 150,
      image: 'https://i.pinimg.com/736x/5e/cf/51/5ecf5180bdf90b9d4216879c18e9c41c.jpg',
      restaurantId: restaurantId
    },
    {
      id: 207,
      name: 'Green Kebab Bao',
      price: 170,
      image: 'https://i.pinimg.com/736x/9e/ba/6b/9eba6bab904c7b546fa610956363c674.jpg',
      restaurantId: restaurantId
    }
  ]
  loading.value = false
}

function handleAddToCart(item) {
  cartStore.addItem(item)
  lastAddedItemName.value = item.name
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 2000)
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
