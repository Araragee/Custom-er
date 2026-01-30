<script setup lang="ts">
import { ref } from 'vue';
import PlaygroundWrapper from '@/components/demo/PlaygroundWrapper.vue';
import BaseNavbar from '@/components/nav/BaseNavbar.vue';
import BaseSidebar from '@/components/nav/BaseSidebar.vue';

const activeDemo = ref<'navbar' | 'sidebar'>('navbar');

// Navbar Props
const logoText = ref('MyBrand');
const sticky = ref(true);

// Sidebar Props
const collapsed = ref(false);

const menuItems = [
  { label: 'Dashboard', to: '#', icon: 'ph:squares-four' },
  { label: 'Analytics', to: '#', icon: 'ph:chart-line-up' },
  { label: 'Settings', to: '#', icon: 'ph:gear' },
  { label: 'Profile', to: '#', icon: 'ph:user' },
];
</script>

<template>
  <PlaygroundWrapper
    :component-name="activeDemo === 'navbar' ? 'BaseNavbar' : 'BaseSidebar'"
    :component-props="activeDemo === 'navbar' ? { logoText, sticky, menuItems } : { collapsed, menuItems }"
  >
    <template #stage>
      <div class="w-full h-[600px] flex flex-col gap-4">
          <!-- Mode Switcher for Demo -->
          <div class="flex justify-center">
             <div class="bg-white dark:bg-gray-800 p-1 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex text-sm">
                 <button
                   @click="activeDemo = 'navbar'"
                   class="px-3 py-1 rounded-md transition-colors"
                   :class="activeDemo === 'navbar' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400'"
                 >Navbar</button>
                 <button
                   @click="activeDemo = 'sidebar'"
                   class="px-3 py-1 rounded-md transition-colors"
                   :class="activeDemo === 'sidebar' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400'"
                 >Sidebar</button>
             </div>
          </div>

          <!-- Preview Container (Mini Browser) -->
          <div class="flex-1 w-full bg-gray-100 dark:bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col relative isolate">

            <!-- Navbar Demo -->
            <template v-if="activeDemo === 'navbar'">
               <div class="relative h-full overflow-y-auto custom-scrollbar">
                  <BaseNavbar :menu-items="menuItems" :logo-text="logoText" :sticky="sticky" class="absolute w-full z-10" />

                  <!-- Dummy Content -->
                  <div class="p-8 space-y-8 pt-24 z-0">
                     <div class="h-64 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Content Area</h2>
                        <p class="text-gray-500">Scroll down to see sticky behavior (if enabled).</p>
                     </div>
                     <div v-for="i in 5" :key="i" class="h-32 bg-white dark:bg-gray-800 rounded-xl shadow-sm"></div>
                  </div>
               </div>
            </template>

            <!-- Sidebar Demo -->
            <template v-else>
               <div class="flex h-full">
                  <BaseSidebar :menu-items="menuItems" v-model:collapsed="collapsed" />
                  <div class="flex-1 p-8 overflow-y-auto bg-gray-50 dark:bg-black">
                     <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Dashboard Content</h2>
                     <p class="text-gray-500">The sidebar pushes content or adapts layout.</p>
                     <div class="grid grid-cols-2 gap-4 mt-8">
                        <div class="h-32 bg-white dark:bg-gray-800 rounded-xl shadow-sm"></div>
                        <div class="h-32 bg-white dark:bg-gray-800 rounded-xl shadow-sm"></div>
                     </div>
                  </div>
               </div>
            </template>

          </div>
      </div>
    </template>

    <template #controls>
      <div v-if="activeDemo === 'navbar'" class="space-y-4">
        <h3 class="font-semibold text-gray-900 dark:text-white pb-2 border-b dark:border-gray-700">Navbar Controls</h3>

        <div>
           <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Logo Text</label>
           <input v-model="logoText" type="text" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm text-gray-900 dark:text-white">
        </div>

        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-900 dark:text-white">Sticky Positioning</span>
          <button
            type="button"
            :class="sticky ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'"
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            role="switch"
            :aria-checked="sticky"
            @click="sticky = !sticky"
          >
            <span
              aria-hidden="true"
              :class="sticky ? 'translate-x-5' : 'translate-x-0'"
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            ></span>
          </button>
        </div>
      </div>

      <div v-else class="space-y-4">
        <h3 class="font-semibold text-gray-900 dark:text-white pb-2 border-b dark:border-gray-700">Sidebar Controls</h3>

        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-900 dark:text-white">Collapsed</span>
          <button
            type="button"
            :class="collapsed ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'"
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            role="switch"
            :aria-checked="collapsed"
            @click="collapsed = !collapsed"
          >
            <span
              aria-hidden="true"
              :class="collapsed ? 'translate-x-5' : 'translate-x-0'"
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            ></span>
          </button>
        </div>

        <p class="text-sm text-gray-500">
           Note: The sidebar also has an internal toggle button.
        </p>
      </div>
    </template>
  </PlaygroundWrapper>
</template>
