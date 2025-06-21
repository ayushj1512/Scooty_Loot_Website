<template>
  <div v-if="restaurant" class="min-h-screen bg-white">
    <!-- Banner -->
    <div
      class="h-64 bg-cover bg-center flex items-end rounded-b-2xl shadow"
      :style="{ backgroundImage: `url('${restaurant.image}')` }"
    >
      <div class="bg-black/60 w-full p-5 text-white rounded-b-2xl backdrop-blur-sm">
        <h1 class="text-3xl font-extrabold tracking-tight">{{ restaurant.name }}</h1>
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
          ✅ <span class="text-green-800 font-bold">{{ lastAddedItemName }}</span> has been added to the cart
        </p>
      </div>
    </transition>

    <!-- Menu Content -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="mb-8">
        <h2 class="text-3xl font-bold mb-2 text-gray-800 tracking-tight">Explore the Menu</h2>
        <p class="text-sm text-gray-500">Handpicked dishes just for you ✨</p>
      </div>

      <div v-if="loading" class="text-center py-20">
        <span class="text-gray-500">Fetching deliciousness...</span>
      </div>

      <div v-else class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="item in menuItems"
          :key="item.id"
          class="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 p-4 flex flex-col justify-between group"
        >
          <div class="flex gap-4">
            <img
              :src="item.image"
              alt="food"
              class="w-24 h-24 object-cover rounded-lg bg-gray-100 border group-hover:scale-105 transition-transform"
            />
            <div class="flex-1">
              <h3 class="font-semibold text-lg text-gray-800">{{ item.name }}</h3>
              <p class="text-gray-500 text-sm mt-1">
                A tasty treat from <strong>{{ restaurant.name }}</strong>.
              </p>
              <p class="text-red-600 font-bold mt-2 text-md">₹{{ item.price }}</p>
            </div>
          </div>
          <button
            class="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md self-start transition"
            @click="handleAddToCart(item)"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading fallback -->
  <div v-else class="min-h-screen flex items-center justify-center bg-white">
    <div class="text-center">
      <div class="animate-spin rounded-full h-10 w-10 border-4 border-red-500 border-t-transparent mx-auto mb-4" />
      <p class="text-gray-600">Loading restaurant info...</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import axios from 'axios'

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
    image: 'https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg'
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
