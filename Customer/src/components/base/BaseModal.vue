<script setup lang="ts">
import { computed } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
import { Icon } from '@iconify/vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

interface Props {
  isOpen: boolean;
  title?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();

const themeStore = useThemeStore();
const { isGlassMode } = storeToRefs(themeStore);

const panelClass = computed(() => {
  const base = 'w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all';

  const glass = isGlassMode.value
    ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20'
    : 'bg-white dark:bg-gray-800';

  return [base, glass].join(' ');
});
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="emit('close')" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel :class="panelClass">
              <div class="flex justify-between items-center mb-4">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    {{ title }}
                  </DialogTitle>
                  <button @click="emit('close')" class="text-gray-400 hover:text-gray-500 focus:outline-none">
                      <Icon icon="ph:x" class="w-5 h-5" />
                  </button>
              </div>

              <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <slot></slot>
              </div>

              <div class="mt-6 flex justify-end gap-3">
                 <slot name="footer">
                     <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      @click="emit('close')"
                    >
                      Got it, thanks!
                    </button>
                 </slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
