<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

interface Props {
  label?: string;
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  variant?: 'solid' | 'outline' | 'soft';
  rounded?: string;
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  variant: 'soft',
  rounded: 'rounded-full',
  size: 'md',
});

const badgeClass = computed(() => {
  const base = 'inline-flex items-center font-medium transition-colors duration-200';

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-0.5 text-sm gap-1.5',
    lg: 'px-3 py-1 text-base gap-2',
  };

  const colors = {
    primary: {
      solid: 'bg-primary text-white border border-transparent',
      outline: 'bg-transparent text-primary border border-primary',
      soft: 'bg-primary/10 text-primary border border-transparent',
    },
    success: {
      solid: 'bg-green-500 text-white border border-transparent',
      outline: 'bg-transparent text-green-600 dark:text-green-400 border border-green-500',
      soft: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-transparent',
    },
    warning: {
      solid: 'bg-amber-500 text-white border border-transparent',
      outline: 'bg-transparent text-amber-600 dark:text-amber-400 border border-amber-500',
      soft: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border border-transparent',
    },
    error: {
      solid: 'bg-red-500 text-white border border-transparent',
      outline: 'bg-transparent text-red-600 dark:text-red-400 border border-red-500',
      soft: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-transparent',
    },
    info: {
      solid: 'bg-blue-500 text-white border border-transparent',
      outline: 'bg-transparent text-blue-600 dark:text-blue-400 border border-blue-500',
      soft: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-transparent',
    },
    neutral: {
      solid: 'bg-gray-500 text-white border border-transparent',
      outline: 'bg-transparent text-gray-600 dark:text-gray-400 border border-gray-500',
      soft: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent',
    },
  };

  return [base, sizes[props.size], props.rounded, colors[props.type][props.variant]].join(' ');
});
</script>

<template>
  <span :class="badgeClass">
    <Icon v-if="icon" :icon="icon" />
    <slot>{{ label }}</slot>
  </span>
</template>
