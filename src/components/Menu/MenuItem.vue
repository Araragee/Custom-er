<script setup lang="ts">
import { computed } from 'vue'
import { DropdownMenuItem } from 'reka-ui'
import { cx } from '../../utils/cx'
import type { MenuItemProps } from './types'

const props = withDefaults(defineProps<MenuItemProps>(), {
  variant: 'default',
})

const classes = computed(() =>
  cx(
    'flex cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm outline-none transition-colors',
    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    props.variant === 'danger'
      ? 'text-danger data-[highlighted]:bg-danger/10'
      : 'text-fg data-[highlighted]:bg-primary/10 data-[highlighted]:text-primary',
  ),
)
</script>

<template>
  <DropdownMenuItem :disabled="disabled" :class="classes">
    <slot />
  </DropdownMenuItem>
</template>
