<script setup lang="ts">
import { ref } from 'vue';
import PlaygroundWrapper from '@/components/demo/PlaygroundWrapper.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import BaseButton from '@/components/base/BaseButton.vue';

const isOpen = ref(false);
const modalTitle = ref('Payment successful');
</script>

<template>
  <PlaygroundWrapper
    component-name="BaseModal"
    :component-props="{ isOpen: isOpen.toString(), title: modalTitle }"
  >
    <template #stage>
      <div class="flex flex-col items-center justify-center p-10">
         <BaseButton @click="isOpen = true">Open Modal</BaseButton>

         <BaseModal :is-open="isOpen" :title="modalTitle" @close="isOpen = false">
             <p>
                 Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.
             </p>
         </BaseModal>
      </div>
    </template>

    <template #controls>
       <div class="space-y-4">
           <h3 class="font-semibold text-gray-900 dark:text-white pb-2 border-b dark:border-gray-700">Modal Controls</h3>
           <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input v-model="modalTitle" type="text" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm text-gray-900 dark:text-white">
           </div>
       </div>
    </template>
  </PlaygroundWrapper>
</template>
