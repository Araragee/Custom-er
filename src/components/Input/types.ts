export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps {
  /** Bound value. */
  modelValue?: string | number
  /** Visible label rendered above the field. */
  label?: string
  /** Helper text rendered below the field when there's no error. */
  hint?: string
  /** Error message. Switches the field into an invalid visual state. */
  error?: string
  /** Native input type. @default 'text' */
  type?: string
  /** Control height / padding. @default 'md' */
  size?: InputSize
  placeholder?: string
  disabled?: boolean
  required?: boolean
  /** Native input id. Auto-generated when omitted. */
  id?: string
}
