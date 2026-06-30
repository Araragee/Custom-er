export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalContentProps {
  /** Max width of the dialog panel. @default 'md' */
  size?: ModalSize
  /** Hide the built-in close (×) button in the top-right corner. */
  hideClose?: boolean
}
