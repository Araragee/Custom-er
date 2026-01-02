<script setup lang="ts">
import { computed } from 'vue'

export interface BaseGridProps {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto-fit' | 'auto-fill'
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  gapX?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  gapY?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'stretch'
  minColWidth?: string
}

const props = withDefaults(defineProps<BaseGridProps>(), {
  cols: 12,
  gap: 'md',
  align: 'stretch',
  justify: 'start'
})

const gridClasses = computed(() => {
  const classes: string[] = ['grid']

  // Columns
  if (typeof props.cols === 'number') {
    const colsMap: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12'
    }
    classes.push(colsMap[props.cols])
  }

  // Gap
  const gapMap = {
    'none': '',
    'xs': '1',
    'sm': '2',
    'md': '4',
    'lg': '6',
    'xl': '8',
    '2xl': '12'
  }

  // Unified gap
  if (props.gap) {
    const gapValue = gapMap[props.gap]
    if (gapValue) classes.push(`gap-${gapValue}`)
  }

  // Gap X and Y
  if (props.gapX) {
    const gapValue = gapMap[props.gapX]
    if (gapValue) classes.push(`gap-x-${gapValue}`)
  }
  if (props.gapY) {
    const gapValue = gapMap[props.gapY]
    if (gapValue) classes.push(`gap-y-${gapValue}`)
  }

  // Align items
  const alignMap = {
    'start': 'items-start',
    'center': 'items-center',
    'end': 'items-end',
    'stretch': 'items-stretch'
  }
  classes.push(alignMap[props.align])

  // Justify items
  const justifyMap = {
    'start': 'justify-items-start',
    'center': 'justify-items-center',
    'end': 'justify-items-end',
    'stretch': 'justify-items-stretch'
  }
  classes.push(justifyMap[props.justify])

  return classes.join(' ')
})

const gridStyles = computed(() => {
  if (props.cols === 'auto-fit' || props.cols === 'auto-fill') {
    const minWidth = props.minColWidth || '250px'
    return {
      gridTemplateColumns: `repeat(${props.cols}, minmax(${minWidth}, 1fr))`
    }
  }
  return {}
})
</script>

<template>
  <div :class="gridClasses" :style="gridStyles">
    <slot></slot>
  </div>
</template>
