<script setup lang="ts">
/** Decorative ambient gradient blobs for the playground background. */
</script>

<template>
  <div class="pointer-events-none overflow-hidden">
    <div class="relative h-full w-full opacity-40 blur-3xl dark:opacity-20">
      <div
        class="absolute left-[10%] top-[12%] h-72 w-2/5 rounded-full bg-primary/60 mix-blend-multiply dark:mix-blend-lighten"
      />
      <div
        class="absolute inset-x-0 top-[18%] mx-auto h-96 w-3/5 rounded-full bg-secondary/50 mix-blend-multiply dark:mix-blend-lighten"
      />
      <div
        class="absolute bottom-0 right-0 h-96 w-3/5 rounded-full bg-primary/40 mix-blend-multiply dark:mix-blend-lighten"
      />
      <div
        class="absolute bottom-0 left-0 h-[500px] w-3/5 rounded-full bg-secondary/40 mix-blend-multiply dark:mix-blend-lighten"
      />
    </div>
  </div>
</template>
