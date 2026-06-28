import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

// `vite` / `vite dev` serves the playground (index.html → src/playground).
// `vite build` produces the publishable library from src/index.ts.
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      include: ['src'],
      exclude: ['src/playground/**'],
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // The library ships JS + types only; nothing from public/ belongs in dist.
    copyPublicDir: false,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'CustomEr',
      fileName: 'custom-er',
      formats: ['es'],
    },
    rollupOptions: {
      // Keep peer deps out of the bundle.
      external: ['vue', 'reka-ui'],
    },
  },
})
