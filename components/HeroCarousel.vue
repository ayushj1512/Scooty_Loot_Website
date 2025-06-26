<template>
  <section
    class="relative w-full h-[70vh] sm:h-[90vh] overflow-hidden rounded-b-2xl shadow-xl"
    @touchstart="startSwipe"
    @touchend="endSwipe"
    @mousedown="startSwipe"
    @mouseup="endSwipe"
  >
    <!-- Slides -->
    <transition-group name="slide" tag="div" class="w-full h-full relative">
      <div
        v-for="(image, index) in currentImages"
        :key="index"
        v-show="currentIndex === index"
        class="absolute inset-0 transition-transform duration-700 ease-in-out"
      >
        <img
          v-if="image"
          :src="image"
          @error="onImageError"
          alt="Banner"
          class="w-full h-full object-fit"
        />
      </div>
    </transition-group>

    <!-- Dots -->
    <div
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10"
    >
      <button
        v-for="(_, index) in currentImages"
        :key="index"
        @click="currentIndex = index"
        :class="{
          'bg-white': currentIndex === index,
          'bg-gray-400': currentIndex !== index
        }"
        class="w-3 h-3 rounded-full transition-all duration-300"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSssConfig } from '@/stores/useSssConfig'

const sssConfig = useSssConfig()

const isMobile = ref(false)
const currentIndex = ref(0)
let interval = null
const startX = ref(0)

// Mobile images (can stay hardcoded or come from API later)
const mobileImages = [
  '/mobile_banner_4.png',
  '/mobile_banner_5.png',
  '/mobile_banner_6.png'
]

// Get correct images from API via store
const currentImages = computed(() => {
  if (isMobile.value) return mobileImages
  return sssConfig.data?.slider?.map((item) => item.desktopImg) || []
})

const updateScreen = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768
  }
}

const startSwipe = (e) => {
  startX.value = 'touches' in e ? e.touches[0].clientX : e.clientX
}

const endSwipe = (e) => {
  const endX = 'changedTouches' in e
    ? e.changedTouches[0].clientX
    : e.clientX
  const diff = startX.value - endX

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      currentIndex.value = (currentIndex.value + 1) % currentImages.value.length
    } else {
      currentIndex.value =
        (currentIndex.value - 1 + currentImages.value.length) %
        currentImages.value.length
    }
  }
}

const onImageError = (e) => {
  const target = e.target
  if (target && target.tagName === 'IMG') {
    target.src = '/fallback-banner.png'
  }
}

onMounted(() => {
  updateScreen()
  window.addEventListener('resize', updateScreen)

  if (!sssConfig.data) sssConfig.fetchConfig()

  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % currentImages.value.length
  }, 5000)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreen)
  if (interval) clearInterval(interval)
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
