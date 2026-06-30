# custom-er

A custom Vue 3 component library — headless behavior (built on
[reka-ui](https://reka-ui.com)) with opinionated, themeable designs. Think
Headless UI, but with batteries-included styling and a runtime palette engine.

> **Status:** early development. The theme engine and five components
> (`Button`, `Input`, `Modal`, `Menu`) are in place; more components and the
> published npm release are on the roadmap below.

## Project layout

```
src/
  components/        # library components
    Button/
    Input/
    Modal/           # compound: Modal, ModalTrigger, ModalContent, …
    Menu/            # compound: Menu, MenuTrigger, MenuContent, MenuItem, …
  theme/             # design tokens, palettes, useTheme() composable
    tokens.css       #   ← the public theming contract (Tailwind v4)
  utils/             # small internal helpers
  index.ts           # public package entry (barrel)
  playground/        # local demo / showcase app (not published)
```

## Develop

```sh
npm install
npm run dev          # runs the playground showcase
npm run type-check
npm run build        # type-check + build the library into dist/
```

`vite dev` serves the playground (`src/playground`); `vite build` produces the
publishable library from `src/index.ts`.

## Theming

Colors are driven by CSS custom properties so palettes can be swapped at runtime
with zero rebuilds. The `useTheme()` composable writes `--palette-*` variables
onto `:root`, and `tokens.css` exposes them to Tailwind as utilities
(`bg-primary`, `text-fg`, `border-border`, …) via Tailwind v4's `@theme inline`.

```ts
import { useTheme } from 'custom-er'

const { theme, themes, setTheme, isDark, toggleDark } = useTheme()
setTheme('Midnight')
```

Built-in palettes: `Ocean`, `Sunset`, `Dawn`, `Midnight`, `Simple`. Each defines
`primary`, `secondary`, `bg`, `surface`, `onPrimary`, `fg`, `muted`, `border`,
and `danger` channels.

## Components

- **`Button`** — `solid`/`soft`/`outline`/`ghost`/`link` variants ×
  `primary`/`secondary`/`neutral`/`danger` colors, with `pill`, `block`,
  `loading`, and `as`/`asChild` polymorphism.
- **`Input`** — labeled text field with `hint`/`error` states and
  leading/trailing slots.
- **`Modal`** (`Modal`, `ModalTrigger`, `ModalContent`, `ModalTitle`,
  `ModalDescription`, `ModalClose`) — a styled compound API over Reka UI's
  `Dialog`, with sizes and open/close animations.
- **`Menu`** (`Menu`, `MenuTrigger`, `MenuContent`, `MenuItem`, `MenuLabel`,
  `MenuSeparator`) — a styled compound API over Reka UI's `DropdownMenu`.

The `Modal`/`Menu` compound APIs mirror Reka UI's own primitive naming, so
consumers familiar with Radix-style headless libraries should feel at home.

## Consuming (preview — finalized in Phase 3)

Components ship as JS using Tailwind utility classes, so a consumer app provides
its own Tailwind v4 build and the token contract:

```css
/* app.css */
@import 'tailwindcss';
@import 'custom-er/tokens.css';
@source '../node_modules/custom-er/dist';
```

```vue
<script setup lang="ts">
import { Button } from 'custom-er'
</script>

<template>
  <Button variant="soft" color="secondary">Hello</Button>
</template>
```

## Roadmap

- **Phase 0 — Cleanup & rename** ✅ flattened to a single package, removed
  scaffold cruft, fixed broken imports.
- **Phase 1 — Theme engine** ✅ Tailwind v4 token contract, palette engine,
  `useTheme()`, first `Button`.
- **Phase 2 — Component architecture** ✅ `Input`, `Modal`, `Menu` added on the
  Reka UI headless core, with consistent variant/slot conventions and a shared
  `danger` token for destructive actions.
- **Phase 3 — npm packaging** — finalize the build/exports, validate in a real
  consumer app, publish.
- **Phase 4 — Docs, tests, DX** — Storybook/VitePress showcase, Vitest tests,
  ESLint, release automation.
