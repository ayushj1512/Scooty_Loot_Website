<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- Main Content (No Sidebar separately now) -->
    <div class="flex-1 w-full md:ml-56">
      <TheHeader />

      <main class="p-4">
        <!-- Render route content here -->
        <NuxtPage />
      </main>

      <TheFooter />
      <CartSlideOver v-if="cartStore.isOpen" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
import CartSlideOver from '~/components/CartSlideOver.vue'
import { useCartStore } from '~/stores/cart'

// Access Pinia store
const cartStore = useCartStore()
</script>
