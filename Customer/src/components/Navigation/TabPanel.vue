<script setup lang="ts">
import { inject, onMounted, onUnmounted, computed, Ref } from 'vue'

export interface TabPanelProps {
  id: string | number
  label: string
  disabled?: boolean
  icon?: string
  lazy?: boolean
  keepAlive?: boolean
}

const props = withDefaults(defineProps<TabPanelProps>(), {
  disabled: false,
  lazy: false,
  keepAlive: false
})

const tabsContext = inject<{
  activeTab: Ref<string | number>
  registerTab: (tab: { id: string | number; label: string; disabled?: boolean; icon?: string }) => void
  unregisterTab: (id: string | number) => void
}>('tabsContext')

const isActive = computed(() => tabsContext?.activeTab.value === props.id)

onMounted(() => {
  tabsContext?.registerTab({
    id: props.id,
    label: props.label,
    disabled: props.disabled,
    icon: props.icon
  })
})

onUnmounted(() => {
  tabsContext?.unregisterTab(props.id)
})
</script>

<template>
  <div
    v-show="isActive"
    role="tabpanel"
    :aria-labelledby="`tab-${id}`"
    class="transition-opacity duration-200"
  >
    <component :is="keepAlive ? 'KeepAlive' : 'div'">
      <div v-if="!lazy || isActive">
        <slot></slot>
      </div>
    </component>
  </div>
</template>
