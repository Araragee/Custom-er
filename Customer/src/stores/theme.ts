import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref('Ocean');
  const isGlassMode = ref(false);
  const isDark = ref(false);

  interface Palette {
    primary: string;
    secondary: string;
    bg: string;
    surface: string;
    isDark?: boolean;
  }

  const palettes: Record<string, Palette> = {
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
      surface: '30 41 59',
      isDark: true
    },
    Simple: {
      primary: '0 0 0',
      secondary: '85 85 85',
      bg: '255 255 255',
      surface: '245 245 245'
    }
  };

  const updateRootVariables = (palette: Palette) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', palette.primary);
    root.style.setProperty('--color-secondary', palette.secondary);
    root.style.setProperty('--color-bg', palette.bg);
    root.style.setProperty('--color-surface', palette.surface);
  };

  const updateDarkModeClass = () => {
      const root = document.documentElement;
      if (isDark.value) {
          root.classList.add('dark');
      } else {
          root.classList.remove('dark');
      }
  };

  const setTheme = (name: string) => {
    if (!palettes[name]) return;
    currentTheme.value = name;

    const palette = palettes[name];
    updateRootVariables(palette);

    // If the theme suggests dark mode, enable it, but don't force disable if user manually toggled?
    // For simplicity, let the theme preset dictate the default mode, but user can override.
    // Actually, "Midnight" IS a dark theme. Switching to it should probably enable dark mode.
    // Switching to "Ocean" should probably disable it (or reset to preference).
    // Let's stick to: Theme sets the mode preference initially.
    if (palette.isDark !== undefined) {
        isDark.value = palette.isDark;
        updateDarkModeClass();
    }
  };

  const toggleGlassMode = (value: boolean) => {
    isGlassMode.value = value;
  };

  const toggleDarkMode = (value?: boolean) => {
      isDark.value = value ?? !isDark.value;
      updateDarkModeClass();
  };

  const setCustomColor = (type: 'primary' | 'secondary', color: string) => {
      // Color comes in hex or rgb?
      // Tailwind config expects 'rgb(var(--color-primary) / ...)'
      // If input is hex, we need to convert to 'R G B' string.

      const hexToRgb = (hex: string) => {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : null;
      };

      const rgb = hexToRgb(color);
      if (rgb) {
          document.documentElement.style.setProperty(`--color-${type}`, rgb);
      }
  };

  return {
    currentTheme,
    isGlassMode,
    isDark,
    setTheme,
    toggleGlassMode,
    toggleDarkMode,
    setCustomColor
  };
});
