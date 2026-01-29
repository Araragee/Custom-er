<script setup lang="ts">
import { ref } from 'vue';
import PlaygroundWrapper from '@/components/demo/PlaygroundWrapper.vue';
import BaseInput from '@/components/base/BaseInput.vue';

const textValue = ref('');
const label = ref('Email Address');
const placeholder = ref('you@example.com');
const type = ref('text');
const error = ref('');
const icon = ref('ph:envelope-simple');
const glass = ref(false);
</script>

<template>
  <PlaygroundWrapper
    component-name="BaseInput"
    :component-props="{ modelValue: textValue, label, placeholder, type, error, icon, glass }"
  >
    <template #stage>
      <div class="w-full max-w-sm">
        <BaseInput
          v-model="textValue"
          :label="label"
          :placeholder="placeholder"
          :type="type"
          :error="error"
          :icon="icon"
          :glass="glass"
        />
        <div class="mt-4 text-sm text-gray-500">
          Model Value: <span class="font-mono text-gray-900 dark:text-gray-100">{{ textValue }}</span>
        </div>
      </div>
    </template>

    <template #controls>
      <div class="space-y-4">
        <BaseInput label="Label Text" v-model="label" />
        <BaseInput label="Placeholder" v-model="placeholder" />

        <div>
           <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Input Type</label>
           <select v-model="type" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm">
             <option value="text">Text</option>
             <option value="password">Password</option>
             <option value="email">Email</option>
             <option value="number">Number</option>
           </select>
        </div>

        <BaseInput label="Error Message" v-model="error" placeholder="Leave empty for no error" />

        <BaseInput label="Icon (Iconify ID)" v-model="icon" placeholder="e.g. ph:user" />

        <div class="flex items-center justify-between pt-2">
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
      </div>
    </template>
  </PlaygroundWrapper>
</template>
