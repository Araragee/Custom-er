<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import BaseCard from '@/components/base/BaseCard.vue';
import { componentsList } from '@/data/components-list';

const themeStore = useThemeStore();
const { currentTheme, isGlassMode } = storeToRefs(themeStore);
const themes = ['Ocean', 'Sunset', 'Dawn', 'Midnight', 'Simple'];
</script>

<template>
  <div class="min-h-screen bg-bg transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Top Bar: Theme Switcher -->
      <div class="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Vue Design System
        </h1>

        <div class="flex items-center gap-4">
          <div class="flex bg-white dark:bg-gray-800 p-1 rounded-full shadow-sm">
            <button
              v-for="theme in themes"
              :key="theme"
              @click="themeStore.setTheme(theme)"
              class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
              :class="currentTheme === theme ? 'bg-primary text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-primary'"
            >
              {{ theme }}
            </button>
          </div>

          <button
            @click="themeStore.toggleGlassMode(!isGlassMode)"
            class="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            title="Toggle Global Glass Mode"
          >
            <span v-if="isGlassMode">✨</span>
            <span v-else>🌑</span>
          </button>
        </div>
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
               <!-- Icon placeholder until we install unplugin-icons -->
               <span>📦</span>
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
