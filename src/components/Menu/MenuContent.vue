<script setup lang="ts">
import { DropdownMenuContent, DropdownMenuPortal } from 'reka-ui'
import { cx } from '../../utils/cx'
import type { MenuContentProps } from './types'

withDefaults(defineProps<MenuContentProps>(), {
  side: 'bottom',
  align: 'start',
  sideOffset: 8,
})
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      :side="side"
      :align="align"
      :side-offset="sideOffset"
      :class="
        cx(
          'z-50 min-w-48 rounded-xl border border-border bg-surface p-1 text-fg shadow-lg',
          'focus:outline-none',
          'data-[state=closed]:animate-fade-out data-[state=open]:animate-scale-in',
        )
      "
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
