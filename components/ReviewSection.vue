<template>
  <div class="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

      <!-- LEFT COLUMN -->
      <div class="flex flex-col space-y-10">
        <!-- Title -->
        <div class="space-y-1">
          <h2 class="text-3xl font-extrabold text-gray-800">Ratings Overview</h2>
          <p class="text-sm text-gray-500">Based on {{ totalRatings }} total reviews</p>
        </div>

        <!-- Circles -->
        <div class="flex gap-8">
          <!-- Expert -->
          <div class="relative w-28 h-28">
            <svg class="w-full h-full" viewBox="0 0 36 36">
              <circle class="text-gray-200" cx="18" cy="18" r="16" fill="none" stroke-width="4" stroke="currentColor" />
              <circle
                :stroke-dasharray="expertArcStroke"
                class="text-green-500 drop-shadow-md"
                cx="18" cy="18" r="16"
                fill="none" stroke-width="4"
                stroke="url(#expertGradient)"
                stroke-linecap="round"
                transform="rotate(-90 18 18)"
              />
              <defs>
                <linearGradient id="expertGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#34d399" />
                  <stop offset="100%" stop-color="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-sm">
              <p class="font-medium text-gray-600">Expert</p>
              <p class="font-bold text-green-600 text-lg">{{ expertRating.toFixed(1) }}/5</p>
            </div>
          </div>

          <!-- Audience -->
          <div class="relative w-28 h-28">
            <svg class="w-full h-full" viewBox="0 0 36 36">
              <circle class="text-gray-200" cx="18" cy="18" r="16" fill="none" stroke-width="4" stroke="currentColor" />
              <circle
                :stroke-dasharray="audienceArcStroke"
                class="text-yellow-400"
                cx="18" cy="18" r="16"
                fill="none" stroke-width="4"
                stroke="currentColor"
                stroke-linecap="round"
                transform="rotate(-90 18 18)"
              />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-sm">
              <p class="font-medium text-gray-600">Audience</p>
              <p class="font-bold text-yellow-500 text-lg">{{ averageRating.toFixed(1) }}/5</p>
            </div>
          </div>
        </div>

        <!-- Star breakdown -->
        <div class="space-y-2 max-w-sm w-full">
          <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center gap-2 text-sm">
            <span class="w-6 font-medium">{{ star }}★</span>
            <div class="w-full bg-gray-200 rounded h-2 overflow-hidden">
              <div class="bg-yellow-400 h-full" :style="{ width: getStarPercent(star) + '%' }"></div>
            </div>
            <span class="w-6 text-right text-gray-600">{{ ratingsBreakdown[star] || 0 }}</span>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="space-y-10">
        <!-- Expert Reviews -->
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-3">Expert Reviews</h3>
          <div class="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth">
            <div v-for="(review, index) in expertReviews" :key="index"
              class="min-w-[250px] bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl shadow p-4 snap-start">
              <div class="flex items-center gap-3 mb-2 relative">
                <div class="relative">
                  <img :src="review.avatar" class="w-10 h-10 rounded-full border-2 border-green-500" />
                  <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-lg">👑</span>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-800">{{ review.name }}</p>
                  <div class="flex text-yellow-400 text-sm leading-none">
                    <span v-for="i in review.rating" :key="i">★</span>
                  </div>
                </div>
              </div>
              <p class="text-sm text-gray-700 leading-snug">{{ review.comment }}</p>
            </div>
          </div>
        </div>

        <!-- Audience Reviews -->
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-3">Audience Reviews</h3>
          <div class="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth">
            <div v-for="(review, index) in audienceReviews" :key="index"
              class="min-w-[220px] bg-red-50 border border-red-200 rounded-lg p-3 shadow-sm snap-start">
              <p class="text-sm font-semibold text-gray-800">{{ review.name }}</p>
              <div class="flex text-yellow-400 mb-1 mt-0.5 text-sm">
                <span v-for="i in 5" :key="i">{{ i <= review.rating ? '★' : '☆' }}</span>
              </div>
              <p class="text-sm text-gray-600 leading-snug">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const averageRating = 4.2
const expertRating = 4.8
const totalRatings = 325

const ratingsBreakdown = {
  5: 200,
  4: 80,
  3: 25,
  2: 15,
  1: 5
}

const getStarPercent = (star) => {
  return ((ratingsBreakdown[star] || 0) / totalRatings) * 100
}

const expertArcStroke = computed(() => `${(expertRating / 5) * 100}, 100`)
const audienceArcStroke = computed(() => `${(averageRating / 5) * 100}, 100`)

const expertReviews = [
  {
    name: 'Chef Arjun Mehta',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    comment: 'Flavourful, fresh ingredients with a fine-dine presentation. Top-notch! The fusion of spices was well-balanced and the plating was artful.'
  },
  {
    name: 'Chef Rekha Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    rating: 5,
    comment: 'Innovative menu and impressive execution. Definitely chef-recommended! Loved the presentation and the timely delivery.'
  },
  {
    name: 'Chef Vikram Das',
    avatar: 'https://randomuser.me/api/portraits/men/61.jpg',
    rating: 4,
    comment: 'A solid experience with minor room for improvement. Some dishes stood out, especially the grilled paneer with mint chutney.'
  },
  {
    name: 'Chef Anita Menon',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    rating: 5,
    comment: 'Brilliant textures and flavours. The use of herbs was refreshing, and the desserts were exceptionally crafted.'
  },
  {
    name: 'Chef Rohit Nair',
    avatar: 'https://randomuser.me/api/portraits/men/48.jpg',
    rating: 4,
    comment: 'Packaging was clean and ingredients were clearly fresh. The biryani was a standout with aromatic rice and perfectly cooked meat.'
  },
  {
    name: 'Chef Kavita Joshi',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    rating: 5,
    comment: 'A delightful culinary journey. The balance of modern presentation and traditional flavors is commendable. Will recommend to others.'
  }
]


const audienceReviews = [
  {
    name: 'Ravi Singh',
    rating: 5,
    comment: 'Food was amazing and the packaging was clean. Will order again! The spices were on point and the portion was generous.'
  },
  {
    name: 'Sneha Kapoor',
    rating: 4,
    comment: 'Great flavors but delivery was a bit late. The dessert made up for the wait though!'
  },
  {
    name: 'Anjali Verma',
    rating: 3,
    comment: 'Average taste. Quantity could be better. Felt the main dish lacked some punch.'
  },
  {
    name: 'Rahul Deshmukh',
    rating: 5,
    comment: 'Truly delicious. Worth every rupee! The butter chicken was the best I’ve had in months.'
  },
  {
    name: 'Priya Choudhary',
    rating: 4,
    comment: 'Loved the overall experience. Fresh veggies and warm packaging. Just wish the drinks were colder.'
  },
  {
    name: 'Karan Malhotra',
    rating: 2,
    comment: 'Didn’t meet expectations. The wrap was soggy and delivery took too long.'
  },
  {
    name: 'Meenal Arora',
    rating: 5,
    comment: 'Absolutely loved it! Quick delivery, hot food, and the taste was superb!'
  },
  {
    name: 'Devansh Sethi',
    rating: 4,
    comment: 'Food was good but I missed the cutlery and tissues. Taste was authentic though.'
  },
  {
    name: 'Neha Rawat',
    rating: 3,
    comment: 'Not bad, but not great either. The rice was undercooked but the curry saved the meal.'
  },
  {
    name: 'Yashvardhan Chauhan',
    rating: 5,
    comment: 'Exceptional food and flawless service. Got a sweet thank-you note too. Loved it!'
  }
]

</script>

<style scoped>
::-webkit-scrollbar {
  height: 5px;
}
::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 5px;
}
</style>
