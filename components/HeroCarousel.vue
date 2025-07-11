<template>
  <section class="relative w-full h-[70vh] sm:h-[90vh] overflow-hidden rounded-b-2xl shadow-xl bg-black"
    @touchstart="startSwipe" @touchmove="onTouchMove" @touchend="endSwipe" @mousedown="startSwipe"
    @mousemove="onMouseMove" @mouseup="endSwipe">
    <!-- Slide Track -->
    <div class="flex transition-transform duration-500 ease-in-out h-full"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div v-for="(image, index) in extendedImages" :key="index" class="min-w-full h-full">
        <img v-if="image" :src="image" @error="onImageError" alt="Banner" class="w-full h-full object-cover" />
      </div>
    </div>

    <!-- Dots -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
      <button v-for="(img, index) in images" :key="index" @click="goToIndex(index)" :class="{
        'bg-white': currentIndex === index,
        'bg-gray-400': currentIndex !== index
      }" class="w-3 h-3 rounded-full transition-all duration-300" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSssConfig } from '@/stores/useSssConfig'

const sssConfig = useSssConfig()
const currentIndex = ref(0)
const startX = ref(null)
const currentX = ref(null)
const isDragging = ref(false)
let interval = null

const isMobile = ref(false)
const mobileImages = [
  '/mobile_banner_4.png',
  '/mobile_banner_5.png',
  '/mobile_banner_6.png'
]

const images = computed(() => {
  return isMobile.value
    ? mobileImages
    : sssConfig.data?.slider?.map((item) => item.desktopImg).filter(Boolean) || []
})

// Duplicate first and last image for infinite swipe illusion
const extendedImages = computed(() => {
  if (!images.value.length) return []
  return [images.value[images.value.length - 1], ...images.value, images.value[0]]
})

// Jump without animation (used in infinite loop jump)
const jumpTo = (index) => {
  currentIndex.value = index
}

const updateScreen = () => {
  isMobile.value = window.innerWidth < 768
}

const goToIndex = (index) => {
  currentIndex.value = index
}

// Autoplay
const startAutoSlide = () => {
  interval = setInterval(() => {
    currentIndex.value++
    if (currentIndex.value > images.value.length) {
      setTimeout(() => {
        currentIndex.value = 1
      }, 510)
    }
  }, 5000)
}

const stopAutoSlide = () => {
  if (interval) clearInterval(interval)
}

// Swipe Handling
const startSwipe = (e) => {
  isDragging.value = true
  startX.value = 'touches' in e ? e.touches[0].clientX : e.clientX
}

const onTouchMove = (e) => {
  if (!isDragging.value) return
  currentX.value = e.touches[0].clientX
}

const onMouseMove = (e) => {
  if (!isDragging.value) return
  currentX.value = e.clientX
}

const endSwipe = () => {
  if (!isDragging.value || startX.value === null || currentX.value === null) return
  const diff = startX.value - currentX.value

  if (diff > 50) {
    currentIndex.value++
    if (currentIndex.value > images.value.length) {
      setTimeout(() => {
        currentIndex.value = 1
      }, 510)
    }
  } else if (diff < -50) {
    currentIndex.value--
    if (currentIndex.value < 0) {
      setTimeout(() => {
        currentIndex.value = images.value.length - 1
      }, 510)
    }
  }

  isDragging.value = false
  startX.value = null
  currentX.value = null
}

// Fix infinite loop edge cases
watch(currentIndex, (val) => {
  if (val === images.value.length + 1) {
    setTimeout(() => {
      currentIndex.value = 1
    }, 10)
  }
  if (val === 0) {
    setTimeout(() => {
      currentIndex.value = images.value.length
    }, 10)
  }
})

const onImageError = (e) => {
  if (e.target && e.target.tagName === 'IMG') {
    e.target.src = '/fallback-banner.png'
  }
}

onMounted(() => {
  updateScreen()
  window.addEventListener('resize', updateScreen)

  if (!sssConfig.data) sssConfig.fetchConfig()

  if (images.value.length) {
    currentIndex.value = 1 // Start from actual first image
    startAutoSlide()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreen)
  stopAutoSlide()
})
</script>

<style scoped>
/* Optional: Add custom animation styles */
</style>
