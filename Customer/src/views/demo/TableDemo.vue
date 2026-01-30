<script setup lang="ts">
import { ref } from 'vue';
import PlaygroundWrapper from '@/components/demo/PlaygroundWrapper.vue';
import BaseTable from '@/components/base/BaseTable.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';

const striped = ref(true);

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'title', label: 'Title' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
];

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member', status: 'Active' },
  { name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin', status: 'Inactive' },
  { name: 'Tom Cook', title: 'Director of Product', email: 'tom.cook@example.com', role: 'Member', status: 'Active' },
  { name: 'Whitney Francis', title: 'Copywriter', email: 'whitney.francis@example.com', role: 'Admin', status: 'Active' },
  { name: 'Leonard Krasner', title: 'Senior Designer', email: 'leonard.krasner@example.com', role: 'Owner', status: 'Inactive' },
  { name: 'Floyd Miles', title: 'Principal Designer', email: 'floyd.miles@example.com', role: 'Member', status: 'Active' },
];
</script>

<template>
  <PlaygroundWrapper
    component-name="BaseTable"
    :component-props="{ striped, columns: '[]', data: '[]' }"
  >
    <template #stage>
      <div class="w-full p-4 overflow-hidden">
         <BaseTable :columns="columns" :data="people" :striped="striped">
             <template #cell-status="{ value }">
                 <BaseBadge
                    :label="value"
                    :type="value === 'Active' ? 'success' : 'neutral'"
                    size="sm"
                    rounded="rounded-full"
                 />
             </template>
             <template #cell-name="{ value }">
                 <span class="font-medium text-gray-900 dark:text-white">{{ value }}</span>
             </template>
         </BaseTable>
      </div>
    </template>

    <template #controls>
       <div class="space-y-4">
           <h3 class="font-semibold text-gray-900 dark:text-white pb-2 border-b dark:border-gray-700">Table Controls</h3>
           <BaseCheckbox v-model="striped" label="Striped Rows" />
       </div>
    </template>
  </PlaygroundWrapper>
</template>
