export type MenuItemVariant = 'default' | 'danger'

export interface MenuContentProps {
  /** Preferred side relative to the trigger. @default 'bottom' */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Alignment relative to the trigger. @default 'start' */
  align?: 'start' | 'center' | 'end'
  /** Distance in pixels from the trigger. @default 8 */
  sideOffset?: number
}

export interface MenuItemProps {
  disabled?: boolean
  /** Visual style — use 'danger' for destructive actions. @default 'default' */
  variant?: MenuItemVariant
}
