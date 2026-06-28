/**
 * Palette definitions. Each value is a space-separated RGB triplet matching the
 * `--palette-*` custom properties declared in `tokens.css`.
 */
export interface Palette {
  /** Brand / accent color used for primary actions. */
  primary: string
  /** Supporting accent color. */
  secondary: string
  /** App background. */
  bg: string
  /** Raised surfaces (cards, popovers). */
  surface: string
  /** Foreground placed on top of `primary` (e.g. solid button text). */
  onPrimary: string
  /** Default body text color. */
  fg: string
  /** De-emphasized text color. */
  muted: string
  /** Default border / divider color. */
  border: string
}

export const palettes = {
  Ocean: {
    primary: '0 153 153',
    secondary: '22 78 99',
    bg: '240 249 255',
    surface: '255 255 255',
    onPrimary: '255 255 255',
    fg: '15 23 42',
    muted: '100 116 139',
    border: '226 232 240',
  },
  Sunset: {
    primary: '219 141 49',
    secondary: '124 58 237',
    bg: '255 247 237',
    surface: '255 255 255',
    onPrimary: '255 255 255',
    fg: '67 20 7',
    muted: '146 64 14',
    border: '254 215 170',
  },
  Dawn: {
    primary: '236 72 153',
    secondary: '100 116 139',
    bg: '248 250 252',
    surface: '255 255 255',
    onPrimary: '255 255 255',
    fg: '15 23 42',
    muted: '100 116 139',
    border: '226 232 240',
  },
  Midnight: {
    primary: '129 140 248',
    secondary: '49 46 129',
    bg: '15 23 42',
    surface: '30 41 59',
    onPrimary: '15 23 42',
    fg: '226 232 240',
    muted: '148 163 184',
    border: '51 65 85',
  },
  Simple: {
    primary: '0 0 0',
    secondary: '85 85 85',
    bg: '255 255 255',
    surface: '245 245 245',
    onPrimary: '255 255 255',
    fg: '0 0 0',
    muted: '115 115 115',
    border: '229 229 229',
  },
} satisfies Record<string, Palette>

export type PaletteName = keyof typeof palettes
