<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import BaseCard from '@/components/base/BaseCard.vue';
import { componentsList } from '@/data/components-list';
import { Icon } from '@iconify/vue';
import ThemeSwitcher from '@/components/nav/ThemeSwitcher.vue';

const themeStore = useThemeStore();
</script>

<template>
  <div class="min-h-screen bg-bg transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Top Bar: Theme Switcher -->
      <div class="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Vue Design System
        </h1>

        <!-- Use the reusable component -->
        <ThemeSwitcher />
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <BaseCard
            v-for="component in componentsList"
            :key="component.name"
            class="hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            @click="$router.push(component.path)"
        >
          <div class="flex items-center gap-4 mb-3">
             <div class="p-2 bg-primary/10 rounded-lg text-primary">
               <Icon :icon="component.icon" class="w-6 h-6" />
             </div>
             <h3 class="text-xl font-semibold group-hover:text-primary transition-colors">{{ component.name }}</h3>
          </div>
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed">
            {{ component.description }}
          </p>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
