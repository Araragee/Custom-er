<script setup lang="ts">
import { computed } from 'vue'

export interface DynamicBackgroundProps {
  theme?: 'ocean' | 'sunset' | 'forest' | 'midnight' | 'custom'
  animated?: boolean
  speed?: 'slow' | 'normal' | 'fast'
  intensity?: 'subtle' | 'normal' | 'vibrant'
  showParticles?: boolean
  customColors?: string[]
}

const props = withDefaults(defineProps<DynamicBackgroundProps>(), {
  theme: 'midnight',
  animated: false,
  speed: 'normal',
  intensity: 'subtle',
  showParticles: true,
})

const themeColors = computed(() => {
  const themes = {
    ocean: {
      light: ['bg-cyan-300', 'bg-teal-200', 'bg-blue-200', 'bg-orange-200', 'bg-rose-200'],
      dark: [
        'dark:bg-cyan-800',
        'dark:bg-teal-800',
        'dark:bg-blue-800',
        'dark:bg-orange-900',
        'dark:bg-red-900',
      ],
    },
    sunset: {
      light: ['bg-orange-300', 'bg-pink-300', 'bg-purple-200', 'bg-yellow-200', 'bg-red-200'],
      dark: [
        'dark:bg-orange-800',
        'dark:bg-pink-800',
        'dark:bg-purple-800',
        'dark:bg-yellow-800',
        'dark:bg-red-800',
      ],
    },
    forest: {
      light: ['bg-green-300', 'bg-emerald-200', 'bg-lime-200', 'bg-teal-200', 'bg-cyan-200'],
      dark: [
        'dark:bg-green-800',
        'dark:bg-emerald-800',
        'dark:bg-lime-800',
        'dark:bg-teal-800',
        'dark:bg-cyan-800',
      ],
    },
    midnight: {
      light: ['bg-indigo-300', 'bg-purple-300', 'bg-blue-300', 'bg-violet-200', 'bg-slate-200'],
      dark: [
        'dark:bg-indigo-900',
        'dark:bg-purple-900',
        'dark:bg-blue-900',
        'dark:bg-violet-900',
        'dark:bg-slate-900',
      ],
    },
    custom: {
      light: props.customColors || ['bg-gray-300'],
      dark: ['dark:bg-gray-800'],
    },
  }

  return themes[props.theme]
})

const opacityClass = computed(() => {
  const opacityMap = {
    subtle: 'opacity-20 dark:opacity-10',
    normal: 'opacity-30 dark:opacity-15',
    vibrant: 'opacity-40 dark:opacity-20',
  }
  return opacityMap[props.intensity]
})

const animationClass = computed(() => {
  if (!props.animated) return ''

  const speedMap = {
    slow: 'animate-pulse-slow',
    normal: 'animate-pulse',
    fast: 'animate-pulse-fast',
  }
  return speedMap[props.speed]
})
</script>

<template>
  <div class="scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
    <!-- Top background blobs -->
    <div class="relative w-full blur-2xl h-full z-[-9999]" :class="[opacityClass, animationClass]">
      <div
        class="absolute mix-blend-multiply dark:mix-blend-lighten opacity-80 rounded-full top-24 left-24 w-2/5 h-64"
        :class="[themeColors.light[0], themeColors.dark[0]]"
      ></div>
      <div
        class="absolute mix-blend-multiply dark:mix-blend-lighten opacity-70 rounded-full mx-auto top-32 inset-x-0 w-3/5 h-96"
        :class="[themeColors.light[1], themeColors.dark[1]]"
      ></div>
      <div
        class="absolute mix-blend-multiply dark:mix-blend-lighten opacity-60 rounded-full right-0 w-3/5 h-96"
        :class="[themeColors.light[2], themeColors.dark[2]]"
      ></div>
    </div>

    <!-- Content slot -->
    <slot></slot>

    <!-- Bottom background blobs -->
    <div class="relative w-full blur-2xl h-full z-[-9999]" :class="[opacityClass, animationClass]">
      <div
        class="absolute mix-blend-multiply dark:mix-blend-lighten rounded-full opacity-50 right-0 bottom-0 w-3/5 h-96"
        :class="[themeColors.light[3], themeColors.dark[3]]"
      ></div>
      <div
        class="h-[500px] absolute mix-blend-multiply dark:mix-blend-lighten rounded-full opacity-50 left-0 bottom-0 w-3/5"
        :class="[themeColors.light[4], themeColors.dark[4]]"
      ></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes pulse-fast {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-pulse-fast {
  animation: pulse-fast 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
