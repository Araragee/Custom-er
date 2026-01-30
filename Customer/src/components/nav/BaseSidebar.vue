<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

interface MenuItem {
  label: string;
  to?: string;
  icon?: string;
  onClick?: () => void;
}

interface Props {
  menuItems?: MenuItem[];
  collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  menuItems: () => [],
  collapsed: false,
});

const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void;
}>();

const themeStore = useThemeStore();
const { isGlassMode } = storeToRefs(themeStore);

const toggleCollapse = () => {
  emit('update:collapsed', !props.collapsed);
};

const sidebarClass = computed(() => {
  const base = 'flex flex-col h-full border-r transition-all duration-300';
  const width = props.collapsed ? 'w-20' : 'w-64';

  const glass = isGlassMode.value
    ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-white/20 dark:border-gray-800'
    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800';

  return [base, width, glass].join(' ');
});
</script>

<template>
  <aside :class="sidebarClass">
    <!-- Header / Toggle -->
    <div class="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800" :class="{ 'justify-center': collapsed }">
        <span v-if="!collapsed" class="font-bold text-xl tracking-tight text-gray-900 dark:text-white truncate">
            Menu
        </span>
        <button
            @click="toggleCollapse"
            class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            :title="collapsed ? 'Expand' : 'Collapse'"
        >
            <Icon :icon="collapsed ? 'ph:caret-double-right' : 'ph:caret-double-left'" class="w-5 h-5" />
        </button>
    </div>

    <!-- Nav Items -->
    <div class="flex-1 overflow-y-auto py-4 space-y-1 px-3">
        <template v-for="item in menuItems" :key="item.label">
            <RouterLink
                v-if="item.to"
                :to="item.to"
                class="flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group"
                :class="[
                   collapsed ? 'justify-center' : '',
                   'text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary dark:hover:text-primary'
                ]"
                active-class="bg-primary/10 text-primary font-medium"
            >
                <Icon v-if="item.icon" :icon="item.icon" class="w-6 h-6 flex-shrink-0" />
                <span v-if="!collapsed" class="ml-3 truncate whitespace-nowrap origin-left transition-transform duration-200">
                    {{ item.label }}
                </span>

                <!-- Tooltip for collapsed state (simple title attr for now, could be custom tooltip) -->
                <span v-if="collapsed" class="sr-only">{{ item.label }}</span>
            </RouterLink>

            <button
                v-else
                @click="item.onClick"
                class="w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group"
                 :class="[
                   collapsed ? 'justify-center' : '',
                   'text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary dark:hover:text-primary'
                ]"
            >
                <Icon v-if="item.icon" :icon="item.icon" class="w-6 h-6 flex-shrink-0" />
                <span v-if="!collapsed" class="ml-3 truncate whitespace-nowrap">
                    {{ item.label }}
                </span>
            </button>
        </template>
    </div>

    <!-- Footer User Profile (Example) -->
    <div class="p-4 border-t border-gray-200 dark:border-gray-800">
        <div class="flex items-center" :class="{ 'justify-center': collapsed }">
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex-shrink-0"></div>
            <div v-if="!collapsed" class="ml-3 truncate">
                <p class="text-sm font-medium text-gray-900 dark:text-white">User Name</p>
                <p class="text-xs text-gray-500 truncate">user@example.com</p>
            </div>
        </div>
    </div>
  </aside>
</template>
