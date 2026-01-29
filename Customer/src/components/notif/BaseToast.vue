<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

interface Props {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message?: string;
  show?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  show: false,
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const themeStore = useThemeStore();
const { isGlassMode } = storeToRefs(themeStore);

const containerClass = computed(() => {
  const base = 'fixed top-4 right-4 z-50 w-full max-w-sm overflow-hidden rounded-lg shadow-lg border transition-all duration-300';

  const glassEffect = isGlassMode.value
    ? 'backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border-white/20'
    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700';

  return [base, glassEffect].join(' ');
});

const iconConfig = computed(() => {
  switch (props.type) {
    case 'success':
      return { icon: 'ph:check-circle-fill', color: 'text-green-500' };
    case 'error':
      return { icon: 'ph:x-circle-fill', color: 'text-red-500' };
    case 'warning':
      return { icon: 'ph:warning-fill', color: 'text-amber-500' };
    default:
      return { icon: 'ph:info-fill', color: 'text-blue-500' };
  }
});
</script>

<template>
  <Transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="show" :class="containerClass">
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <Icon :icon="iconConfig.icon" :class="['w-6 h-6', iconConfig.color]" />
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p v-if="title" class="text-sm font-medium text-gray-900 dark:text-white">
              {{ title }}
            </p>
            <p v-if="message" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {{ message }}
            </p>
          </div>
          <div class="ml-4 flex flex-shrink-0">
            <button
              type="button"
              @click="emit('close')"
              class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span class="sr-only">Close</span>
              <Icon icon="ph:x" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
