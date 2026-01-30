<script setup lang="ts">
import { computed } from 'vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

interface Column {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
}

interface Props {
  columns: Column[];
  data: any[];
  striped?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  striped: false,
});

const themeStore = useThemeStore();
const { isGlassMode } = storeToRefs(themeStore);

const tableClass = computed(() => {
  return 'min-w-full divide-y divide-gray-200 dark:divide-gray-700';
});

const headerClass = computed(() => {
   return 'bg-gray-50 dark:bg-gray-800';
});

const rowClass = (index: number) => {
  const base = 'transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50';
  const stripe = props.striped && index % 2 === 0 ? 'bg-white dark:bg-gray-900' : (props.striped ? 'bg-gray-50/50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-900');

  // Glass mode overrides
  if (isGlassMode.value) {
      return 'hover:bg-white/10 dark:hover:bg-white/5 bg-transparent';
  }

  return [base, stripe].join(' ');
};

const cellClass = (align?: string) => {
  const alignment = align === 'center' ? 'text-center' : (align === 'right' ? 'text-right' : 'text-left');
  return `px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 ${alignment}`;
};

const headerCellClass = (align?: string) => {
  const alignment = align === 'center' ? 'text-center' : (align === 'right' ? 'text-right' : 'text-left');
  return `px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${alignment}`;
};
</script>

<template>
  <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700" :class="{ 'backdrop-blur-md bg-white/50 dark:bg-black/50 border-white/20': isGlassMode }">
    <table :class="tableClass">
      <thead :class="isGlassMode ? 'bg-transparent border-b border-white/10' : headerClass">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            scope="col"
            :class="headerCellClass(col.align)"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody :class="isGlassMode ? 'divide-y divide-white/10' : 'divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900'">
        <tr v-for="(row, index) in data" :key="index" :class="rowClass(index)">
          <td
            v-for="col in columns"
            :key="col.key"
            :class="cellClass(col.align)"
          >
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
