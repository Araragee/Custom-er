import { readonly, ref } from 'vue'
import { palettes, type Palette, type PaletteName } from './palettes'

/** Maps Palette keys to their corresponding CSS custom property names. */
const VAR_MAP: Record<keyof Palette, string> = {
  primary: '--palette-primary',
  secondary: '--palette-secondary',
  bg: '--palette-bg',
  surface: '--palette-surface',
  onPrimary: '--palette-on-primary',
  fg: '--palette-fg',
  muted: '--palette-muted',
  border: '--palette-border',
  danger: '--palette-danger',
}

// Module-level state: shared across every useTheme() caller, no Pinia required.
const current = ref<PaletteName>('Ocean')
const dark = ref(false)

function applyPalette(name: PaletteName) {
  if (typeof document === 'undefined') return
  const palette = palettes[name]
  const root = document.documentElement
  for (const key of Object.keys(VAR_MAP) as (keyof Palette)[]) {
    root.style.setProperty(VAR_MAP[key], palette[key])
  }
}

/**
 * Runtime theme controller. Returns the active palette plus helpers to swap
 * palettes and toggle dark mode. State is global, so any component can read or
 * drive the theme.
 */
export function useTheme() {
  function setTheme(name: PaletteName) {
    if (!palettes[name]) return
    current.value = name
    applyPalette(name)
  }

  function setDark(value: boolean) {
    dark.value = value
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', value)
    }
  }

  function toggleDark() {
    setDark(!dark.value)
  }

  return {
    /** Currently active palette name. */
    theme: readonly(current),
    /** Whether dark mode is enabled. */
    isDark: readonly(dark),
    /** All available palette names. */
    themes: Object.keys(palettes) as PaletteName[],
    setTheme,
    setDark,
    toggleDark,
  }
}
