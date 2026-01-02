<script setup lang="ts">
import { ref, provide, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export interface BaseTabsProps {
  modelValue?: string | number
  orientation?: 'horizontal' | 'vertical'
  variant?: 'line' | 'enclosed' | 'pills'
  useUrlHash?: boolean
}

const props = withDefaults(defineProps<BaseTabsProps>(), {
  orientation: 'horizontal',
  variant: 'line',
  useUrlHash: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
}>()

const router = useRouter()
const route = useRoute()

const activeTab = ref<string | number>(props.modelValue || '')

const tabs = ref<Array<{
  id: string | number
  label: string
  disabled?: boolean
  icon?: string
}>>([])

// Provide active tab and registration methods to children
provide('tabsContext', {
  activeTab,
  registerTab: (tab: { id: string | number; label: string; disabled?: boolean; icon?: string }) => {
    tabs.value.push(tab)
  },
  unregisterTab: (id: string | number) => {
    const index = tabs.value.findIndex(t => t.id === id)
    if (index !== -1) tabs.value.splice(index, 1)
  },
  setActiveTab: (id: string | number) => {
    const tab = tabs.value.find(t => t.id === id)
    if (tab && !tab.disabled) {
      activeTab.value = id
      emit('update:modelValue', id)
      emit('change', id)

      if (props.useUrlHash) {
        router.push({ hash: `#${id}` })
      }
    }
  }
})

// Handle URL hash integration
onMounted(() => {
  if (props.useUrlHash && route.hash) {
    const hashValue = route.hash.slice(1)
    const tab = tabs.value.find(t => t.id === hashValue)
    if (tab && !tab.disabled) {
      activeTab.value = hashValue
    }
  }
})

watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    activeTab.value = newValue
  }
})

const tabsClasses = computed(() => {
  const classes: string[] = ['tabs']

  if (props.orientation === 'vertical') {
    classes.push('flex')
  }

  return classes.join(' ')
})

const tabListClasses = computed(() => {
  const classes: string[] = ['flex']

  // Orientation
  if (props.orientation === 'vertical') {
    classes.push('flex-col', 'border-r', 'border-gray-200', 'dark:border-gray-700', 'min-w-[200px]')
  } else {
    classes.push('flex-row', 'border-b', 'border-gray-200', 'dark:border-gray-700')
  }

  // Variant specific styles
  if (props.variant === 'pills') {
    classes.push('gap-1', 'p-1', 'bg-gray-100', 'dark:bg-gray-800', 'rounded-lg')
  } else if (props.variant === 'enclosed') {
    classes.push('gap-0')
  } else {
    classes.push('gap-1')
  }

  return classes.join(' ')
})

const getTabClasses = (tab: { id: string | number; disabled?: boolean }) => {
  const classes: string[] = [
    'px-4',
    'py-2',
    'font-medium',
    'text-sm',
    'transition-all',
    'duration-200',
    'cursor-pointer',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-500',
    'whitespace-nowrap'
  ]

  const isActive = activeTab.value === tab.id

  if (tab.disabled) {
    classes.push('opacity-50', 'cursor-not-allowed')
  }

  // Variant styles
  if (props.variant === 'line') {
    if (props.orientation === 'horizontal') {
      classes.push('border-b-2', '-mb-px')
      if (isActive) {
        classes.push('border-blue-600', 'text-blue-600', 'dark:border-blue-400', 'dark:text-blue-400')
      } else {
        classes.push('border-transparent', 'text-gray-600', 'dark:text-gray-400', 'hover:text-gray-800', 'dark:hover:text-gray-200')
      }
    } else {
      classes.push('border-r-2', '-mr-px')
      if (isActive) {
        classes.push('border-blue-600', 'text-blue-600', 'dark:border-blue-400', 'dark:text-blue-400')
      } else {
        classes.push('border-transparent', 'text-gray-600', 'dark:text-gray-400', 'hover:text-gray-800', 'dark:hover:text-gray-200')
      }
    }
  } else if (props.variant === 'enclosed') {
    classes.push('border', 'rounded-t-lg')
    if (isActive) {
      classes.push('bg-white', 'dark:bg-gray-900', 'border-gray-200', 'dark:border-gray-700', 'border-b-white', 'dark:border-b-gray-900', 'text-blue-600', 'dark:text-blue-400')
    } else {
      classes.push('bg-gray-100', 'dark:bg-gray-800', 'border-transparent', 'text-gray-600', 'dark:text-gray-400', 'hover:text-gray-800', 'dark:hover:text-gray-200')
    }
  } else if (props.variant === 'pills') {
    classes.push('rounded-md')
    if (isActive) {
      classes.push('bg-white', 'dark:bg-gray-900', 'text-blue-600', 'dark:text-blue-400', 'shadow-sm')
    } else {
      classes.push('text-gray-600', 'dark:text-gray-400', 'hover:bg-gray-200', 'dark:hover:bg-gray-700')
    }
  }

  return classes.join(' ')
}

const handleTabClick = (tab: { id: string | number; disabled?: boolean }) => {
  if (!tab.disabled) {
    activeTab.value = tab.id
    emit('update:modelValue', tab.id)
    emit('change', tab.id)

    if (props.useUrlHash) {
      router.push({ hash: `#${tab.id}` })
    }
  }
}

const handleKeydown = (event: KeyboardEvent, index: number) => {
  const enabledTabs = tabs.value.filter(t => !t.disabled)
  const currentIndex = enabledTabs.findIndex(t => t.id === tabs.value[index].id)

  if (props.orientation === 'horizontal') {
    if (event.key === 'ArrowLeft' && currentIndex > 0) {
      event.preventDefault()
      handleTabClick(enabledTabs[currentIndex - 1])
    } else if (event.key === 'ArrowRight' && currentIndex < enabledTabs.length - 1) {
      event.preventDefault()
      handleTabClick(enabledTabs[currentIndex + 1])
    }
  } else {
    if (event.key === 'ArrowUp' && currentIndex > 0) {
      event.preventDefault()
      handleTabClick(enabledTabs[currentIndex - 1])
    } else if (event.key === 'ArrowDown' && currentIndex < enabledTabs.length - 1) {
      event.preventDefault()
      handleTabClick(enabledTabs[currentIndex + 1])
    }
  }
}
</script>

<template>
  <div :class="tabsClasses">
    <div
      role="tablist"
      :class="tabListClasses"
      :aria-orientation="orientation"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        role="tab"
        :class="getTabClasses(tab)"
        :aria-selected="activeTab === tab.id"
        :aria-disabled="tab.disabled"
        :tabindex="activeTab === tab.id ? 0 : -1"
        @click="handleTabClick(tab)"
        @keydown="handleKeydown($event, index)"
      >
        <span v-if="tab.icon" class="mr-2">{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </div>

    <div
      class="tab-panels"
      :class="orientation === 'vertical' ? 'flex-1 pl-4' : 'pt-4'"
    >
      <slot></slot>
    </div>
  </div>
</template>
