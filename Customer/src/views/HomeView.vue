<script setup lang="ts">
import BaseLayout from '@/components/Base/BaseButton.vue'
</script>

<template>
    <div class="grid grid-cols-5 items-center justify-center h-screen w-full">
      <div class="col-span-5  bg-transparent backdrop-blur-xl h-full w-full items-center flex justify-center">
        <div class="w-full h-96 items-center justify-center flex flex-col gap-3">
          <p class="text-9xl text-zinc-800 dark:text-zinc-500">Custom-er</p>
          <button class="uppercase rounded-2xl w-auto h-auto font-bold text-2xl px-5 py-3.5 dark:bg-zinc-900 backdrop-blur-3xl dark:bg-opacity-30 bg-zinc-200 bg-opacity-30 text-zinc-800 dark:text-zinc-500 transition-all duration-300 ease-in-out">
            Explore
          </button>
        </div>
      </div>
    </div>
</template>
