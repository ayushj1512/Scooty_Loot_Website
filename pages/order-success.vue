<template>
  <div
    class="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-10 relative">
    <!-- 🎉 Ping Dots for subtle animation -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute top-10 left-10 w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
      <div class="absolute top-24 right-20 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
    </div>

    <!-- ✅ Confirmation Box -->
    <div
      class="w-full max-w-md bg-white rounded-3xl shadow-xl border border-green-200 p-8 relative z-10 animate-fadeIn">
      <!-- ✅ Jumping Checkmark -->
      <div
        class="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-green-300 animate-bounce-strong">
        <Icon name="heroicons:check-circle" class="w-10 h-10 text-green-600 drop-shadow-lg" />
      </div>

      <!-- 🎉 Message -->
      <h2 class="text-2xl font-bold text-green-700 text-center mb-1">🎉 Woohoo! Order Placed</h2>
      <p class="text-green-600 text-center text-sm mb-1">
        Sit back & relax. Your order is being processed.
      </p>
      <p class="text-green-600 text-center text-sm mb-6">
        You’ll receive updates via SMS or WhatsApp.
      </p>

      <!-- ✅ CTA Button -->
      <NuxtLink to="/restaurants"
        class="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow transition duration-200">
        <Icon name="heroicons:shopping-bag" class="w-5 h-5" />
        Order More
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '#imports'

useHead({
  title: 'Order Confirmed - ScootyLoot',
  meta: [
    { name: 'description', content: 'Your order has been confirmed and is being prepared for delivery.' }
  ]
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98) translateY(10px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out both;
}

@keyframes bounceStrong {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-16px);
  }
}

.animate-bounce-strong {
  animation: bounceStrong 1s infinite ease-in-out;
}
</style>
