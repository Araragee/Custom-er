import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref('Ocean');
  const isGlassMode = ref(false);

  const palettes: Record<string, { primary: string; secondary: string; bg: string; surface: string }> = {
    Ocean: {
      primary: '0 153 153',
      secondary: '22 78 99',
      bg: '240 249 255',
      surface: '255 255 255'
    },
    Sunset: {
      primary: '219 141 49',
      secondary: '124 58 237',
      bg: '255 247 237',
      surface: '255 255 255'
    },
    Dawn: {
      primary: '236 72 153',
      secondary: '100 116 139',
      bg: '248 250 252',
      surface: '255 255 255'
    },
    Midnight: {
      primary: '129 140 248',
      secondary: '49 46 129',
      bg: '15 23 42',
      surface: '30 41 59'
    },
    Simple: {
      primary: '0 0 0',
      secondary: '85 85 85',
      bg: '255 255 255',
      surface: '245 245 245'
    }
  };

  const setTheme = (name: string) => {
    if (!palettes[name]) return;
    currentTheme.value = name;

    const palette = palettes[name];
    const root = document.documentElement;

    root.style.setProperty('--color-primary', palette.primary);
    root.style.setProperty('--color-secondary', palette.secondary);
    root.style.setProperty('--color-bg', palette.bg);
    root.style.setProperty('--color-surface', palette.surface);
  };

  const toggleGlassMode = (value: boolean) => {
    isGlassMode.value = value;
  };

  return {
    currentTheme,
    isGlassMode,
    setTheme,
    toggleGlassMode
  };
});
