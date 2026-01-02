<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import BaseLayout from '@/components/Layout/BaseLayout.vue'
import DynamicBackground from '@/components/Background/DynamicBackground.vue'
</script>

<template>
  <DynamicBackground>
    <main>
      <RouterView />
    </main>
  </DynamicBackground>
</template>
