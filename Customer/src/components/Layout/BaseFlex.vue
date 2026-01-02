<script setup lang="ts">
import { computed } from 'vue'

export interface BaseFlexProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  inline?: boolean
}

const props = withDefaults(defineProps<BaseFlexProps>(), {
  direction: 'row',
  justify: 'start',
  align: 'stretch',
  wrap: 'nowrap',
  gap: 'none',
  inline: false
})

const flexClasses = computed(() => {
  const classes: string[] = []

  // Display type
  classes.push(props.inline ? 'inline-flex' : 'flex')

  // Direction
  const directionMap = {
    'row': 'flex-row',
    'column': 'flex-col',
    'row-reverse': 'flex-row-reverse',
    'column-reverse': 'flex-col-reverse'
  }
  classes.push(directionMap[props.direction])

  // Justify content
  const justifyMap = {
    'start': 'justify-start',
    'center': 'justify-center',
    'end': 'justify-end',
    'between': 'justify-between',
    'around': 'justify-around',
    'evenly': 'justify-evenly'
  }
  classes.push(justifyMap[props.justify])

  // Align items
  const alignMap = {
    'start': 'items-start',
    'center': 'items-center',
    'end': 'items-end',
    'stretch': 'items-stretch',
    'baseline': 'items-baseline'
  }
  classes.push(alignMap[props.align])

  // Wrap
  const wrapMap = {
    'wrap': 'flex-wrap',
    'nowrap': 'flex-nowrap',
    'wrap-reverse': 'flex-wrap-reverse'
  }
  classes.push(wrapMap[props.wrap])

  // Gap
  const gapMap = {
    'none': '',
    'xs': 'gap-1',
    'sm': 'gap-2',
    'md': 'gap-4',
    'lg': 'gap-6',
    'xl': 'gap-8',
    '2xl': 'gap-12'
  }
  const gapClass = gapMap[props.gap]
  if (gapClass) classes.push(gapClass)

  return classes.join(' ')
})
</script>

<template>
  <div :class="flexClasses">
    <slot></slot>
  </div>
</template>
