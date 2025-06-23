<script setup lang="ts">
// import QuickNeeds from '~/components/QuickNeeds.vue';
import HeroCarousel from '~/components/HeroCarousel.vue';
import Bestsellers from '../components/Bestsellers.vue';
// import BreakfastGrid from '../components/BreakfastGrid.vue';
import FeaturedRestaurants from '../components/FeaturedRestaurants.vue';
import WhatToEat from '../components/WhatToEat.vue';
import CategoryGrid from '~/components/CategoryGrid.vue';

</script>

<template>
  <section class="p-0">
    <HeroCarousel />
    <CategoryGrid />
    <!-- <WhatToEat /> -->
    <!-- <BreakfastGrid />
    <QuickNeeds /> -->
    <FeaturedRestaurants />
    <Bestsellers />

  </section>
</template>
