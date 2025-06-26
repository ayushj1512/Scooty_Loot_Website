<template>
    <div class="relative w-full sm:w-[300px] md:w-[400px] lg:w-full">
        <input v-model="searchValue" type="text" placeholder="Search..."
            class="w-full pl-5 pr-12 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-full text-sm text-black placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition" />
        <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
    </div>
</template>

<script setup>
const model = defineModel('search')
const searchValue = model
</script>
