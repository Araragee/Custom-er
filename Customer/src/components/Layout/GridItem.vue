<script setup lang="ts">
import { computed } from 'vue'

export interface GridItemProps {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full'
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 'full'
  colStart?: number
  colEnd?: number
  rowStart?: number
  rowEnd?: number
  order?: number
}

const props = withDefaults(defineProps<GridItemProps>(), {
  colSpan: 1,
  rowSpan: 1,
  order: 0
})

const itemClasses = computed(() => {
  const classes: string[] = []

  // Column span
  if (props.colSpan === 'full') {
    classes.push('col-span-full')
  } else {
    const colSpanMap: Record<number, string> = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      5: 'col-span-5',
      6: 'col-span-6',
      7: 'col-span-7',
      8: 'col-span-8',
      9: 'col-span-9',
      10: 'col-span-10',
      11: 'col-span-11',
      12: 'col-span-12'
    }
    classes.push(colSpanMap[props.colSpan])
  }

  // Row span
  if (props.rowSpan === 'full') {
    classes.push('row-span-full')
  } else {
    const rowSpanMap: Record<number, string> = {
      1: 'row-span-1',
      2: 'row-span-2',
      3: 'row-span-3',
      4: 'row-span-4',
      5: 'row-span-5',
      6: 'row-span-6'
    }
    classes.push(rowSpanMap[props.rowSpan])
  }

  return classes.join(' ')
})

const itemStyles = computed(() => {
  const styles: Record<string, string | number> = {}

  if (props.colStart) {
    styles.gridColumnStart = props.colStart
  }
  if (props.colEnd) {
    styles.gridColumnEnd = props.colEnd
  }
  if (props.rowStart) {
    styles.gridRowStart = props.rowStart
  }
  if (props.rowEnd) {
    styles.gridRowEnd = props.rowEnd
  }
  if (props.order !== 0) {
    styles.order = props.order
  }

  return styles
})
</script>

<template>
  <div :class="itemClasses" :style="itemStyles">
    <slot></slot>
  </div>
</template>
