<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import ThemeSwitcher from './ThemeSwitcher.vue';

interface MenuItem {
  label: string;
  to?: string;
  href?: string;
  icon?: string;
}

interface Props {
  menuItems?: MenuItem[];
  logoText?: string;
  sticky?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  menuItems: () => [],
  logoText: 'Brand',
  sticky: true,
});

const isMobileMenuOpen = ref(false);
const themeStore = useThemeStore();
const { isGlassMode } = storeToRefs(themeStore);

const navbarClass = computed(() => {
  const base = 'w-full z-40 transition-all duration-300 border-b';
  const position = props.sticky ? 'sticky top-0' : 'relative';

  const glass = isGlassMode.value
    ? 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-white/20 dark:border-gray-800'
    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800';

  return [base, position, glass].join(' ');
});

const mobileMenuClass = computed(() => {
    return isGlassMode.value
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-white/20'
        : 'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800';
});
</script>

<template>
  <nav :class="navbarClass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo & Desktop Nav -->
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center cursor-pointer" @click="$router.push('/')">
            <slot name="logo">
              <span class="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {{ logoText }}
              </span>
            </slot>
          </div>

          <div class="hidden md:ml-10 md:flex md:space-x-8">
            <template v-for="item in menuItems" :key="item.label">
              <RouterLink
                v-if="item.to"
                :to="item.to"
                class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="text-primary font-semibold bg-primary/5"
              >
                <div class="flex items-center gap-2">
                    <Icon v-if="item.icon" :icon="item.icon" />
                    {{ item.label }}
                </div>
              </RouterLink>
              <a
                v-else-if="item.href"
                :href="item.href"
                class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                 <div class="flex items-center gap-2">
                    <Icon v-if="item.icon" :icon="item.icon" />
                    {{ item.label }}
                </div>
              </a>
            </template>
          </div>
        </div>

        <!-- Right Side: Theme Switcher & Mobile Menu Button -->
        <div class="flex items-center gap-4">
          <div class="hidden md:block">
            <ThemeSwitcher />
          </div>

          <div class="flex items-center md:hidden">
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span class="sr-only">Open main menu</span>
              <Icon v-if="!isMobileMenuOpen" icon="ph:list" class="block h-6 w-6" />
              <Icon v-else icon="ph:x" class="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMobileMenuOpen" class="md:hidden" :class="mobileMenuClass">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
         <template v-for="item in menuItems" :key="item.label">
            <RouterLink
                v-if="item.to"
                :to="item.to"
                class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                active-class="text-primary font-semibold bg-primary/5"
                @click="isMobileMenuOpen = false"
              >
                <div class="flex items-center gap-2">
                    <Icon v-if="item.icon" :icon="item.icon" />
                    {{ item.label }}
                </div>
            </RouterLink>
         </template>
      </div>
      <div class="pt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
        <div class="px-4 flex justify-center">
           <ThemeSwitcher />
        </div>
      </div>
    </div>
  </nav>
</template>
