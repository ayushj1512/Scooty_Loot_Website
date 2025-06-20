<template>
  <div class="pt-4 space-y-10">
    <div v-for="section in sections" :key="section.title"
      :class="[section.theme, 'py-6 px-3 rounded-xl shadow-sm max-w-7xl mx-auto']">
      <!-- Section Header -->
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-gray-800">{{ section.title }}</h2>
        <span class="text-xs text-red-600 hover:underline hover:text-red-700 cursor-pointer transition"
          @click="loadMore(section)">
          → More
        </span>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-1 mb-2">
        <button v-for="filter in priceFilters" :key="filter.value" @click="section.selectedPrice = filter.value" :class="[
          'px-2.5 py-1 text-[11px] rounded-full border font-medium transition',
          section.selectedPrice === filter.value
            ? 'bg-red-500 text-white border-red-500'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        ]">
          {{ filter.label }}
        </button>
      </div>

      <!-- Tag Filters -->
      <div class="flex flex-wrap gap-1 mb-4">
        <button v-for="tag in availableTags" :key="tag" @click="toggleTag(section, tag)" :class="[
          'px-2.5 py-1 text-[11px] rounded-full border font-medium transition',
          section.selectedTags.includes(tag)
            ? 'bg-yellow-500 text-white border-yellow-500'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-yellow-100'
        ]">
          {{ tag }}
        </button>
      </div>

      <!-- Loader -->
      <div v-if="section.loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <div v-for="n in 10" :key="n" class="animate-pulse bg-gray-200 h-52 rounded-lg"></div>
      </div>

      <!-- Product Grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <div v-for="product in filtered(section).slice(0, section.visibleCount)" :key="product.id"
          class="bg-white rounded-xl border border-gray-100 shadow p-2.5 relative transition">
          <img :src="product.thumbnail" alt="" class="w-full h-28 object-cover rounded-md mb-1.5" loading="lazy" />

          <!-- Tags -->
          <div class="absolute top-2 left-2 flex gap-1 flex-wrap z-10">
            <span v-for="tag in product.tags" :key="tag"
              class="text-[9px] bg-yellow-300 text-yellow-900 px-1.5 py-0.5 rounded-full font-semibold shadow-sm">
              {{ tag }}
            </span>
          </div>

          <h3 class="text-xs font-semibold text-gray-800 truncate">
            {{ product.title }}
          </h3>
          <p class="text-[10px] text-gray-500 truncate">
            {{ product.description }}
          </p>

          <div class="flex justify-between items-center mt-1.5">
            <p class="text-red-600 font-bold text-xs">₹{{ product.price }}</p>
            <p class="text-yellow-500 text-[10px]">⭐ {{ product.rating }}</p>
          </div>

          <button
            class="mt-2 w-full bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-1 rounded-full transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const availableTags = ['Hot', 'Organic', 'Bestseller', 'New', 'Limited']
const priceFilters = [
  { label: 'All', value: 'all' },
  { label: 'Rating ↑', value: 'rating' },
  { label: 'Price ↑', value: 'price-asc' },
  { label: 'Price ↓', value: 'price-desc' }
]

// Initialize section state
const sections = ref([
  { title: 'Delivering Under 30 mins', theme: 'bg-red-50', products: [], loading: true, selectedPrice: 'all', selectedTags: [], skip: 0, visibleCount: 10 },
  { title: 'Delivering Under 15 mins', theme: 'bg-green-50', products: [], loading: true, selectedPrice: 'all', selectedTags: [], skip: 0, visibleCount: 10 },
  { title: 'Summer Needs', theme: 'bg-yellow-50', products: [], loading: true, selectedPrice: 'all', selectedTags: [], skip: 0, visibleCount: 10 },
  { title: 'Sweet Corner', theme: 'bg-pink-50', products: [], loading: true, selectedPrice: 'all', selectedTags: [], skip: 0, visibleCount: 10 },
  { title: 'Staple Needs', theme: 'bg-gray-100', products: [], loading: true, selectedPrice: 'all', selectedTags: [], skip: 0, visibleCount: 10 },
  { title: 'Freshly Prepared', theme: 'bg-blue-50', products: [], loading: true, selectedPrice: 'all', selectedTags: [], skip: 0, visibleCount: 10 },
])

// Utility to assign random tags
const getRandomTags = () => {
  return availableTags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)
}

// API call
const fetchProducts = async (skip = 0, limit = 10) => {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
  const data = await res.json()
  return data.products.map(p => ({ ...p, tags: getRandomTags() }))
}

// On page load
onMounted(async () => {
  for (const section of sections.value) {
    const initial = await fetchProducts(0, 20)
    section.products = initial
    section.skip = 20
    section.loading = false
  }
})

// Load More handler
const loadMore = async (section) => {
  section.loading = true
  try {
    const next = await fetchProducts(section.skip, 10)
    section.products = next // 🔁 Replace current products
    section.skip += 10
    section.visibleCount = 10 // Reset visible count to 10
  } catch (err) {
    console.error('Error loading products:', err)
  }
  section.loading = false
}
// Toggle tags
const toggleTag = (section, tag) => {
  if (section.selectedTags.includes(tag)) {
    section.selectedTags = section.selectedTags.filter(t => t !== tag)
  } else {
    section.selectedTags.push(tag)
  }
}

// Filter logic
const filtered = (section) => {
  let items = [...section.products]

  if (section.selectedTags.length) {
    items = items.filter(product =>
      section.selectedTags.every(tag => product.tags.includes(tag))
    )
  }

  switch (section.selectedPrice) {
    case 'rating':
      items.sort((a, b) => b.rating - a.rating)
      break
    case 'price-asc':
      items.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      items.sort((a, b) => b.price - a.price)
      break
  }

  return items
}
</script>
