<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Sticky Header -->
    <header class="bg-white shadow-md sticky top-0 z-50">
      <div class="w-full flex items-center gap-2 sm:gap-4 lg:gap-10 px-3 sm:px-6 lg:px-10 py-3">

        <!-- Sidebar toggle for mobile -->
        <button class="md:hidden text-2xl text-black hover:text-red-600 transition" @click="isSidebarOpen = true">
          ☰
        </button>

        <!-- ScootyLoot logo on mobile only -->
        <NuxtLink to="/" class="block md:hidden items-center gap-2">
          <div class="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shadow-inner">
            <span class="text-xl">🛵</span>
          </div>
          <div class="flex flex-col leading-tight">
            <span class="text-sm font-extrabold text-red-600">Scooty</span>
            <span class="text-sm font-extrabold text-black">Loot</span>
          </div>
        </NuxtLink>

        <!-- Searchbar -->
        <div class="flex-grow">
          <SearchBar v-model:search="searchTerm" />
        </div>

        <!-- Cart Button -->
        <button @click="cartStore.openCart()"
          class="relative text-black hover:text-red-600 text-xl transition-transform hover:scale-110">
          🛒
          <ClientOnly>
            <span v-if="cartStore.itemCount > 0"
              class="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
              {{ cartStore.itemCount }}
            </span>
          </ClientOnly>
        </button>

        <!-- Profile Icon -->
        <NuxtLink to="/profile" class="ml-3 text-xl hover:text-red-600 transition hover:scale-110">
          👤
        </NuxtLink>
      </div>
    </header>

    <!-- Sidebar (Desktop) -->
    <aside class="hidden md:flex fixed top-0 left-0 w-56 h-full bg-white shadow-xl border-r z-40 flex-col">
      <NuxtLink to="/"
        class="px-4 pb-4 border-b flex items-center space-x-3 mt-[14px] hover:bg-red-50 transition rounded-md"
        aria-label="Back to ScootyLoot Home">
        <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shadow-inner overflow-hidden">
          <img src="/icons/scooter.png" alt="ScootyLoot Logo" class="w-6 h-6 object-contain" />
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
        <div class="fixed inset-0 bg-black bg-opacity-40" @click="isSidebarOpen = false"></div>
        <aside class="w-56 bg-white shadow-xl border-r z-50 flex flex-col h-full relative pt-6">
          <button class="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl"
            @click="isSidebarOpen = false">✕</button>

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

          <nav class="flex flex-col p-4 space-y-2 overflow-y-auto">
            <NuxtLink to="/" @click="isSidebarOpen = false" class="sidebar-link"><span class="emoji">🏠</span><span
                class="label">Home</span></NuxtLink>
            <NuxtLink to="/grocery" @click="isSidebarOpen = false" class="sidebar-link"><span
                class="emoji">🛒</span><span class="label">Grocery</span></NuxtLink>
            <NuxtLink to="/fashion" @click="isSidebarOpen = false" class="sidebar-link"><span
                class="emoji">👗</span><span class="label">Fashion</span></NuxtLink>
            <NuxtLink to="/food" @click="isSidebarOpen = false" class="sidebar-link"><span class="emoji">🍔</span><span
                class="label">Food</span></NuxtLink>
            <NuxtLink to="/jewellery" @click="isSidebarOpen = false" class="sidebar-link"><span
                class="emoji">💍</span><span class="label">Jewellery</span></NuxtLink>
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
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'
import SearchBar from '~/components/SearchBar.vue'
const cartStore = useCartStore()
const isSidebarOpen = ref(false)
const searchTerm = ref('')
</script>
