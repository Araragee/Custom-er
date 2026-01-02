<script lang="ts" setup>
import { type PropType, computed } from 'vue'

const props = defineProps({
  color: {
    type: String as PropType<'blue' | 'teal' | 'red' | 'yellow' | 'purple' | 'pink' | 'indigo'>,
    default: 'teal',
  },
  opacity: {
    type: String as PropType<'10' | '20' | '30' | '40' | '50' | '60' | '70' | '80' | '90' | '100'>,
    default: '80',
  },
  firstBlock: {
    type: String as PropType<'cyan' | 'teal' | 'blue' | 'orange' | 'rose'>,
    default: 'cyan',
  },
  secondBlock: {
    type: String as PropType<'orange' | 'rose'>,
    default: 'orange',
  },
  thirdBlock: {
    type: String as PropType<'rose'>,
    default: 'rose',
  },
})

const bgColorClass = computed(() => {
  return {
    blue: 'bg-blue-500',
    teal: 'bg-teal-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    indigo: 'bg-indigo-500',
  }[props.color]
})
</script>

<template>
  <div class="scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
    <div class="relative w-full blur-2xl opacity-30 dark:opacity-15 h-full z-[-9999]">
      <div
        class="absolute mix-blend-multiply dark:mix-blend-lighten opacity-80 rounded-full top-24 left-24 w-2/5 h-64 bg-cyan-300 default:bg-cyan-800"
      ></div>
      <div
        class="absolute mix-blend-multiply dark:mix-blend-lighten opacity-70 rounded-full mx-auto top-32 inset-x-0 w-3/5 h-96 bg-teal-200 dark:bg-teal-800"
      ></div>
      <div
        class="absolute mix-blend-multiply dark:mix-blend-lighten opacity-60 rounded-full right-0 w-3/5 h-96 bg-blue-200 dark:bg-blue-800"
      ></div>
    </div>
    <slot></slot>
    <div class="relative w-full blur-2xl opacity-30 dark:opacity-15 h-full z-[-9999]">
      <div
        class="absolute mix-blend-multiply dark:mix-blend-lighten rounded-full opacity-50 right-0 bottom-0 w-3/5 h-96 bg-orange-200 dark:bg-orange-900"
      ></div>
      <div
        class="h-[500px] absolute mix-blend-multiply dark:mix-blend-lighten rounded-full opacity-50 left-0 bottom-0 w-3/5 bg-rose-200 dark:bg-red-900"
      ></div>
    </div>
  </div>
</template>
