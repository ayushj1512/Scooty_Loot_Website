<template>
  <section class="relative w-full h-[70vh] sm:h-[90vh] overflow-hidden rounded-b-2xl shadow-xl" @touchstart="startSwipe"
    @touchend="endSwipe" @mousedown="startSwipe" @mouseup="endSwipe">
    <!-- Slides -->
    <transition-group name="slide" tag="div" class="w-full h-full relative">
      <div v-for="(image, index) in currentImages" :key="index" v-show="currentIndex === index"
        class="absolute inset-0 transition-transform duration-700 ease-in-out">
        <img :src="image" alt="Hero Banner" class="w-full h-full object-fit" />
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
  '/mobile_banner_4.png',
  '/mobile_banner_5.png',
  '/mobile_banner_6.png'
]

const desktopImages = [
  '/banner_1.png',
  '/banner_2.png',
  '/banner_3.png'
]

const isMobile = ref(false)
const currentIndex = ref(0)
let interval = null
const startX = ref(0)

const currentImages = computed(() => (isMobile.value ? mobileImages : desktopImages))

const updateScreen = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
  }
}

const startSwipe = (e) => {
  startX.value = e.touches ? e.touches[0].clientX : e.clientX
}

const endSwipe = (e) => {
  const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
  const diff = startX.value - endX

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // Swipe Left
      currentIndex.value = (currentIndex.value + 1) % currentImages.value.length
    } else {
      // Swipe Right
      currentIndex.value =
        (currentIndex.value - 1 + currentImages.value.length) % currentImages.value.length
    }
  }
}

onMounted(() => {
  updateScreen()
  window.addEventListener('resize', updateScreen)

  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % currentImages.value.length
  }, 5000)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreen)
  clearInterval(interval)
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.6s ease;
  position: absolute;
  width: 100%;
  height: 100%;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateX(0%);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
