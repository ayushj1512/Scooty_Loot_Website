<template>
    <section class="mt-8 bg-white p-4 rounded-xl">
        <!-- Header -->
        <div class="mb-6 text-center">
            <h2 class="text-xl font-bold text-gray-900">Customer & Expert Reviews</h2>
            <p class="text-xs text-gray-600">96% of users loved this restaurant 💖</p>
        </div>

        <!-- Grid: Ratings + Reviews -->
        <div class="grid md:grid-cols-2 items-center">
            <!-- LEFT: Rating Meter & Breakdown -->
            <div class="flex flex-col items-center md:items-start space-y-5 min-h-[420px]">
                <!-- Meter -->
                <div ref="meterRef" class="relative w-36 h-20">
                    <div class="absolute w-full h-full overflow-hidden rotate-180">
                        <div class="w-full h-full rounded-b-full transition-all duration-[2000ms]"
                            :style="{ background: `conic-gradient(#facc15 ${animatedPercent * 1.8}deg, #e5e7eb 0deg)` }">
                        </div>
                    </div>
                    <div class="absolute inset-0 flex items-end justify-center pb-2">
                        <p class="text-lg font-bold text-gray-800">{{ averageRating.toFixed(1) }} / 5</p>
                    </div>
                </div>

                <!-- Stars -->
                <div class="text-center md:text-left">
                    <div class="flex justify-center md:justify-start text-yellow-400">
                        <Icon name="heroicons:star-solid" class="w-5 h-5" v-for="i in Math.floor(averageRating)"
                            :key="i" />
                        <Icon v-if="averageRating % 1 >= 0.5" name="heroicons:star" class="w-5 h-5 text-yellow-300" />
                    </div>
                    <p class="text-xs text-gray-500 mt-1">{{ totalRatings }} ratings</p>
                </div>

                <!-- Breakdown Bars -->
                <div class="space-y-1 w-full max-w-xs">
                    <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center gap-2">
                        <span class="text-xs font-medium w-10">{{ star }}★</span>
                        <div class="w-full bg-gray-200 rounded h-2 overflow-hidden">
                            <div class="bg-yellow-400 h-full"
                                :style="{ width: ((ratingsBreakdown[star] || 0) / totalRatings * 100) + '%' }"></div>
                        </div>
                        <span class="text-xs text-gray-500 w-6 text-right">{{ ratingsBreakdown[star] || 0 }}</span>
                    </div>
                </div>
            </div>

            <!-- RIGHT: Reviews + Sort Tags -->
            <div class="space-y-6 flex flex-col min-h-[420px]">
                <!-- Sort Filters -->
                <div class="flex justify-end  mb-1 flex-wrap">
                    <button v-for="tag in sortOptions" :key="tag.value" @click="activeSort = tag.value" :class="[
                        'px-2.5 py-1 rounded-full text-xs border transition',
                        activeSort === tag.value
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-white text-red-500 border-red-300 hover:bg-red-50'
                    ]">
                        {{ tag.label }}
                    </button>
                </div>

                <!-- Expert Reviews -->
                <div>
                    <h3 class="text-sm font-semibold text-gray-800 mb-1">Expert Reviews</h3>
                    <div class="flex gap-3 overflow-x-auto pb-1">
                        <div v-for="(review, index) in sortedExpertReviews" :key="index"
                            class="min-w-[240px] max-w-xs bg-green-50 border border-green-200 rounded-lg p-4 shadow">
                            <div class="flex items-center gap-3 mb-2">
                                <div class="relative w-10 h-10">
                                    <Icon name="mdi:crown"
                                        class="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 text-yellow-500" />
                                    <img :src="review.avatar"
                                        class="w-10 h-10 rounded-full border-2 border-green-500" />
                                </div>
                                <div>
                                    <h4 class="text-sm font-medium text-gray-800">{{ review.name }}</h4>
                                    <div class="flex text-yellow-400">
                                        <Icon name="heroicons:star-solid" class="w-3.5 h-3.5" v-for="i in review.rating"
                                            :key="i" />
                                    </div>
                                </div>
                            </div>
                            <p class="text-xs text-gray-700">{{ review.comment }}</p>
                        </div>
                    </div>
                </div>

                <!-- Audience Reviews -->
                <div>
                    <h3 class="text-sm font-semibold text-gray-800 mb-1">Audience Reviews</h3>
                    <div class="flex gap-3 overflow-x-auto pb-1">
                        <div v-for="(review, index) in sortedAudienceReviews" :key="index"
                            class="min-w-[240px] max-w-xs bg-red-50 border border-red-200 rounded-lg p-4 shadow">
                            <div class="mb-1">
                                <h4 class="text-sm font-medium text-gray-800">{{ review.name }}</h4>
                                <div class="flex text-yellow-400">
                                    <Icon v-for="i in 5" :key="i"
                                        :name="i <= review.rating ? 'heroicons:star-solid' : 'heroicons:star'"
                                        class="w-4 h-4" />
                                </div>
                            </div>
                            <p class="text-xs text-gray-700">{{ review.comment }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const averageRating = 4.7
const totalRatings = 187
const ratingsBreakdown = {
    5: 140,
    4: 30,
    3: 10,
    2: 5,
    1: 2
}

const animatedPercent = ref(0)
const meterRef = ref(null)
const ratingPercent = (averageRating / 5) * 100

onMounted(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                animatedPercent.value = ratingPercent
                observer.disconnect()
            }
        },
        { threshold: 0.3 }
    )
    if (meterRef.value) observer.observe(meterRef.value)
})

const activeSort = ref('popular')
const sortOptions = [
    { label: 'Popular', value: 'popular' },
    { label: 'High → Low', value: 'high' },
    { label: 'Low → High', value: 'low' }
]

const expertReviews = ref([
    {
        name: 'Chef Arjun Mehta',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        comment: 'Authentic wood-fired pizza, rich in flavor and perfectly crusted.'
    },
    {
        name: 'Chef Rekha',
        avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
        rating: 5,
        comment: 'Beautifully balanced flavors and top-notch presentation!'
    }
])

const audienceReviews = ref([
    {
        name: 'Sneha Kapoor',
        rating: 4,
        comment: 'Pizza was hot, well-packed and delicious. Delivery was quick.'
    },
    {
        name: 'Ravi Singh',
        rating: 5,
        comment: 'Crispy crust, perfect amount of cheese. Loved it!'
    },
    {
        name: 'Anjali Verma',
        rating: 3,
        comment: 'Taste was good but delivery took time.'
    },
    {
        name: 'Rahul Deshmukh',
        rating: 2,
        comment: 'Crust was soggy. Might try again later.'
    }
])

const sortReviews = (list) => {
    switch (activeSort.value) {
        case 'high':
            return [...list].sort((a, b) => b.rating - a.rating)
        case 'low':
            return [...list].sort((a, b) => a.rating - b.rating)
        default:
            return list
    }
}

const sortedExpertReviews = computed(() => sortReviews(expertReviews.value))
const sortedAudienceReviews = computed(() => sortReviews(audienceReviews.value))
</script>

<style scoped>
::-webkit-scrollbar {
    height: 6px;
}

::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 4px;
}
</style>
