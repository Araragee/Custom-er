<script setup lang="ts">
import { computed } from 'vue'
import { useId } from 'reka-ui'
import { cx } from '../../utils/cx'
import type { InputProps } from './types'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const generatedId = useId()
const inputId = computed(() => props.id ?? generatedId)
const hintId = computed(() => `${inputId.value}-hint`)
const errorId = computed(() => `${inputId.value}-error`)
const describedBy = computed(() => {
  if (props.error) return errorId.value
  if (props.hint) return hintId.value
  return undefined
})

const sizeClasses: Record<NonNullable<InputProps['size']>, string> = {
  sm: 'h-8 px-2.5 text-sm',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-base',
}

const fieldClasses = computed(() =>
  cx(
    'w-full rounded-lg border bg-surface text-fg placeholder:text-muted/70',
    'transition-colors duration-200 ease-smooth',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg',
    'disabled:opacity-50 disabled:pointer-events-none',
    sizeClasses[props.size],
    props.error
      ? 'border-danger focus:ring-danger/40'
      : 'border-border focus:border-primary focus:ring-primary/40',
  ),
)
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="inputId" class="text-sm font-medium text-fg">
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>

    <div class="relative flex items-center">
      <span v-if="$slots.leading" class="pointer-events-none absolute left-3 text-muted">
        <slot name="leading" />
      </span>
      <input
        :id="inputId"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-invalid="!!error || undefined"
        :aria-describedby="describedBy"
        :class="cx(fieldClasses, $slots.leading && 'pl-9', $slots.trailing && 'pr-9')"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <span v-if="$slots.trailing" class="absolute right-3 text-muted">
        <slot name="trailing" />
      </span>
    </div>

    <p v-if="error" :id="errorId" class="text-sm text-danger">{{ error }}</p>
    <p v-else-if="hint" :id="hintId" class="text-sm text-muted">{{ hint }}</p>
  </div>
</template>
