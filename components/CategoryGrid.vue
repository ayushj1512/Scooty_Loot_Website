<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSssConfig } from '~/stores/useSssConfig.js'

const router = useRouter()
const store = useSssConfig()

const categories = computed(() => store.data?.foodCategory || [])
const loading = computed(() => store.loading)

function navigateToCategory(categoryId: string) {
  router.push({ path: '/category', query: { cat: categoryId } })
}

function onImageError(e: Event) {
  const target = e.target as HTMLImageElement
  if (target?.tagName === 'IMG') {
    target.src = '/fallback-icon.png'
  }
}
</script>

<template>
  <div class="py-8 px-4 max-w-7xl mx-auto">
    <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-800 tracking-tight text-center mb-8">
      What’s on Your Plate Today?
    </h2>

    <!-- ✅ Loader -->
    <div v-if="loading" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 animate-pulse">
      <div
        v-for="n in 6"
        :key="n"
        class="flex flex-col items-center space-y-2"
      >
        <div class="w-20 h-20 rounded-full bg-gray-200"></div>
        <div class="w-12 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>

    <!-- ✅ Categories -->
    <div
      v-else
      class="overflow-x-auto sm:overflow-visible scrollbar-hide"
    >
      <div
        class="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-4 sm:gap-6 min-w-max sm:min-w-0"
      >
        <div
          v-for="cat in categories"
          :key="cat.id"
          @click="navigateToCategory(cat.id)"
          class="flex flex-col items-center text-center transition-all duration-300 ease-in-out group cursor-pointer flex-shrink-0 sm:flex-shrink"
        >
          <div
            class="w-20 h-20 rounded-full bg-white/80 backdrop-blur-lg border border-gray-200 shadow-md group-hover:shadow-yellow-300 group-hover:scale-110 group-hover:ring-4 ring-yellow-200 transition-transform duration-300 flex items-center justify-center"
          >
            <img
              :src="cat.img"
              :alt="cat.name || 'Category'"
              class="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-125"
              @error="onImageError"
            />
          </div>
          <p
            class="mt-2 text-sm font-semibold text-gray-700 group-hover:text-yellow-600 transition-all duration-300 tracking-wide group-hover:scale-105"
          >
            {{ cat.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
