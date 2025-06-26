<template>
  <NuxtLayout>
    <Head>
      <link rel="icon" type="image/png" href="/icons/scooter.png" />
    </Head>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// 🛒 Import your store
import { useSssConfig } from '~/stores/useSssConfig'

const sssStore = useSssConfig()

// 🚀 Fetch config once when app starts
onMounted(() => {
  if (!sssStore.data) {
    sssStore.fetchConfig()
  }
})
</script>
