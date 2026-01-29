<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import { useCodeGenerator } from '@/composables/useCodeGenerator';
import IconPhCopy from '~icons/ph/copy';
import IconPhCheck from '~icons/ph/check';

// We need a way to pass the current component state from the parent (Slot content)
// to this wrapper to generate the code.
// Ideally, the parent component (ButtonDemo) would pass the 'code' string
// or the props object to PlaygroundWrapper.
// The plan didn't specify props for PlaygroundWrapper for this,
// but it says "UI: Add a 'Copy Source' button in PlaygroundWrapper.vue using useClipboard."
// and "Output: Returns a formatted string...".

// To make this work cleanly, I'll add a prop `componentName` and `componentProps` to PlaygroundWrapper.
// OR, since the slot content is arbitrary, maybe the parent should generate the code and pass it?
// "Phase 3.2 ... UI: Add a "Copy Source" button in PlaygroundWrapper.vue"

interface Props {
  componentName?: string;
  componentProps?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  componentName: 'Component',
  componentProps: () => ({}),
});

const { copy, copied } = useClipboard();
const { generateCode } = useCodeGenerator();

const handleCopy = () => {
  const code = generateCode(props.componentName, props.componentProps);
  copy(code);
};
</script>

<template>
  <div class="flex flex-col lg:flex-row h-[calc(100vh-4rem)] border-t border-gray-200 dark:border-gray-800">
    <!-- Stage (Preview) -->
    <div class="w-full lg:w-2/3 bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8 relative overflow-hidden" id="stage-area">
      <div class="absolute inset-0 grid grid-cols-[40px_40px] opacity-[0.05] pointer-events-none"
           style="background-image: linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px); background-size: 40px 40px;">
      </div>

      <div class="relative z-10">
        <slot name="stage"></slot>
      </div>
    </div>

    <!-- Controls (Sidebar) -->
    <div class="w-full lg:w-1/3 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Controls</h2>

        <button
          @click="handleCopy"
          class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-md transition-colors"
        >
          <IconPhCheck v-if="copied" class="w-4 h-4" />
          <IconPhCopy v-else class="w-4 h-4" />
          {{ copied ? 'Copied!' : 'Copy Source' }}
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <slot name="controls"></slot>
      </div>
    </div>
  </div>
</template>
