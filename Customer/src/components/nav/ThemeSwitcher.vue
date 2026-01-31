<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore();
const { currentTheme, isGlassMode, isDark } = storeToRefs(themeStore);
const themes = ['Ocean', 'Sunset', 'Dawn', 'Midnight', 'Simple'];
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="flex bg-white dark:bg-gray-800 p-1 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
      <button
        v-for="theme in themes"
        :key="theme"
        @click="themeStore.setTheme(theme)"
        class="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200"
        :class="currentTheme === theme ? 'bg-primary text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-primary'"
      >
        {{ theme }}
      </button>
    </div>

    <button
      @click="themeStore.toggleDarkMode()"
      class="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200"
      title="Toggle Dark Mode"
    >
      <span v-if="isDark">🌙</span>
      <span v-else>☀️</span>
    </button>

    <button
      @click="themeStore.toggleGlassMode(!isGlassMode)"
      class="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200"
      title="Toggle Global Glass Mode"
    >
      <span v-if="isGlassMode">✨</span>
      <span v-else>🌑</span>
    </button>
  </div>
</template>
