<script setup lang="ts">
import { ref } from 'vue';
import BaseNavbar from '@/components/nav/BaseNavbar.vue';
import BaseSidebar from '@/components/nav/BaseSidebar.vue';

interface MenuItem {
  label: string;
  to?: string;
  icon?: string;
}

interface Props {
  menuItems: MenuItem[];
  logoText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  menuItems: () => [],
  logoText: 'Dashboard',
});

const isSidebarCollapsed = ref(false);
</script>

<template>
  <div class="flex h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
    <!-- Sidebar (Desktop) -->
    <div class="hidden md:block h-full shadow-xl z-20">
      <BaseSidebar
        :menu-items="menuItems"
        v-model:collapsed="isSidebarCollapsed"
      />
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col h-full overflow-hidden">
      <!-- Navbar -->
      <BaseNavbar
        :logo-text="logoText"
        :menu-items="[]"
        :sticky="false"
        class="shadow-sm z-10"
      >
         <!-- Maybe add breadcrumbs or user menu here via slots in future -->
      </BaseNavbar>

      <!-- Content Scroll Area -->
      <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
         <slot></slot>
      </main>
    </div>
  </div>
</template>
