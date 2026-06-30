export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost' | 'link'
export type ButtonColor = 'primary' | 'secondary' | 'neutral' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  /** Visual style. @default 'solid' */
  variant?: ButtonVariant
  /** Token color the variant is built from. @default 'primary' */
  color?: ButtonColor
  /** Control height / padding. @default 'md' */
  size?: ButtonSize
  /** Fully rounded pill shape. */
  pill?: boolean
  /** Stretch to the full width of the container. */
  block?: boolean
  /** Show a spinner and block interaction. */
  loading?: boolean
  /** Disable the button. */
  disabled?: boolean
  /** Element/component to render as. @default 'button' */
  as?: string
  /** Merge props onto the single child element instead of rendering `as`. */
  asChild?: boolean
}
