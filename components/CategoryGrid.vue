<template>
  <div class="py-8 px-4 max-w-7xl mx-auto">
    <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight text-center mb-8">
      What’s on Your Plate Today?
    </h2>

    <!-- Horizontal scroll with scrollbar hidden -->
    <div class="overflow-x-auto sm:overflow-visible scrollbar-hide">
      <div
        class="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4 sm:gap-6 min-w-max sm:min-w-0">
        <div v-for="cat in categories" :key="cat.id" @click="navigateToBestsellers"
          class="flex flex-col items-center text-center transition-all duration-300 ease-in-out group cursor-pointer flex-shrink-0 sm:flex-shrink">
          <div
            class="w-20 h-20 rounded-full bg-white/80 backdrop-blur-lg border border-gray-200 shadow-md group-hover:shadow-yellow-300 group-hover:scale-110 group-hover:ring-4 ring-yellow-200 transition-transform duration-300 ease-in-out flex items-center justify-center">
            <img :src="cat.icon" :alt="cat.title"
              class="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-125" />
          </div>
          <p
            class="mt-2 text-sm font-semibold text-gray-700 group-hover:text-yellow-600 transition-all duration-300 tracking-wide group-hover:scale-105">
            {{ cat.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function navigateToBestsellers() {
  router.push('/bestsellers')
}

const categories = [
  { id: 1, title: 'Burger', icon: '/icons/burger.png' },
  { id: 2, title: 'Cheesecake', icon: '/icons/cheesecake.png' },
  { id: 3, title: 'Beverages', icon: '/icons/cocktail.png' },
  { id: 4, title: 'Coffee', icon: '/icons/coffee-cup.png' },
  { id: 5, title: 'Deserts', icon: '/icons/desert.png' },
  { id: 6, title: 'Healthy', icon: '/icons/diet.png' },
  { id: 7, title: 'Fast Food', icon: '/icons/fast food.png' },
  { id: 8, title: 'Indian', icon: '/icons/masala-dosa.png' },
  { id: 9, title: 'Momos', icon: '/icons/momo.png' },
  { id: 10, title: 'Noodles', icon: '/icons/noodles.png' },
  { id: 11, title: 'Pizza', icon: '/icons/pizza.png' },
  { id: 12, title: 'Sandwich', icon: '/icons/sandwich.png' },
  { id: 13, title: 'Taco', icon: '/icons/taco.png' },
  { id: 14, title: 'Bao', icon: '/icons/tau-sar-bao.png' },
  { id: 15, title: 'Bubble Tea', icon: '/icons/bubble-tea.png' },
]
</script>
