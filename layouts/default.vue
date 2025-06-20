<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- Main Content (no Sidebar separately now) -->
    <div class="flex-1 w-full md:ml-56">
      <TheHeader />
      <main class="p-4">
      </main>
      <TheFooter />
      <CartSlideOver v-if="cartStore.isOpen" />
    </div>
  </div>
</template>


<script setup>
import Sidebar from '~/components/Sidebar.vue'
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
import CartSlideOver from '~/components/CartSlideOver.vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>
