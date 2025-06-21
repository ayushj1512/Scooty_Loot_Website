<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Sticky Header -->
    <header class="bg-white shadow-md sticky top-0 z-50">
      <div class="w-full flex items-center gap-2 sm:gap-4 lg:gap-10 px-3 sm:px-6 lg:px-10 py-3">
        <!-- Hamburger (mobile only) -->
        <button class="md:hidden text-2xl text-black hover:text-red-600 transition" @click="isSidebarOpen = true">
          ☰
        </button>

        <!-- Searchbar (Compressed on mobile) -->
        <div class="flex-grow">
          <div class="relative">
            <input type="text" placeholder="Search..."
              class="w-full sm:w-[300px] md:w-[400px] lg:w-full pl-5 pr-12 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-full text-sm text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition" />
            <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>

        <!-- Explore link -->
        <NuxtLink to="/restaurants"
          class="text-sm font-semibold text-black hover:text-red-600 transition whitespace-nowrap hidden sm:inline">
          Explore
        </NuxtLink>

        <!-- Cart -->
        <button @click="cartStore.openCart()"
          class="relative text-black hover:text-red-600 text-xl transition-transform hover:scale-110">
          🛒
          <span v-if="cartStore.itemCount > 0"
            class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
            {{ cartStore.itemCount }}
          </span>
        </button>
      </div>

      <!-- Delivering To (Only on sm and above)
  <div class="hidden sm:flex items-center px-6 pb-3 text-sm font-medium text-gray-700">
    Delivering to:
    <button class="underline ml-1 hover:text-red-600 transition" @click="fetchLocation">
      {{ locationLabel }} ⌄
    </button>
  </div> -->
    </header>

    <!-- Sidebar (Desktop) -->
    <aside class="hidden md:flex fixed top-0 left-0 w-56 h-full bg-white shadow-xl border-r z-40 flex-col">
      <!-- Sidebar Content -->
      <NuxtLink to="/"
        class="px-4 pb-4 border-b flex items-center space-x-3 mt-[14px] hover:bg-red-50 transition rounded-md">
        <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shadow-inner">
          <span class="text-2xl">🛵</span>
        </div>
        <div class="leading-tight">
          <h1 class="text-xl font-extrabold tracking-wide text-gray-900 whitespace-nowrap">
            <span class="text-red-600">Scooty</span><span class="text-black">Loot</span>
          </h1>
          <p class="text-xs text-gray-500 font-medium tracking-wide mt-0.5 whitespace-nowrap">
            Quick. Tasty. Lootworthy.
          </p>
        </div>
      </NuxtLink>




      <nav class="flex flex-col p-4 space-y-2 overflow-y-auto">
        <NuxtLink to="/" class="sidebar-link"><span class="emoji">🏠</span><span class="label">Home</span></NuxtLink>
        <NuxtLink to="/grocery" class="sidebar-link"><span class="emoji">🛒</span><span class="label">Grocery</span>
        </NuxtLink>
        <NuxtLink to="/fashion" class="sidebar-link"><span class="emoji">👗</span><span class="label">Fashion</span>
        </NuxtLink>
        <NuxtLink to="/food" class="sidebar-link"><span class="emoji">🍔</span><span class="label">Food</span>
        </NuxtLink>
        <NuxtLink to="/jewellery" class="sidebar-link"><span class="emoji">💍</span><span class="label">Jewellery</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- Sidebar (Mobile Drawer) -->
    <transition name="fade">
      <div v-if="isSidebarOpen" class="md:hidden fixed inset-0 z-50 flex">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-40" @click="isSidebarOpen = false"></div>

        <!-- Drawer Panel -->
        <aside class="w-56 bg-white shadow-xl border-r z-50 flex flex-col h-full relative pt-6">
          <button class="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl"
            @click="isSidebarOpen = false">
            ✕
          </button>

          <NuxtLink to="/" @click="isSidebarOpen = false"
            class="px-4 pb-4 border-b flex items-center space-x-3 mt-6 hover:bg-red-50 transition rounded-md">
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shadow-inner">
              <span class="text-2xl">🛵</span>
            </div>
            <div class="leading-tight">
              <h1 class="text-xl font-extrabold tracking-wide text-gray-900 whitespace-nowrap">
                <span class="text-red-600">Scooty</span><span class="text-black">Loot</span>
              </h1>
              <p class="text-xs text-gray-500 font-medium tracking-wide mt-0.5 whitespace-nowrap">
                Quick. Tasty. Lootworthy.
              </p>
            </div>
          </NuxtLink>


          <<nav class="flex flex-col p-4 space-y-2 overflow-y-auto">
            <NuxtLink to="/" @click="isSidebarOpen = false" class="sidebar-link">
              <span class="emoji">🏠</span><span class="label">Home</span>
            </NuxtLink>
            <NuxtLink to="/grocery" @click="isSidebarOpen = false" class="sidebar-link">
              <span class="emoji">🛒</span><span class="label">Grocery</span>
            </NuxtLink>
            <NuxtLink to="/fashion" @click="isSidebarOpen = false" class="sidebar-link">
              <span class="emoji">👗</span><span class="label">Fashion</span>
            </NuxtLink>
            <NuxtLink to="/food" @click="isSidebarOpen = false" class="sidebar-link">
              <span class="emoji">🍔</span><span class="label">Food</span>
            </NuxtLink>
            <NuxtLink to="/jewellery" @click="isSidebarOpen = false" class="sidebar-link">
              <span class="emoji">💍</span><span class="label">Jewellery</span>
            </NuxtLink>
            </nav>

        </aside>
      </div>
    </transition>

    <!-- Main Page Content -->
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const locationLabel = ref('Detecting...')
const isSidebarOpen = ref(false)

async function fetchLocation() {
  if (!navigator.geolocation) {
    locationLabel.value = 'Not Supported'
    return
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        const data = await res.json()
        locationLabel.value = data.address?.postcode || 'Your Pincode'
      } catch {
        locationLabel.value = 'Unable to fetch'
      }
    },
    () => {
      locationLabel.value = 'Permission denied'
    }
  )
}

onMounted(() => {
  fetchLocation()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.sidebar-link {
  @apply flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition;
}

.sidebar-link .emoji {
  @apply text-xl;
}
</style>
