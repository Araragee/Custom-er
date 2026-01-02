<script setup lang="ts">
import { computed } from 'vue'

export interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  iconLeft?: string
  iconRight?: string
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  rounded: 'md',
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const classes: string[] = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed'
  ]

  // Width
  if (props.fullWidth) {
    classes.push('w-full')
  }

  // Size variants
  const sizeMap = {
    xs: 'px-2.5 py-1.5 text-xs gap-1',
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-base gap-2',
    lg: 'px-5 py-3 text-lg gap-2.5',
    xl: 'px-6 py-3.5 text-xl gap-3'
  }
  classes.push(sizeMap[props.size])

  // Rounded variants
  const roundedMap = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }
  classes.push(roundedMap[props.rounded])

  // Variant styles
  const variantMap = {
    primary: [
      'bg-blue-600',
      'text-white',
      'hover:bg-blue-700',
      'active:bg-blue-800',
      'focus:ring-blue-500',
      'dark:bg-blue-500',
      'dark:hover:bg-blue-600',
      'dark:active:bg-blue-700'
    ],
    secondary: [
      'bg-gray-600',
      'text-white',
      'hover:bg-gray-700',
      'active:bg-gray-800',
      'focus:ring-gray-500',
      'dark:bg-gray-500',
      'dark:hover:bg-gray-600',
      'dark:active:bg-gray-700'
    ],
    outline: [
      'bg-transparent',
      'border-2',
      'border-gray-300',
      'text-gray-700',
      'hover:bg-gray-50',
      'active:bg-gray-100',
      'focus:ring-gray-500',
      'dark:border-gray-600',
      'dark:text-gray-300',
      'dark:hover:bg-gray-800',
      'dark:active:bg-gray-700'
    ],
    ghost: [
      'bg-transparent',
      'text-gray-700',
      'hover:bg-gray-100',
      'active:bg-gray-200',
      'focus:ring-gray-500',
      'dark:text-gray-300',
      'dark:hover:bg-gray-800',
      'dark:active:bg-gray-700'
    ],
    danger: [
      'bg-red-600',
      'text-white',
      'hover:bg-red-700',
      'active:bg-red-800',
      'focus:ring-red-500',
      'dark:bg-red-500',
      'dark:hover:bg-red-600',
      'dark:active:bg-red-700'
    ]
  }
  classes.push(...variantMap[props.variant])

  return classes.join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="animate-spin">
      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>

    <slot name="icon-left">
      <span v-if="iconLeft && !loading">{{ iconLeft }}</span>
    </slot>

    <slot></slot>

    <slot name="icon-right">
      <span v-if="iconRight && !loading">{{ iconRight }}</span>
    </slot>
  </button>
</template>
