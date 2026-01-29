<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  padding?: string;
  rounded?: string;
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'p-6',
  rounded: 'rounded-xl',
});

const cardClass = computed(() => {
  return [
    'bg-surface shadow-md border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-100',
    props.padding,
    props.rounded
  ].join(' ');
});
</script>

<template>
  <div :class="cardClass">
    <slot></slot>
  </div>
</template>
