  <template>
    <!-- Enhanced Notification -->
    <transition name="slide-fade">
      <div v-if="showNotification"
        class="fixed top-5 right-5 z-50 max-w-sm w-full bg-gradient-to-br from-green-50 to-white border-l-[6px] border-green-500 text-green-900 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-start gap-3 animate-fade-in-up"
        role="alert">
        <div class="text-2xl animate-bounce">✅</div>
        <div class="flex-1">
          <p class="font-semibold text-sm">Success</p>
          <p class="text-xs text-gray-700 mt-0.5">{{ notificationMessage }}</p>
        </div>
        <button @click="showNotification = false"
          class="text-green-800 hover:text-red-500 hover:rotate-90 transition duration-300 text-lg">
          &times;
        </button>
      </div>
    </transition>

    <!-- Product Dialog -->
    <ProductDialog v-if="selectedProduct" :product="selectedProduct" :show="showDialog" @close="showDialog = false" />

    <!-- Bestseller Section -->
    <section class="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center mb-8 flex-wrap gap-2">
          <h3 class="text-3xl font-extrabold text-gray-900 tracking-tight">🔥 Bestsellers</h3>
          <NuxtLink to="/dishes" class="text-red-500 hover:text-red-600 font-semibold text-sm sm:text-base underline">
            View All →
          </NuxtLink>
        </div>

        <!-- Skeleton Loader -->
        <div v-if="loadingBS" class="grid grid-cols-2 max-[429px]:grid-cols-1 gap-6 justify-items-center">
          <div v-for="i in perPage" :key="i" class="bg-gray-100 animate-pulse h-64 rounded-xl shadow p-4 w-full max-w-md">
            <div class="w-full h-32 bg-gray-300 mb-4 rounded"></div>
            <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>

        <!-- Product Grid -->
        <!-- Product Grid -->
        <div v-else
          class="grid grid-cols-2 max-[429px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          <div v-for="dish in paginatedProducts" :key="dish.id"
            class="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 w-full max-w-md">
            <img :src="dish.image" alt="" loading="lazy"
              class="w-full h-48 object-cover object-center transition duration-300 group-hover:scale-105 cursor-pointer"
              @click="openDialog(dish)" />
            <div class="p-4 sm:p-5 flex flex-col justify-between h-[calc(100%-192px)]">
              <div>
                <h4 class="font-semibold text-lg text-gray-800 truncate">{{ dish.name }}</h4>
                <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ dish.description }}</p>
              </div>
              <div class="flex justify-between items-center mt-4">
                <p class="text-red-600 font-bold text-lg sm:text-xl">₹{{ dish.price }}</p>
                <button @click.stop="addToCart(dish)"
                  class="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm transition shadow-md">
                  <span class="text-base">Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div class="flex justify-center mt-10 space-x-4">
          <button @click="currentPage--" :disabled="currentPage === 1"
            class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm disabled:opacity-50">
            ← Previous
          </button>
          <button @click="currentPage++" :disabled="currentPage >= totalPages"
            class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm disabled:opacity-50">
            Next →
          </button>
        </div>
      </div>
    </section>
  </template>

  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useCartStore } from '../stores/cart'
  import ProductDialog from '~/components/ProductDialog.vue'

  const cartStore = useCartStore()

  const bestsellers = ref<any[]>([])
  const loadingBS = ref(true)
  const currentPage = ref(1)
  const perPage = 8
  const selectedProduct = ref(null)
  const showDialog = ref(false)

  const totalPages = computed(() => Math.ceil(bestsellers.value.length / perPage))

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * perPage
    const end = start + perPage
    return bestsellers.value.slice(start, end)
  })

  const fetchBestsellers = async () => {
    loadingBS.value = true
    try {
      const res = await fetch(
        `https://api.streetstylestore.com/collections/products/documents/search?q=*&filter_by=categories:=893&sort_by=date_updated_unix:desc&per_page=50&page=1&x-typesense-api-key=Bm23NaocNyDb2qWiT9Mpn4qXdSmq7bqdoLzY6espTB3MC6Rx`
      )
      const json = await res.json()
      bestsellers.value = json.hits.map((h: any) => {
        const doc = h.document || h
        const raw = doc.product_data ? JSON.parse(doc.product_data) : null
        const img = raw?.images?.[0]?.bigImg?.replace(/\\/g, '/') || doc.img
        return {
          id: doc.id,
          name: doc.name,
          description: doc.description_short || 'This is a delicious bestselling product!',
          price: doc.selling_price || doc.real_selling_price || 0,
          image: img,
          product_data: doc.product_data
        }
      })
    } catch (error) {
      console.error('Failed to load bestsellers', error)
    } finally {
      loadingBS.value = false
    }
  }

  const notificationMessage = ref('')
  const showNotification = ref(false)

  const triggerNotification = (message: string) => {
    notificationMessage.value = message
    showNotification.value = true
    setTimeout(() => {
      showNotification.value = false
      notificationMessage.value = ''
    }, 2500)
  }

  function openDialog(product: any) {
    selectedProduct.value = product
    showDialog.value = true
  }

  function addToCart(product: any) {
    const item = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      restaurantId: product.restaurantId || 'main',
    }

    if (cartStore.canAddFromRestaurant(item.restaurantId)) {
      cartStore.addItem(item)
      triggerNotification(`"${product.name}" added to cart`)
      showDialog.value = false
    } else {
      alert('You can only add items from the same restaurant.')
    }
  }

  onMounted(fetchBestsellers)
  </script>

  <style scoped>
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
