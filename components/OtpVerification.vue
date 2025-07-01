<template>
    <div class="space-y-5 relative">
        <!-- ✅ Toast Notification -->
        <div v-if="toastMessage"
            class="fixed top-4 right-4 z-50 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-lg text-base font-semibold transition-opacity duration-300">
            {{ toastMessage }}
        </div>

        <!-- 📱 Mobile Input & Send OTP -->
        <div v-if="!otpSent">
            <label class="label">Mobile Number</label>
            <div class="flex items-center gap-3">
                <input v-model="phone" type="tel" maxlength="10" placeholder="Enter 10-digit number"
                    class="input-field flex-1" />
                <button @click="sendOtp"
                    class="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"
                    :disabled="sending">
                    <span v-if="sending" class="loader"></span>
                    <span>{{ sending ? 'Sending...' : 'Send OTP' }}</span>
                </button>
            </div>
        </div>

        <!-- 🔢 OTP Input & Verify -->
        <div v-else>
            <label class="label">Enter OTP sent to {{ phone }}</label>
            <div class="flex justify-between gap-3 mt-2 max-w-xs mx-auto">
                <input v-for="(digit, index) in otp" :key="index" type="text" maxlength="1" v-model="otp[index]"
                    :disabled="otpVerified" @input="handleOtpInput(index, $event)"
                    @keydown.backspace="handleBackspace(index, $event)" class="otp-input" />
            </div>

            <!-- ✅ OTP Button States -->
            <button v-if="!otpVerified" @click="verifyOtp"
                class="w-full mt-5 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2"
                :disabled="verifying">
                <span v-if="verifying" class="loader h-5 w-5 border-white"></span>
                <span>{{ verifying ? 'Verifying...' : 'Verify OTP' }}</span>
            </button>

            <div v-else
                class="w-full mt-5 py-3 bg-green-500 text-white font-semibold rounded-lg flex items-center justify-center gap-2">
                <span>✔️ OTP Verified</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['verified'])

const props = defineProps<{
    cartId: string
}>()

const phone = ref('')
const otp = ref(['', '', '', ''])
const otpSent = ref(false)
const otpVerified = ref(false)
const sending = ref(false)
const verifying = ref(false)
const toastMessage = ref('')

const sendOtp = async () => {
    if (!/^\d{10}$/.test(phone.value)) {
        alert('Please enter a valid 10-digit number.')
        return
    }

    sending.value = true
    try {
        const payload = {
            gateway_action: 'customer/sendLoginOTP',
            email: phone.value,
            site: 'sss',
            microSite: 'funkypanda',
            id_cart: props.cartId
        }

        await fetch('https://gateway.streetstylestore.com/gateway/v1/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        otpSent.value = true
        toastMessage.value = 'OTP sent successfully ✅'
        setTimeout(() => (toastMessage.value = ''), 3000)
    } catch (err) {
        alert('Failed to send OTP. Try again.')
        console.error(err)
    } finally {
        sending.value = false
    }
}

const verifyOtp = async () => {
    const enteredOtp = otp.value.join('')
    if (!/^\d{4}$/.test(enteredOtp)) {
        alert('Please enter a valid 4-digit OTP.')
        return
    }

    verifying.value = true
    try {
        const payload = {
            gateway_action: 'customer/customerLoginOTP',
            username: phone.value,
            site: 'sss',
            otp: enteredOtp,
            microSite: 'funkypanda',
            id_cart: props.cartId
        }

        await fetch('https://gateway.streetstylestore.com/gateway/v1/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        otpVerified.value = true
        toastMessage.value = 'OTP verified successfully ✅'
        emit('verified', { phone: phone.value })
        setTimeout(() => (toastMessage.value = ''), 3000)
    } catch (err) {
        alert('OTP verification failed.')
        console.error(err)
    } finally {
        verifying.value = false
    }
}

const handleOtpInput = (index: number, e: Event) => {
    const input = e.target as HTMLInputElement
    if (input.value && index < otp.value.length - 1) {
        const next = document.querySelectorAll('.otp-input')[index + 1] as HTMLInputElement
        next?.focus()
    }
}

const handleBackspace = (index: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp.value[index] && index > 0) {
        const prev = document.querySelectorAll('.otp-input')[index - 1] as HTMLInputElement
        prev?.focus()
    }
}
</script>

<!-- <style >
.otp-input {
    @apply w-12 h-12 text-lg text-center border border-red-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition bg-white text-black;
}

.label {
    @apply block text-sm font-semibold text-gray-700 mb-1;
}

.input-field {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-red-500 transition;
}

.loader {
    @apply animate-spin rounded-full border-2 border-t-2 border-white;
    border-top-color: transparent;
}
</style> -->
