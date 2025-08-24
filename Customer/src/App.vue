<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BaseLayout from '@/components/Base/BaseButton.vue'
</script>

<template>
  <BaseLayout>
    <main>
      <RouterView />
    </main>
  </BaseLayout>
</template>
