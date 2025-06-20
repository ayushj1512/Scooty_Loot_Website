import type { animate, inView, scroll, stagger } from 'motion'

type Motion = {
  animate: typeof animate
  inView: typeof inView
  scroll: typeof scroll
  stagger: typeof stagger
}

declare module '#app' {
  interface NuxtApp {
    $motion: Motion
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $motion: Motion
  }
}
