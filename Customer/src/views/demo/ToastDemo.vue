<script setup lang="ts">
import { ref } from 'vue';
import PlaygroundWrapper from '@/components/demo/PlaygroundWrapper.vue';
import BaseToast from '@/components/notif/BaseToast.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';

const showToast = ref(false);
const title = ref('Notification Title');
const message = ref('This is a descriptive message for the user.');
const type = ref<'success' | 'error' | 'warning' | 'info'>('success');

const triggerToast = () => {
  showToast.value = true;
  // Auto hide after 3 seconds
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};
</script>

<template>
  <PlaygroundWrapper
    component-name="BaseToast"
    :component-props="{ title, message, type, show: 'true' }"
  >
    <template #stage>
      <div class="flex flex-col items-center gap-4">
        <BaseButton @click="triggerToast">
          Trigger Notification
        </BaseButton>
        <p class="text-sm text-gray-500">Click the button to show the toast.</p>

        <!-- The Toast Component (Usually placed globally, but here for demo) -->
        <BaseToast
          :show="showToast"
          :title="title"
          :message="message"
          :type="type"
          @close="showToast = false"
        />
      </div>
    </template>

    <template #controls>
      <div class="space-y-4">
        <BaseInput label="Title" v-model="title" />
        <BaseInput label="Message" v-model="message" />

        <div>
           <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Type</label>
           <select v-model="type" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm">
             <option value="success">Success</option>
             <option value="error">Error</option>
             <option value="warning">Warning</option>
             <option value="info">Info</option>
           </select>
        </div>
      </div>
    </template>
  </PlaygroundWrapper>
</template>
