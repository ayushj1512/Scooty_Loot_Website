import { animate, inView, scroll, stagger } from 'motion'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('motion', {
    animate,
    inView,
    scroll,
    stagger
  })
})
