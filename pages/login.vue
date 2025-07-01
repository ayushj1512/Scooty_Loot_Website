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
                        <p class="text-xs text-gray-400 mt-2 text-center">Hint: Enter 1234 for demo</p>
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
import { ref, reactive, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '~/stores/useSessionStore'

const router = useRouter()
const session = useSessionStore()
const mobile = ref('')
const loading = ref(false)
const otpStep = ref(false)
const otpDigits = reactive(['', '', '', ''])
const otpInput = ref([])

const notificationMessage = ref('')
const notificationType = ref('success')
const showNotification = ref(false)

function getOtp() {
    return otpDigits.join('')
}

function handleDigitInput(index) {
    const digit = otpDigits[index]
    if (/^\d$/.test(digit) && index < 3) {
        nextTick(() => otpInput.value[index + 1]?.focus())
    } else if (!digit) {
        otpDigits[index] = ''
    }
}

function handleBackspace(index, e) {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
        nextTick(() => otpInput.value[index - 1]?.focus())
    }
}

function triggerNotification(message, type = 'success') {
    notificationMessage.value = message
    notificationType.value = type
    showNotification.value = true
    setTimeout(() => {
        showNotification.value = false
    }, 2500)
}

async function handleSubmit() {
    loading.value = true
    try {
        if (!otpStep.value) {
            await new Promise(r => setTimeout(r, 700))
            otpStep.value = true
            triggerNotification('OTP sent successfully to your mobile 📲', 'success')
            nextTick(() => otpInput.value[0]?.focus())
        } else {
            await new Promise(r => setTimeout(r, 500))
            const enteredOtp = getOtp()

            if (enteredOtp === '1234') {
                session.setSession(
                    {
                        name: 'Ayush Juneja',
                        mobile: mobile.value,
                        email: 'test@ayush.com'
                    },
                    'mock-token-xyz'
                )

                triggerNotification('Login successful 🎉', 'success')

                const redirectTo = session.redirectPath || '/profile'
                session.clearRedirect?.() // optional chaining in case method missing

                // Delay to let user see notification
                setTimeout(() => {
                    router.push(redirectTo)
                }, 1000)
            } else {
                triggerNotification('Invalid OTP ❌ Please try again', 'error')
            }
        }
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    if (Notification && Notification.permission !== 'granted') {
        Notification.requestPermission()
    }
})
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
