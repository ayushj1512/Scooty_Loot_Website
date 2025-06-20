<template>
  <div class="card hover:shadow-lg transition-shadow duration-300 cursor-pointer group" @click="goToRestaurant">
    <div class="relative">
      <img
        :src="restaurant.image"
        :alt="restaurant.name"
        class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      >
      <div v-if="restaurant.featured" class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
        Featured
      </div>
      <div class="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
        <Icon name="heroicons:star" class="w-4 h-4 text-yellow-400 fill-current" />
        <span class="text-sm font-medium">{{ restaurant.rating }}</span>
        <span class="text-sm text-gray-600">({{ restaurant.reviewCount }})</span>
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="font-bold text-lg text-gray-900 mb-1 group-hover:text-red-500 transition-colors">
        {{ restaurant.name }}
      </h3>
      <p class="text-gray-600 text-sm mb-3">{{ restaurant.cuisine }}</p>
      
      <div class="flex items-center justify-between text-sm">
        <div class="flex items-center space-x-4 text-gray-600">
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:clock" class="w-4 h-4" />
            <span>{{ restaurant.deliveryTime }} min</span>
          </div>
          <div class="flex items-center space-x-1">
            <Icon name="heroicons:banknotes" class="w-4 h-4" />
            <span>${{ restaurant.deliveryFee }} delivery</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  restaurant: {
    type: Object,
    required: true
  }
})

const goToRestaurant = () => {
  navigateTo(`/restaurant/${props.restaurant.id}`)
}
</script>