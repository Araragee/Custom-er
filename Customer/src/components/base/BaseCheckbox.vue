<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

interface Props {
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  indeterminate: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
};
</script>

<template>
  <label class="inline-flex items-center cursor-pointer group">
    <div class="relative flex items-center">
      <input
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        @change="handleChange"
        class="peer sr-only"
      />
      <div
        class="w-5 h-5 border rounded transition-all duration-200 flex items-center justify-center
        peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary
        border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800
        peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white
        peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
        group-hover:border-primary dark:group-hover:border-primary/50"
      >
        <Icon v-if="indeterminate" icon="ph:minus-bold" class="w-3.5 h-3.5" />
        <Icon v-else-if="modelValue" icon="ph:check-bold" class="w-3.5 h-3.5" />
      </div>
    </div>
    <span
        v-if="label"
        class="ml-2 text-sm text-gray-700 dark:text-gray-300 select-none group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
        :class="{ 'opacity-50 cursor-not-allowed': disabled }"
    >
      {{ label }}
    </span>
  </label>
</template>
