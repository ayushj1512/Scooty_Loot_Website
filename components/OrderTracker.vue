<template>
  <div class="p-3 sm:p-4 bg-white rounded-xl shadow-md w-full max-w-7xl mx-auto transition-all duration-300">
    <h2 class="text-lg sm:text-xl font-bold mb-4 text-center text-gray-800">Order Tracker</h2>

    <!-- Progress Bar -->
    <div class="relative flex justify-between items-center mb-6">
      <div class="absolute top-4 left-3 right-3 h-1.5 bg-gray-200 rounded-full z-0">
        <div class="h-full rounded-full transition-all duration-500" :class="progressColor"
          :style="{ width: progressWidth }"></div>
      </div>

      <template v-for="(stage, index) in stages" :key="index">
        <div class="relative z-10 flex flex-col items-center w-1/3">
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm shadow transition transform"
            :class="index < currentStage ? `${stage.color} ring-2 ring-white` : (index === currentStage ? `${stage.color} scale-105` : 'bg-gray-300')">
            <span v-if="index < currentStage">✔</span>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <p class="mt-1 text-[10px] text-center text-gray-600 leading-tight">{{ stage.label }}</p>
        </div>
      </template>
    </div>

    <!-- Greeting -->
    <transition name="fade">
      <p class="text-xs sm:text-sm font-medium text-center text-gray-700 mb-2" :key="currentGreeting">
        {{ currentGreeting }}
      </p>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const currentStage = ref(0)
const isCancelled = ref(false)

const stages = [
  { label: 'Pending', color: 'bg-red-500' },
  { label: 'Dispatch', color: 'bg-yellow-500' },
  { label: 'Delivered', color: 'bg-green-500' }
]

const greetings = [
  '⏳ Order pending!',
  '🚚 Order dispatched!',
  '✅ Order delivered! Enjoy!',
  '❌ Order cancelled.'
]

const statusToStageMap = {
  'Pending': 0,
  'Dispatch': 1,
  'Dispatched': 1,
  'Delivered': 2,
  'Done': 2,
  'Cancelled': 0
}

const progressColor = computed(() => {
  if (isCancelled.value) return 'bg-red-700'
  return currentStage.value === 2 ? 'bg-green-500' : 'bg-red-500'
})

const progressWidth = computed(() => {
  const total = stages.length - 1
  return `${(currentStage.value / total) * 100}%`
})

const currentGreeting = computed(() => {
  if (isCancelled.value) return greetings[3]
  return greetings[currentStage.value] || ''
})

watch(
  () => props.status,
  (val) => {
    const trimmed = val.trim()
    isCancelled.value = trimmed === 'Cancelled'
    currentStage.value = statusToStageMap[trimmed] ?? 0
  },
  { immediate: true }
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
