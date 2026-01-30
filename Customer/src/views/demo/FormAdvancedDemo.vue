<script setup lang="ts">
import { ref } from 'vue';
import PlaygroundWrapper from '@/components/demo/PlaygroundWrapper.vue';
import BaseSwitch from '@/components/base/BaseSwitch.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';

const activeTab = ref<'switch' | 'select' | 'checkbox'>('switch');

// Switch
const switchValue = ref(false);
const switchLabel = ref('Enable Notifications');
const switchDisabled = ref(false);

// Select
const people = [
  { id: 1, label: 'Wade Cooper' },
  { id: 2, label: 'Arlene Mccoy' },
  { id: 3, label: 'Devon Webb' },
  { id: 4, label: 'Tom Cook', unavailable: true },
  { id: 5, label: 'Tanya Fox' },
  { id: 6, label: 'Hellen Schmidt' },
];
const selectedPerson = ref(people[0]);
const selectLabel = ref('Assignee');

// Checkbox
const checkboxValue = ref(false);
const checkboxLabel = ref('I agree to the terms');
const checkboxDisabled = ref(false);
</script>

<template>
  <PlaygroundWrapper
    :component-name="activeTab === 'switch' ? 'BaseSwitch' : (activeTab === 'select' ? 'BaseSelect' : 'BaseCheckbox')"
    :component-props="
        activeTab === 'switch' ? { modelValue: switchValue, label: switchLabel, disabled: switchDisabled } :
        (activeTab === 'select' ? { modelValue: selectedPerson, options: people, label: selectLabel } :
        { modelValue: checkboxValue, label: checkboxLabel, disabled: checkboxDisabled })"
  >
    <template #stage>
      <div class="w-full h-full flex flex-col items-center">
          <!-- Tabs -->
          <div class="mb-8 bg-white dark:bg-gray-800 p-1 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex text-sm z-10">
             <button
               @click="activeTab = 'switch'"
               class="px-3 py-1 rounded-md transition-colors"
               :class="activeTab === 'switch' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400'"
             >Switch</button>
             <button
               @click="activeTab = 'select'"
               class="px-3 py-1 rounded-md transition-colors"
               :class="activeTab === 'select' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400'"
             >Select</button>
             <button
               @click="activeTab = 'checkbox'"
               class="px-3 py-1 rounded-md transition-colors"
               :class="activeTab === 'checkbox' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400'"
             >Checkbox</button>
          </div>

          <div class="w-full max-w-xs flex flex-col items-center justify-center p-8 border rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm">
             <template v-if="activeTab === 'switch'">
                 <BaseSwitch v-model="switchValue" :label="switchLabel" :disabled="switchDisabled" />
                 <div class="mt-8 text-sm text-gray-500">
                     Value: {{ switchValue }}
                 </div>
             </template>

             <template v-else-if="activeTab === 'select'">
                 <div class="w-full h-48"> <!-- Height for dropdown -->
                     <BaseSelect v-model="selectedPerson" :options="people" :label="selectLabel" />
                     <div class="mt-32 text-sm text-gray-500 text-center">
                         Selected: {{ selectedPerson.label }}
                     </div>
                 </div>
             </template>

             <template v-else>
                 <BaseCheckbox v-model="checkboxValue" :label="checkboxLabel" :disabled="checkboxDisabled" />
                 <div class="mt-8 text-sm text-gray-500">
                     Value: {{ checkboxValue }}
                 </div>
             </template>
          </div>
      </div>
    </template>

    <template #controls>
       <div v-if="activeTab === 'switch'" class="space-y-4">
           <h3 class="font-semibold text-gray-900 dark:text-white pb-2 border-b dark:border-gray-700">Switch Controls</h3>
           <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label</label>
              <input v-model="switchLabel" type="text" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm text-gray-900 dark:text-white">
           </div>
           <BaseCheckbox v-model="switchDisabled" label="Disabled" />
       </div>

       <div v-else-if="activeTab === 'select'" class="space-y-4">
           <h3 class="font-semibold text-gray-900 dark:text-white pb-2 border-b dark:border-gray-700">Select Controls</h3>
           <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label</label>
              <input v-model="selectLabel" type="text" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm text-gray-900 dark:text-white">
           </div>
       </div>

       <div v-else class="space-y-4">
           <h3 class="font-semibold text-gray-900 dark:text-white pb-2 border-b dark:border-gray-700">Checkbox Controls</h3>
           <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label</label>
              <input v-model="checkboxLabel" type="text" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm text-gray-900 dark:text-white">
           </div>
           <BaseCheckbox v-model="checkboxDisabled" label="Disabled" />
       </div>
    </template>
  </PlaygroundWrapper>
</template>
