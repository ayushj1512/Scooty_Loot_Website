<template>
  <div class="min-h-screen bg-white flex items-center justify-center px-4 relative">
    <!-- ✅ Top-Right Toast -->
    <div
      v-if="showToast"
      class="fixed top-5 right-5 z-50 bg-green-100 text-green-800 px-6 py-4 rounded-lg shadow-lg text-lg font-medium transition-opacity duration-300"
    >
      OTP sent successfully ✅
    </div>

    <div
      class="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200 px-10 py-12 space-y-8 animate-fadeIn"
    >
      <!-- Header -->
      <div class="text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4 shadow">
          <Icon name="heroicons:shield-check" class="w-8 h-8" />
        </div>
        <h2 class="text-3xl font-bold text-gray-800">Verify Before Placing Order</h2>
        <p class="text-lg text-gray-500 mt-1">Secure your checkout with OTP verification 🔒</p>
      </div>

      <!-- OTP Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Phone Number Input -->
        <div v-if="!otpSent" class="space-y-3">
          <label class="text-lg font-semibold text-gray-700">Mobile Number</label>
          <input
            v-model="mobile"
            type="tel"
            maxlength="10"
            placeholder="Enter your mobile number"
            class="w-full px-5 py-3.5 bg-white text-gray-800 text-lg placeholder-gray-400 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            class="w-full py-3 mt-3 bg-red-500 text-white text-lg font-semibold rounded-xl hover:bg-red-600 transition duration-200"
          >
            Send OTP
          </button>
        </div>

        <!-- OTP Input -->
        <div v-else class="space-y-4">
          <label class="text-lg font-semibold text-gray-700">Enter the OTP sent to {{ mobile }}</label>
          <div class="flex justify-between gap-4">
            <input
              v-for="(digit, index) in otp"
              :key="index"
              type="text"
              maxlength="1"
              v-model="otp[index]"
              @input="handleOtpInput(index, $event)"
              @keydown.backspace="handleBackspace(index, $event)"
              class="otp-input w-1/4 px-5 py-4 bg-white text-gray-800 text-2xl text-center border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition-transform"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full py-3 mt-5 bg-red-500 text-white text-lg font-semibold rounded-xl hover:bg-red-600 transition duration-200 flex justify-center items-center gap-3"
            :disabled="isVerifying"
          >
            <span v-if="isVerifying" class="loader ease-linear rounded-full border-4 border-t-4 border-white h-5 w-5"></span>
            <span>{{ isVerifying ? 'Verifying...' : 'Verify OTP & Place Order' }}</span>
          </button>
          <div class="text-sm text-gray-500 text-center mt-2">
            Didn’t receive it? <a href="#" class="text-red-600 hover:underline">Resend</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mobile = ref('')
const otpSent = ref(false)
const otp = ref(['', '', '', ''])
const isVerifying = ref(false)
const showToast = ref(false)

const handleSubmit = () => {
  if (!otpSent.value) {
    if (/^\d{10}$/.test(mobile.value)) {
      otpSent.value = true
      showToast.value = true
      setTimeout(() => {
        showToast.value = false
      }, 2500)
    } else {
      alert('Please enter a valid 10-digit mobile number.')
    }
  } else {
    const enteredOtp = otp.value.join('')
    if (!/^\d{4}$/.test(enteredOtp)) {
      alert('Please enter a valid 4-digit OTP.')
      return
    }
    isVerifying.value = true
    setTimeout(() => {
      isVerifying.value = false
      router.push('/order-success')
    }, 2000)
  }
}

const handleOtpInput = (index: number, e: Event) => {
  const input = e.target as HTMLInputElement
  input.classList.add('bounce')
  setTimeout(() => input.classList.remove('bounce'), 300)

  if (input.value && index < otp.value.length - 1) {
    const nextInput = document.querySelectorAll('.otp-input')[index + 1] as HTMLInputElement
    nextInput?.focus()
  }
}

const handleBackspace = (index: number, e: KeyboardEvent) => {
  if (e.key === 'Backspace' && !otp.value[index] && index > 0) {
    const prevInput = document.querySelectorAll('.otp-input')[index - 1] as HTMLInputElement
    prevInput?.focus()
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.15);
  }
  80% {
    transform: scale(0.95);
  }
}
.bounce {
  animation: bounce 0.3s ease;
}

.loader {
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
