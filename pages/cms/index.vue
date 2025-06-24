<template>
  <section class="px-4 py-10 max-w-7xl mx-auto space-y-10">
    <div class="text-center">
      <h1 class="text-4xl font-extrabold text-black">
        📚 Explore Our <span class="text-red-600">CMS Pages</span>
      </h1>
      <p class="text-gray-600 mt-3 max-w-2xl mx-auto text-base sm:text-lg">
        Dive into ScootyLoot’s story, services, policies, and more.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink
        v-for="page in pages"
        :key="page.slug"
        :to="`/cms/${page.slug}`"
        class="group block bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-xl hover:bg-red-50 transition duration-300"
      >
        <div class="flex items-center gap-4">
          <div
            class="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl font-bold group-hover:bg-black group-hover:text-white transition"
          >
            {{ page.title.charAt(0) }}
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-800 group-hover:text-red-600">{{ page.title }}</h2>
            <p class="text-sm text-gray-600 mt-1">{{ page.description }}</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
const pages = [
  { title: 'About', slug: 'about', description: 'Learn about ScootyLoot’s mission, values and journey.' },
  { title: 'How It Works', slug: 'how-it-works', description: 'Understand our lightning-fast delivery model.' },
  { title: 'Support', slug: 'support', description: 'Need help? Get support and contact options.' },
  { title: 'Terms of Service', slug: 'terms-of-service', description: 'Know the rules while using our platform.' },
  { title: 'Privacy Policy', slug: 'privacy-policy', description: 'Understand how your data is used.' },
  { title: 'Accessibility', slug: 'accessibility', description: 'How we keep ScootyLoot inclusive for all users.' }
]
</script>
