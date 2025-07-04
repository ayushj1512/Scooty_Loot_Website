<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-rose-100 px-4 py-10">
        <!-- 🔔 Notifications -->
        <div class="fixed top-4 right-4 z-50 space-y-2 w-[90%] max-w-sm sm:top-5 sm:right-5">
            <transition name="slide-fade">
                <div v-if="showNotification && notificationType === 'success'"
                    class="w-full bg-green-50 border-l-4 border-green-500 text-green-900 px-4 py-3 rounded-xl shadow-lg flex gap-3">
                    <div class="text-xl animate-bounce">✅</div>
                    <div class="flex-1">
                        <p class="font-semibold text-sm">Success</p>
                        <p class="text-xs text-gray-700 mt-0.5">{{ notificationMessage }}</p>
                    </div>
                    <button @click="showNotification = false"
                        class="text-green-900 hover:text-red-500 text-lg leading-none">&times;</button>
                </div>
            </transition>

            <transition name="slide-fade">
                <div v-if="showNotification && notificationType === 'error'"
                    class="w-full bg-red-50 border-l-4 border-red-500 text-red-900 px-4 py-3 rounded-xl shadow-lg flex gap-3">
                    <div class="text-xl animate-bounce">❌</div>
                    <div class="flex-1">
                        <p class="font-semibold text-sm">Error</p>
                        <p class="text-xs text-gray-700 mt-0.5">{{ notificationMessage }}</p>
                    </div>
                    <button @click="showNotification = false"
                        class="text-red-900 hover:text-red-600 text-lg leading-none">&times;</button>
                </div>
            </transition>
        </div>

        <!-- Login Card -->
        <div class="w-full max-w-sm bg-white p-6 rounded-3xl shadow-xl border border-gray-100 animate-fade-in">
            <!-- Header -->
            <!-- Header -->
            <div class="text-center mb-6">
                <div class="text-4xl mb-2">🛵</div>
                <h2 class="text-2xl font-bold text-gray-800">Get Ready, We're Already on the Way!</h2>
                <p class="text-sm text-gray-500 mt-1">Login to order your favourites and get them in just 30 minutes 🚀
                </p>
            </div>


            <form @submit.prevent="handleSubmit" class="space-y-5">
                <!-- Mobile Number -->
                <div>
                    <label class="block text-sm text-gray-600 mb-1">Mobile Number</label>
                    <input type="tel" v-model="mobile" maxlength="10" inputmode="numeric"
                        placeholder="Enter 10-digit number"
                        class="w-full bg-white px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                        required :disabled="otpStep" />
                </div>

                <!-- OTP Inputs -->
                <transition name="fade">
                    <div v-if="otpStep" class="bg-white border border-red-100 rounded-xl p-4 shadow-sm">
                        <label class="block text-sm text-gray-600 mb-2">Enter OTP</label>
                        <div class="flex justify-between gap-2 max-w-xs mx-auto">
                            <input v-for="(digit, index) in otpDigits" :key="index" ref="otpInput" type="text"
                                maxlength="1" inputmode="numeric"
                                class="flex-1 min-w-[48px] h-12 text-center text-lg bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-red-400"
                                v-model="otpDigits[index]" @input="handleDigitInput(index)"
                                @keydown.backspace="handleBackspace(index, $event)" />
                        </div>
                    </div>
                </transition>

                <!-- Submit Button -->
                <button type="submit" :disabled="loading"
                    class="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-sm font-semibold transition duration-300 disabled:opacity-50">
                    {{ loading ? 'Please wait...' : (otpStep ? 'Verify OTP' : 'Send OTP') }}
                </button>
            </form>

            <!-- Footer -->
            <p class="text-xs text-center text-gray-500 mt-6">
                Having trouble? <span class="underline cursor-pointer">Contact support</span> 📞
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '~/stores/useSessionStore'

const router = useRouter()
const session = useSessionStore()

const mobile = ref('')
const loading = ref(false)
const otpStep = ref(false)
const otpVerified = ref(false)
const otpDigits = reactive(['', '', '', ''])
const otpInput = ref([])
const showNotification = ref(false)
const notificationMessage = ref('')
const notificationType = ref('success')

function getOtp() {
    return otpDigits.join('')
}

function triggerNotification(message, type = 'success') {
    notificationMessage.value = message
    notificationType.value = type
    showNotification.value = true
    setTimeout(() => {
        showNotification.value = false
    }, 3000)
}

function handleDigitInput(index) {
    const digit = otpDigits[index].replace(/\D/g, '') // keep only digits
    otpDigits[index] = digit
    if (digit && index < 3) {
        nextTick(() => otpInput.value[index + 1]?.focus())
    }
}

function handleBackspace(index, e) {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
        nextTick(() => otpInput.value[index - 1]?.focus())
    }
}

// Send OTP to the entered mobile
async function sendOtp() {
    if (!/^\d{10}$/.test(mobile.value)) {
        triggerNotification('Enter a valid 10-digit mobile number', 'error')
        return
    }

    loading.value = true
    try {
        const payload = {
            gateway_action: 'customer/sendLoginOTP',
            email: mobile.value,
            site: 'sss',
            microSite: 'funkypanda',
            id_cart: ''
        }

        await fetch('https://gateway.streetstylestore.com/gateway/v1/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        otpStep.value = true
        otpDigits.fill('')
        triggerNotification('OTP sent successfully to your mobile 📲', 'success')
        await nextTick()
        otpInput.value[0]?.focus()
    } catch (err) {
        console.error(err)
        triggerNotification('Failed to send OTP. Please try again.', 'error')
    } finally {
        loading.value = false
    }
}

// Verify the entered OTP
async function verifyOtp() {
    const enteredOtp = getOtp()
    if (!/^\d{4}$/.test(enteredOtp)) {
        triggerNotification('Enter a valid 4-digit OTP', 'error')
        return
    }

    loading.value = true
    try {
        const payload = {
            gateway_action: 'customer/verifyOTP',
            id_cart: '31955416',
            microSite: 'funkypanda',
            mobileNumber: mobile.value,
            otp: enteredOtp,
            site: 'sss'
        }

        const response = await fetch('https://gateway.streetstylestore.com/gateway/v1/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        const data = await response.json()

        if (data.status === 200) {
            session.setSession(
                {
                    name: '',
                    mobile: mobile.value,
                    email: ''
                },
                data.key || 'mock-token-xyz'
            )

            otpVerified.value = true
            triggerNotification('Login successful 🎉', 'success')

            const redirectTo = session.redirectPath || '/profile'
            session.clearRedirect?.()

            setTimeout(() => {
                router.push(redirectTo)
            }, 1000)
        } else if (data.status === 202) {
            triggerNotification(data.loginOTPMessage || 'Invalid OTP ❌', 'error')
        } else {
            triggerNotification('Unexpected response received ❌', 'error')
            console.warn('Unhandled status:', data)
        }
    } catch (err) {
        console.error(err)
        triggerNotification('Something went wrong. Please try again.', 'error')
    } finally {
        loading.value = false
    }
}


async function handleSubmit() {
    if (!otpStep.value) {
        await sendOtp()
    } else if (!otpVerified.value) {
        await verifyOtp()
    }
}
</script>




<style scoped>
@keyframes fade-in {
    0% {
        opacity: 0;
        transform: translateY(14px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

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

.animate-fade-in {
    animation: fade-in 0.4s ease-out forwards;
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

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
