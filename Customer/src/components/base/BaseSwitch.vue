<script setup lang="ts">
import { computed } from 'vue';
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';

interface Props {
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const toggleClass = computed(() => {
  return props.modelValue ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700';
});
</script>

<template>
  <SwitchGroup as="div" class="flex items-center">
    <Switch
      :modelValue="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
      :disabled="disabled"
      :class="[
        toggleClass,
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      ]"
    >
      <span
        aria-hidden="true"
        :class="[
          modelValue ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        ]"
      />
    </Switch>
    <SwitchLabel v-if="label" class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer">
      {{ label }}
    </SwitchLabel>
  </SwitchGroup>
</template>
