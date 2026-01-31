<script setup lang="ts">
import { ref } from 'vue';
import PlaygroundWrapper from '@/components/demo/PlaygroundWrapper.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();

const variant = ref<'primary' | 'secondary' | 'ghost'>('primary');
const rounded = ref('rounded-lg');
const opacity = ref(100);
const glass = ref(false);

const customPrimary = ref('#000000');

const setCustomColor = (event: Event) => {
    const target = event.target as HTMLInputElement;
    customPrimary.value = target.value;
    themeStore.setCustomColor('primary', target.value);
};

const surpriseMe = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    customPrimary.value = randomColor;
    themeStore.setCustomColor('primary', randomColor);
};
</script>

<template>
  <PlaygroundWrapper
    component-name="BaseButton"
    :component-props="{ variant, rounded, opacity, glass }"
  >
    <template #stage>
      <BaseButton
        :variant="variant"
        :rounded="rounded"
        :opacity="opacity"
        :glass="glass"
      >
        Click Me
      </BaseButton>
    </template>

    <template #controls>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Variant</label>
          <select v-model="variant" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm text-gray-900 dark:text-white">
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="ghost">Ghost</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rounded</label>
          <select v-model="rounded" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm text-gray-900 dark:text-white">
            <option value="rounded-none">None</option>
            <option value="rounded-md">Medium</option>
            <option value="rounded-lg">Large</option>
            <option value="rounded-full">Full</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Opacity: {{ opacity }}%</label>
          <input type="range" v-model.number="opacity" min="0" max="100" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
        </div>

        <div class="flex items-center justify-between">
          <span class="flex-grow flex flex-col">
            <span class="text-sm font-medium text-gray-900 dark:text-white">Glass Mode</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">Enable local glass effect</span>
          </span>
          <button
            type="button"
            :class="glass ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'"
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            role="switch"
            :aria-checked="glass"
            @click="glass = !glass"
          >
            <span
              aria-hidden="true"
              :class="glass ? 'translate-x-5' : 'translate-x-0'"
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            ></span>
          </button>
        </div>

        <hr class="border-gray-200 dark:border-gray-700" />

        <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Custom Primary Color</label>
            <div class="flex gap-2">
                <input type="color" :value="customPrimary" @input="setCustomColor" class="h-10 w-10 rounded cursor-pointer border-0 p-0" />
                <button
                    @click="surpriseMe"
                    class="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-md hover:opacity-90 transition-opacity shadow-sm"
                >
                    Surprise Me! 🎉
                </button>
            </div>
        </div>
      </div>
    </template>
  </PlaygroundWrapper>
</template>
