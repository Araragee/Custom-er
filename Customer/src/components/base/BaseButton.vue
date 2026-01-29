<script setup lang="ts">
import { computed } from 'vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  rounded?: string;
  opacity?: number;
  glass?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  rounded: 'rounded-lg',
  opacity: 100,
  glass: false,
});

const themeStore = useThemeStore();
const { isGlassMode } = storeToRefs(themeStore);

const btnClass = computed(() => {
  const baseClasses = 'px-4 py-2 font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-primary text-white hover:opacity-90',
    secondary: 'bg-secondary text-white hover:opacity-90',
    ghost: 'bg-transparent text-primary hover:bg-primary/10',
  };

  const glassClasses = (props.glass || isGlassMode.value)
    ? 'backdrop-blur-md bg-opacity-20 border border-white/20 shadow-lg'
    : '';

  // Calculate opacity style if needed, but Tailwind `bg-opacity` usually works with color classes if defined with `<alpha-value>`.
  // However, props.opacity is 0-100.
  // If we want to strictly apply opacity from prop:
  // Note: Applying opacity to the whole element affects text too.
  // If the requirement is just background opacity, we might need style binding or utility classes if dynamic.
  // The plan says "If glass is true... apply ... bg-opacity-20".
  // Let's interpret `opacity` prop as overall element opacity or background opacity?
  // "Slider: For Opacity (0-100)".
  // Let's apply it as a style to be safe for arbitrary values.

  return [
    baseClasses,
    props.rounded,
    variants[props.variant],
    glassClasses
  ].filter(Boolean).join(' ');
});

const btnStyle = computed(() => {
    // If glass mode is NOT active, we might want to respect the opacity prop.
    // If glass mode IS active, the plan says "bg-opacity-20".
    // Let's assume the opacity prop overrides or complements.
    // For now, I'll apply the opacity prop to the element's opacity style.
    return {
        opacity: props.opacity / 100
    };
});
</script>

<template>
  <button :class="btnClass" :style="btnStyle">
    <slot></slot>
  </button>
</template>
