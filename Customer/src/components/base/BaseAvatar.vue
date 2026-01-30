<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';

interface Props {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'busy' | 'away' | null;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  shape: 'circle',
  alt: 'Avatar',
  status: null,
});

const imageError = ref(false);

const sizeClass = computed(() => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-24 h-24 text-3xl',
  };
  return sizes[props.size];
});

const shapeClass = computed(() => {
  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-lg',
  };
  return shapes[props.shape];
});

const statusColor = computed(() => {
  const colors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-amber-500',
  };
  return props.status ? colors[props.status] : '';
});

const statusSize = computed(() => {
    // Proportional status dot size
    switch(props.size) {
        case 'xs': return 'w-1.5 h-1.5';
        case 'sm': return 'w-2 h-2';
        case 'md': return 'w-2.5 h-2.5';
        case 'lg': return 'w-3 h-3';
        case 'xl': return 'w-4 h-4';
        case '2xl': return 'w-5 h-5';
        default: return 'w-2.5 h-2.5';
    }
});

const handleImageError = () => {
  imageError.value = true;
};
</script>

<template>
  <div class="relative inline-block">
    <div
      :class="['flex items-center justify-center overflow-hidden bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 ring-2 ring-white dark:ring-gray-900', sizeClass, shapeClass]"
    >
      <img
        v-if="src && !imageError"
        :src="src"
        :alt="alt"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
      <span v-else-if="initials" class="font-medium uppercase">{{ initials.substring(0, 2) }}</span>
      <Icon v-else icon="ph:user" class="w-3/5 h-3/5" />
    </div>

    <span
      v-if="status"
      :class="['absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-gray-900', statusColor, statusSize]"
    ></span>
  </div>
</template>
