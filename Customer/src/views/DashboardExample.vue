<script setup lang="ts">
import { ref } from 'vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseTable from '@/components/base/BaseTable.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { Icon } from '@iconify/vue';

const menuItems = [
  { label: 'Overview', to: '#', icon: 'ph:squares-four' },
  { label: 'Customers', to: '#', icon: 'ph:users' },
  { label: 'Orders', to: '#', icon: 'ph:shopping-cart' },
  { label: 'Settings', to: '#', icon: 'ph:gear' },
];

const stats = [
  { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up' },
  { label: 'Active Users', value: '2,338', change: '-1.5%', trend: 'down' },
  { label: 'New Orders', value: '1,203', change: '+10.2%', trend: 'up' },
];

const recentOrders = [
  { id: '#3020', customer: 'Floyd Miles', date: 'Oct 4, 2024', total: '$120.00', status: 'Shipped' },
  { id: '#3019', customer: 'Ollie Chandler', date: 'Oct 4, 2024', total: '$85.00', status: 'Processing' },
  { id: '#3018', customer: 'Jessie Sweet', date: 'Oct 3, 2024', total: '$240.00', status: 'Cancelled' },
  { id: '#3017', customer: 'Marion Day', date: 'Oct 3, 2024', total: '$45.00', status: 'Shipped' },
];

const orderColumns = [
    { key: 'id', label: 'Order ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Date' },
    { key: 'total', label: 'Total' },
    { key: 'status', label: 'Status' },
];
</script>

<template>
  <DashboardLayout :menu-items="menuItems" logo-text="MyDashboard">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
       <BaseCard v-for="stat in stats" :key="stat.label" class="relative overflow-hidden">
          <div class="flex justify-between items-start">
             <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
                <p class="text-3xl font-bold text-gray-900 dark:text-white mt-2">{{ stat.value }}</p>
             </div>
             <div
               class="flex items-center text-sm font-medium px-2.5 py-0.5 rounded-full"
               :class="stat.trend === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'"
             >
                <Icon :icon="stat.trend === 'up' ? 'ph:arrow-up-right' : 'ph:arrow-down-right'" class="w-4 h-4 mr-1" />
                {{ stat.change }}
             </div>
          </div>
       </BaseCard>
    </div>

    <!-- Recent Activity -->
    <div class="mb-8">
       <div class="flex items-center justify-between mb-4">
           <h2 class="text-lg font-medium text-gray-900 dark:text-white">Recent Orders</h2>
           <BaseButton variant="ghost" size="sm">View All</BaseButton>
       </div>

       <BaseTable :columns="orderColumns" :data="recentOrders" striped>
           <template #cell-status="{ value }">
               <BaseBadge
                  :label="value"
                  :type="value === 'Shipped' ? 'success' : (value === 'Processing' ? 'warning' : 'error')"
                  variant="soft"
               />
           </template>
           <template #cell-customer="{ value }">
               <div class="flex items-center gap-3">
                   <BaseAvatar :initials="value.split(' ').map((n: string) => n[0]).join('')" size="sm" />
                   <span class="font-medium text-gray-900 dark:text-white">{{ value }}</span>
               </div>
           </template>
       </BaseTable>
    </div>
  </DashboardLayout>
</template>
