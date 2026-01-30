<script setup lang="ts">
import { computed } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, ListboxLabel } from '@headlessui/vue';
import { Icon } from '@iconify/vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

interface Option {
  id: string | number;
  label: string;
  unavailable?: boolean;
}

interface Props {
  modelValue: Option;
  options: Option[];
  label?: string;
  placeholder?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Option): void;
}>();

const themeStore = useThemeStore();
const { isGlassMode } = storeToRefs(themeStore);

const buttonClass = computed(() => {
  const base = 'relative w-full cursor-pointer rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:text-sm transition-all duration-200 border';

  const glass = isGlassMode.value
    ? 'bg-white/10 dark:bg-black/10 backdrop-blur-md border-white/20 text-gray-900 dark:text-white'
    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 shadow-sm';

  return [base, glass].join(' ');
});

const optionsClass = computed(() => {
   const base = 'absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50';

   const glass = isGlassMode.value
    ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20'
    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700';

   return [base, glass].join(' ');
});
</script>

<template>
  <Listbox :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <div class="relative mt-1">
      <ListboxLabel v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {{ label }}
      </ListboxLabel>

      <ListboxButton :class="buttonClass">
        <span class="block truncate" v-if="modelValue">{{ modelValue.label }}</span>
        <span class="block truncate text-gray-400" v-else>{{ placeholder || 'Select option' }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <Icon icon="ph:caret-up-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions :class="optionsClass">
          <ListboxOption
            v-for="option in options"
            :key="option.id"
            :value="option"
            :disabled="option.unavailable"
            as="template"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-primary/10 text-primary' : 'text-gray-900 dark:text-gray-100',
                'relative cursor-default select-none py-2 pl-10 pr-4 transition-colors duration-150'
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                  option.unavailable ? 'opacity-50' : ''
                ]"
                >{{ option.label }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary"
              >
                <Icon icon="ph:check" class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
