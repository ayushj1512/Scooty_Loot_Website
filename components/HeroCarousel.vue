<template>
  <section
    class="relative w-full overflow-hidden rounded-2xl shadow-xl"
    :class="carouselHeight"
  >
    <!-- Slides -->
    <transition-group
      name="fade"
      tag="div"
      class="w-full h-full relative"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        v-show="activeIndex === index"
        class="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out"
      >
        <!-- Shimmer Loader -->
        <div
          v-if="!imageLoaded[index]"
          class="absolute inset-0 z-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl"
        ></div>

        <!-- Image -->
        <img
          :src="image"
          :alt="'Hero image ' + (index + 1)"
          class="w-full h-full object-cover object-center rounded-2xl z-0"
          @load="handleImageLoad(index)"
        />
      </div>
    </transition-group>

    <!-- Dots -->
    <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      <span
        v-for="(_, index) in images"
        :key="'dot-' + index"
        class="w-3 h-3 rounded-full transition-all duration-300 border border-white"
        :class="activeIndex === index ? 'bg-white scale-110 shadow-lg' : 'bg-white/50'"
      ></span>
    </div>

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 z-10 pointer-events-none rounded-2xl" />
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const images = [
  '/631ad4ee-019a-48e7-be5e-12d88addcd03.png',
  '/2b1b11b5-e56f-4109-a548-04aab620.png',
  '/cabb3f5c-44fa-483f-a593-84a728ee06e1.png'
]

const activeIndex = ref(0)
const imageLoaded = ref(images.map(() => false))

const carouselHeight = computed(() => {
  return 'h-[200px] sm:h-[300px] md:h-[400px] lg:h-[520px] xl:h-[600px]'
})

function handleImageLoad(index) {
  imageLoaded.value[index] = true
}

function next() {
  activeIndex.value = (activeIndex.value + 1) % images.length
}

let intervalId = null
function startAutoplay() {
  intervalId = setInterval(next, 5000)
}
function stopAutoplay() {
  clearInterval(intervalId)
}

onMounted(startAutoplay)
onBeforeUnmount(stopAutoplay)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
