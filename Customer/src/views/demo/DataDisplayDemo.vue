<script setup lang="ts">
import { ref } from 'vue';
import PlaygroundWrapper from '@/components/demo/PlaygroundWrapper.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';
import BaseAvatar from '@/components/base/BaseAvatar.vue';

const activeTab = ref<'badge' | 'avatar'>('badge');

// Badge Props
const badgeLabel = ref('Status');
const badgeType = ref<'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'>('primary');
const badgeVariant = ref<'solid' | 'outline' | 'soft'>('soft');
const badgeRounded = ref('rounded-full');
const badgeIcon = ref('');
const badgeSize = ref<'sm' | 'md' | 'lg'>('md');

// Avatar Props
const avatarSrc = ref('https://i.pravatar.cc/150?u=jules');
const avatarInitials = ref('JD');
const avatarSize = ref<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md');
const avatarShape = ref<'circle' | 'square' | 'rounded'>('circle');
const avatarStatus = ref<'online' | 'offline' | 'busy' | 'away' | null>('online');

</script>

<template>
  <PlaygroundWrapper
    :component-name="activeTab === 'badge' ? 'BaseBadge' : 'BaseAvatar'"
    :component-props="activeTab === 'badge'
        ? { label: badgeLabel, type: badgeType, variant: badgeVariant, rounded: badgeRounded, icon: badgeIcon, size: badgeSize }
        : { src: avatarSrc, initials: avatarInitials, size: avatarSize, shape: avatarShape, status: avatarStatus }"
  >
    <template #stage>
      <div class="absolute top-4 left-4 z-50 bg-white dark:bg-gray-800 p-1 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex text-sm">
         <button
           @click="activeTab = 'badge'"
           class="px-3 py-1 rounded-md transition-colors"
           :class="activeTab === 'badge' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400'"
         >Badge</button>
         <button
           @click="activeTab = 'avatar'"
           class="px-3 py-1 rounded-md transition-colors"
           :class="activeTab === 'avatar' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-400'"
         >Avatar</button>
      </div>

      <div class="flex flex-col items-center justify-center p-10 gap-8">
         <template v-if="activeTab === 'badge'">
             <BaseBadge
               :label="badgeLabel"
               :type="badgeType"
               :variant="badgeVariant"
               :rounded="badgeRounded"
               :icon="badgeIcon"
               :size="badgeSize"
             />

             <!-- Show variations -->
             <div class="grid grid-cols-3 gap-4 mt-8 opacity-50 pointer-events-none">
                 <BaseBadge type="success" label="Success" :variant="badgeVariant" />
                 <BaseBadge type="warning" label="Warning" :variant="badgeVariant" />
                 <BaseBadge type="error" label="Error" :variant="badgeVariant" />
             </div>
         </template>

         <template v-else>
             <BaseAvatar
               :src="avatarSrc"
               :initials="avatarInitials"
               :size="avatarSize"
               :shape="avatarShape"
               :status="avatarStatus"
             />

             <!-- Show variations -->
             <div class="flex gap-4 mt-8 items-end opacity-50 pointer-events-none">
                 <BaseAvatar initials="XS" size="xs" :shape="avatarShape" />
                 <BaseAvatar initials="SM" size="sm" :shape="avatarShape" />
                 <BaseAvatar initials="MD" size="md" :shape="avatarShape" />
                 <BaseAvatar initials="LG" size="lg" :shape="avatarShape" />
                 <BaseAvatar initials="XL" size="xl" :shape="avatarShape" />
             </div>
         </template>
      </div>
    </template>

    <template #controls>
       <div v-if="activeTab === 'badge'" class="space-y-4">
           <h3 class="font-semibold text-gray-900 dark:text-white pb-2 border-b dark:border-gray-700">Badge Controls</h3>

           <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label</label>
              <input v-model="badgeLabel" type="text" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm text-gray-900 dark:text-white">
           </div>

           <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
              <select v-model="badgeType" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm">
                <option value="primary">Primary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="info">Info</option>
                <option value="neutral">Neutral</option>
              </select>
           </div>

           <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Variant</label>
              <select v-model="badgeVariant" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm">
                <option value="solid">Solid</option>
                <option value="outline">Outline</option>
                <option value="soft">Soft</option>
              </select>
           </div>

           <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size</label>
              <select v-model="badgeSize" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm">
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
           </div>

           <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon (Optional)</label>
              <input v-model="badgeIcon" type="text" placeholder="e.g. ph:star-fill" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm text-gray-900 dark:text-white">
           </div>
       </div>

       <div v-else class="space-y-4">
           <h3 class="font-semibold text-gray-900 dark:text-white pb-2 border-b dark:border-gray-700">Avatar Controls</h3>

           <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
              <input v-model="avatarSrc" type="text" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm text-gray-900 dark:text-white">
           </div>

           <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Initials</label>
              <input v-model="avatarInitials" type="text" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm text-gray-900 dark:text-white">
           </div>

           <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size</label>
              <select v-model="avatarSize" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm">
                <option value="xs">XS</option>
                <option value="sm">SM</option>
                <option value="md">MD</option>
                <option value="lg">LG</option>
                <option value="xl">XL</option>
                <option value="2xl">2XL</option>
              </select>
           </div>

           <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shape</label>
              <select v-model="avatarShape" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm">
                <option value="circle">Circle</option>
                <option value="square">Square</option>
                <option value="rounded">Rounded</option>
              </select>
           </div>

           <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select v-model="avatarStatus" class="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm">
                <option :value="null">None</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="busy">Busy</option>
                <option value="away">Away</option>
              </select>
           </div>
       </div>
    </template>
  </PlaygroundWrapper>
</template>
