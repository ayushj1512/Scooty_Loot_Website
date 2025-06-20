<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">What Are You Craving?</h2>
        <p class="text-gray-500 text-lg">Pick your favorite dish and satisfy your taste buds</p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <!-- Skeleton Loaders -->
        <template v-if="isLoading">
          <div v-for="i in 4" :key="i" class="animate-pulse bg-gray-200 rounded-xl h-52 w-full"></div>
        </template>

        <!-- Food Cards -->
        <template v-else>
          <div v-for="item in whatToEat" :key="item.slug"
            class="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white transition-all duration-300 hover:shadow-2xl"
            @click="goToCategory(item.slug)">
            <img :src="item.image" :alt="item.name"
              class="w-full h-44 object-cover group-hover:scale-105 group-hover:brightness-90 transition-transform duration-300" />
            <div class="absolute bottom-0 w-full bg-white/80 backdrop-blur-sm py-3 text-center">
              <h4 class="text-gray-900 font-semibold text-lg">{{ item.name }}</h4>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goToCategory = (slug: string) => router.push(`/category/${slug}`)

const isLoading = ref(true)
const whatToEat = ref([
  {
    name: 'Pizza',
    slug: 'pizza',
    image: 'https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg'
  },
  {
    name: 'Burgers',
    slug: 'burgers',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'
  },
  {
    name: 'Gelato',
    slug: 'gelato',
    image: 'https://cdn.streetstylestore.com/2/9/2/6/8/8/292688-vertical_default.jpg'
  },
  {
    name: 'Sundaes',
    slug: 'sundaes',
    image: 'https://cdn.streetstylestore.com/2/9/2/4/3/5/292435-funky_food.webp'
  }
])

onMounted(() => {
  // Simulate async loading (e.g., API fetch)
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})
</script>
