<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { cx } from '../../utils/cx'
import type { ButtonColor, ButtonProps, ButtonVariant } from './types'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  color: 'primary',
  size: 'md',
  as: 'button',
})

const base =
  'relative inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap select-none ' +
  'transition-[background-color,border-color,box-shadow,color,transform] duration-200 ease-smooth ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]'

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
}

const variantClasses: Record<ButtonColor, Record<ButtonVariant, string>> = {
  primary: {
    solid: 'bg-primary text-on-primary shadow-sm hover:bg-primary/90 hover:shadow-md',
    soft: 'bg-primary/10 text-primary hover:bg-primary/20',
    outline: 'border border-primary/40 text-primary hover:bg-primary/10',
    ghost: 'text-primary hover:bg-primary/10',
    link: 'text-primary underline-offset-4 hover:underline',
  },
  secondary: {
    solid: 'bg-secondary text-on-primary shadow-sm hover:bg-secondary/90 hover:shadow-md',
    soft: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
    outline: 'border border-secondary/40 text-secondary hover:bg-secondary/10',
    ghost: 'text-secondary hover:bg-secondary/10',
    link: 'text-secondary underline-offset-4 hover:underline',
  },
  neutral: {
    solid: 'bg-fg text-bg shadow-sm hover:bg-fg/90 hover:shadow-md',
    soft: 'bg-fg/5 text-fg hover:bg-fg/10',
    outline: 'border border-border text-fg hover:bg-fg/5',
    ghost: 'text-fg hover:bg-fg/5',
    link: 'text-fg underline-offset-4 hover:underline',
  },
  danger: {
    solid: 'bg-danger text-on-primary shadow-sm hover:bg-danger/90 hover:shadow-md',
    soft: 'bg-danger/10 text-danger hover:bg-danger/20',
    outline: 'border border-danger/40 text-danger hover:bg-danger/10',
    ghost: 'text-danger hover:bg-danger/10',
    link: 'text-danger underline-offset-4 hover:underline',
  },
}

const isLink = computed(() => props.variant === 'link')
const isDisabled = computed(() => props.disabled || props.loading)
const radius = computed(() =>
  props.pill ? 'rounded-full' : props.size === 'sm' ? 'rounded-lg' : 'rounded-xl',
)

const classes = computed(() =>
  cx(
    base,
    // Link is sizing-agnostic — it sits inline with text.
    isLink.value ? 'h-auto p-0 align-baseline' : sizeClasses[props.size],
    !isLink.value && radius.value,
    props.block && 'w-full',
    variantClasses[props.color][props.variant],
  ),
)
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="classes"
    :disabled="as === 'button' ? isDisabled : undefined"
    :data-loading="loading || undefined"
    :aria-busy="loading || undefined"
  >
    <svg
      v-if="loading"
      class="size-4 shrink-0 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z"
      />
    </svg>
    <slot v-if="$slots.leading && !loading" name="leading" />
    <slot />
    <slot v-if="$slots.trailing" name="trailing" />
  </Primitive>
</template>
