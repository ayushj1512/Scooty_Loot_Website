  <template>
    <div class="pt-6 space-y-12">
      <div
        v-for="section in sections"
        :key="section.title"
        :class="[section.theme + ' py-8 px-4 rounded-2xl shadow-md max-w-7xl mx-auto']"
      >
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800 tracking-tight">{{ section.title }}</h2>
          <span
            class="text-sm font-medium text-red-600 hover:underline hover:text-red-700 cursor-pointer transition"
            @click="loadMore(section)"
          >
            → More
          </span>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap gap-2 mb-3">
          <button
            v-for="filter in priceFilters"
            :key="filter.value"
            @click="section.selectedPrice = filter.value"
            :class="[
              'px-3 py-1 text-xs rounded-full border font-medium transition',
              section.selectedPrice === filter.value
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button
            v-for="tag in availableTags"
            :key="tag"
            @click="toggleTag(section, tag)"
            :class="[
              'px-3 py-1 text-xs rounded-full border font-medium transition',
              section.selectedTags.includes(tag)
                ? 'bg-yellow-400 text-white border-yellow-400'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-yellow-100'
            ]"
          >
            {{ tag }}
          </button>
        </div>

        <!-- Loader -->
        <div v-if="section.loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div
            v-for="n in 10"
            :key="n"
            class="animate-pulse bg-gray-200 h-60 rounded-xl"
          ></div>
        </div>

        <!-- Product Grid -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div
            v-for="product in filtered(section).slice(0, section.visibleCount)"
            :key="product.id"
            class="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition p-3 relative"
          >
            <img
              :src="product.thumbnail"
              alt=""
              class="w-full h-32 object-cover rounded-lg mb-2"
              loading="lazy"
            />

            <!-- Tags -->
            <div class="absolute top-2 left-2 flex gap-1 flex-wrap z-10">
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="text-[10px] bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded-full font-semibold shadow-sm"
              >
                {{ tag }}
              </span>
            </div>

            <h3 class="text-sm font-semibold text-gray-900 truncate">
              {{ product.title }}
            </h3>
            <p class="text-xs text-gray-500 truncate mb-1">
              {{ product.description }}
            </p>

            <div class="flex justify-between items-center mt-1">
              <p class="text-red-600 font-bold text-sm">₹{{ product.price }}</p>
              <p class="text-yellow-500 text-xs">⭐ {{ product.rating }}</p>
            </div>

            <button
              class="mt-3 w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-1.5 rounded-full transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue'

  // Tags specific to fashion
  const availableTags = ['New In', 'Trendy', 'Luxury', 'Sustainable', 'Casual']

  const priceFilters = [
    { label: 'All', value: 'all' },
    { label: 'Rating ↑', value: 'rating' },
    { label: 'Price ↑', value: 'price-asc' },
    { label: 'Price ↓', value: 'price-desc' }
  ]

  const sections = ref([
    {
      title: 'New Arrivals',
      theme: 'bg-pink-50',
      products: [],
      loading: true,
      selectedPrice: 'all',
      selectedTags: [],
      skip: 0,
      visibleCount: 10
    },
    {
      title: 'Casual Wear',
      theme: 'bg-rose-50',
      products: [],
      loading: true,
      selectedPrice: 'all',
      selectedTags: [],
      skip: 0,
      visibleCount: 10
    },
    {
      title: 'Formal Looks',
      theme: 'bg-red-50',
      products: [],
      loading: true,
      selectedPrice: 'all',
      selectedTags: [],
      skip: 0,
      visibleCount: 10
    },
    {
      title: 'Luxury Picks',
      theme: 'bg-yellow-50',
      products: [],
      loading: true,
      selectedPrice: 'all',
      selectedTags: [],
      skip: 0,
      visibleCount: 10
    },
    {
      title: 'Street Style',
      theme: 'bg-neutral-100',
      products: [],
      loading: true,
      selectedPrice: 'all',
      selectedTags: [],
      skip: 0,
      visibleCount: 10
    }
  ])

  // Assign random tags to each product
  const getRandomTags = () => {
    return availableTags.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)
  }

  // Fetch products from API
  const fetchProducts = async (skip = 0, limit = 10) => {
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
    const data = await res.json()
    return data.products.map(p => ({ ...p, tags: getRandomTags() }))
  }

  // Load initial data
  onMounted(async () => {
    for (const section of sections.value) {
      const initial = await fetchProducts(0, 20)
      section.products = initial
      section.skip = 20
      section.loading = false
    }
  })

  // Load More functionality
  const loadMore = async (section) => {
    section.loading = true
    try {
      const next = await fetchProducts(section.skip, 10)
      section.products = [...section.products, ...next]
      section.skip += 10
      section.visibleCount += 10
    } catch (err) {
      console.error('Error loading products:', err)
    }
    section.loading = false
  }

  // Tag toggler
  const toggleTag = (section, tag) => {
    if (section.selectedTags.includes(tag)) {
      section.selectedTags = section.selectedTags.filter(t => t !== tag)
    } else {
      section.selectedTags.push(tag)
    }
  }

  // Product filtering
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
