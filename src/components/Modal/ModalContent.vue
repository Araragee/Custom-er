<script setup lang="ts">
import { DialogClose, DialogContent, DialogOverlay, DialogPortal } from 'reka-ui'
import { cx } from '../../utils/cx'
import type { ModalContentProps } from './types'

const props = withDefaults(defineProps<ModalContentProps>(), {
  size: 'md',
})

const sizeClasses: Record<NonNullable<ModalContentProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  full: 'h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)]',
}
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 bg-fg/40 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
    />
    <!--
      DialogPortal always teleports its slot to the body, regardless of open
      state — visibility is handled inside DialogOverlay/DialogContent. This
      centering wrapper is therefore always in the DOM, so it must not
      intercept clicks; only the content panel itself should.
    -->
    <div class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
      <DialogContent
        :class="
          cx(
            'pointer-events-auto relative w-full rounded-2xl border border-border bg-surface p-6 text-fg shadow-xl',
            'focus:outline-none',
            'data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in',
            sizeClasses[props.size],
          )
        "
      >
        <slot />
        <DialogClose
          v-if="!hideClose"
          class="absolute right-4 top-4 rounded-md p-1 text-muted transition-colors hover:bg-fg/5 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label="Close"
        >
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </DialogClose>
      </DialogContent>
    </div>
  </DialogPortal>
</template>
