<template>
  <NuxtLayout>

    <Head>
      <link rel="icon" type="image/png" href="/icons/scooter.png" />
    </Head>

    <NuxtPage />
  </NuxtLayout>

  <!-- ✅ Global Toast Component -->
  <teleport to="body">
    <transition name="slide-fade">
      <div v-if="toastVisible" :class="[
        'fixed top-5 right-5 z-[9999] max-w-sm w-full px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-start gap-3 animate-fade-in-up',
        {
          'bg-gradient-to-br from-green-50 to-white border-l-[6px] border-green-500 text-green-900': toastType === 'success',
          'bg-gradient-to-br from-yellow-50 to-white border-l-[6px] border-yellow-500 text-yellow-900': toastType === 'warning',
          'bg-gradient-to-br from-red-50 to-white border-l-[6px] border-red-500 text-red-900': toastType === 'failure',
        }
      ]" role="alert">
        <div class="text-2xl animate-bounce">
          {{ toastType === 'success' ? '✅' : toastType === 'warning' ? '⚠️' : '❌' }}
        </div>
        <div class="flex-1">
          <p class="font-semibold text-sm capitalize">{{ toastType }}</p>
          <p class="text-xs text-gray-700 mt-0.5">{{ toastMessage }}</p>
        </div>
      </div>
    </transition>
  </teleport>
</template>


<script setup>
import { useSssConfig } from '~/stores/useSssConfig'
import { onMounted } from 'vue'
import { useToast } from '~/composables/useToast'

const { toastMessage, toastVisible, toastType } = useToast()

const sssStore = useSssConfig()
onMounted(() => {
  if (!sssStore.data) {
    sssStore.fetchConfig()
  }
})
</script>


<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out forwards;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
