<template>
  <section class="relative w-full h-[70vh] sm:h-[90vh] overflow-hidden rounded-2xl shadow-xl">
    <!-- Slides -->
    <transition-group name="slide-right" tag="div" class="w-full h-full relative">
      <div v-for="(image, index) in currentImages" :key="index" v-show="currentIndex === index"
        class="absolute inset-0 transition-transform duration-700 ease-in-out">
        <img :src="image" alt="Hero Banner" class="w-full h-full object-cover" />
      </div>
    </transition-group>

    <!-- Dots -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
      <button v-for="(image, index) in currentImages" :key="index" @click="currentIndex = index" :class="{
        'bg-white': currentIndex === index,
        'bg-gray-400': currentIndex !== index
      }" class="w-3 h-3 rounded-full transition-all duration-300"></button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const mobileImages = [
  '/mobile_banner_1.png',
  '/mobile_banner_2.png',
  '/mobile_banner_3.png'
]

const desktopImages = [
  '/banner_1.png',
  '/banner_2.png',
  '/banner_3.png'
]

const isMobile = ref(false)

const updateScreen = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
  }
}

onMounted(() => {
  updateScreen() // ✅ Initial check
  window.addEventListener('resize', updateScreen)
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % currentImages.value.length
  }, 4000)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreen)
  clearInterval(interval)
})

const currentImages = computed(() => (isMobile.value ? mobileImages : desktopImages))

const currentIndex = ref(0)
let interval = null
</script>

<style scoped>
/* Slide Right Animation */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.7s ease;
  position: absolute;
  width: 100%;
  height: 100%;
}

.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-right-enter-to {
  transform: translateX(0%);
  opacity: 1;
}

.slide-right-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

.slide-right-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
