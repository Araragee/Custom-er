<script setup lang="ts">
import { computed } from 'vue'

export interface FlexItemProps {
  grow?: number
  shrink?: number
  basis?: string | number
  alignSelf?: 'auto' | 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  order?: number
}

const props = withDefaults(defineProps<FlexItemProps>(), {
  grow: 0,
  shrink: 1,
  basis: 'auto',
  alignSelf: 'auto',
  order: 0
})

const itemClasses = computed(() => {
  const classes: string[] = []

  // Align self
  const alignSelfMap = {
    'auto': 'self-auto',
    'start': 'self-start',
    'center': 'self-center',
    'end': 'self-end',
    'stretch': 'self-stretch',
    'baseline': 'self-baseline'
  }
  classes.push(alignSelfMap[props.alignSelf])

  return classes.join(' ')
})

const itemStyles = computed(() => {
  return {
    flexGrow: props.grow,
    flexShrink: props.shrink,
    flexBasis: typeof props.basis === 'number' ? `${props.basis}px` : props.basis,
    order: props.order
  }
})
</script>

<template>
  <div :class="itemClasses" :style="itemStyles">
    <slot></slot>
  </div>
</template>
