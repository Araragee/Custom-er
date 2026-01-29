<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

interface Props {
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
  icon?: string;
  glass?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  glass: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();

const themeStore = useThemeStore();
const { isGlassMode } = storeToRefs(themeStore);

const inputClass = computed(() => {
  const base = 'w-full px-4 py-2.5 rounded-lg border transition-all duration-200 outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500';

  const glassEffect = (props.glass || isGlassMode.value)
    ? 'bg-white/10 dark:bg-black/10 backdrop-blur-md border-white/20 focus:border-primary/50 focus:bg-white/20 dark:focus:bg-black/20'
    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary';

  const errorState = props.error
    ? '!border-red-500 focus:!border-red-500 focus:!ring-red-500'
    : '';

  const iconPadding = props.icon ? 'pl-10' : '';

  return [base, glassEffect, errorState, iconPadding].join(' ');
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
      {{ label }}
    </label>

    <div class="relative">
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Icon :icon="icon" class="w-5 h-5" />
      </div>

      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :class="inputClass"
        @input="handleInput"
      />
    </div>

    <p v-if="error" class="mt-1.5 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
      <Icon icon="ph:warning-circle" class="w-4 h-4" />
      {{ error }}
    </p>
  </div>
</template>
