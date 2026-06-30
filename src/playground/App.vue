<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../components/Button'
import type { ButtonVariant } from '../components/Button'
import { Input } from '../components/Input'
import { Modal, ModalClose, ModalContent, ModalDescription, ModalTitle, ModalTrigger } from '../components/Modal'
import { Menu, MenuContent, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from '../components/Menu'
import { useTheme } from '../theme'
import GradientBackdrop from './backdrop/GradientBackdrop.vue'

const { theme, themes, setTheme, isDark, toggleDark } = useTheme()

const variants: ButtonVariant[] = ['solid', 'soft', 'outline', 'ghost', 'link']
const loading = ref(false)
const email = ref('')
const deleteOpen = ref(false)

function fakeSubmit() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1500)
}
</script>

<template>
  <div class="relative min-h-screen bg-bg text-fg transition-colors duration-300">
    <GradientBackdrop class="fixed inset-0" />

    <div class="relative mx-auto max-w-4xl px-6 py-16">
      <!-- Header -->
      <header class="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 class="text-5xl font-bold tracking-tight">Custom-er</h1>
          <p class="mt-2 text-muted">A themeable Vue component library.</p>
        </div>
        <div class="flex items-center gap-2">
          <Button size="sm" variant="ghost" color="neutral" @click="toggleDark">
            {{ isDark ? '☾ Dark' : '☀ Light' }}
          </Button>
        </div>
      </header>

      <!-- Theme switcher -->
      <section class="mb-12">
        <h2 class="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Palette</h2>
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="name in themes"
            :key="name"
            size="sm"
            :variant="theme === name ? 'solid' : 'soft'"
            @click="setTheme(name)"
          >
            {{ name }}
          </Button>
        </div>
      </section>

      <!-- Variants x colors matrix -->
      <section class="mb-12 space-y-6">
        <h2 class="text-sm font-semibold uppercase tracking-wide text-muted">Buttons</h2>
        <div v-for="v in variants" :key="v" class="flex flex-wrap items-center gap-3">
          <span class="w-16 text-sm text-muted">{{ v }}</span>
          <Button :variant="v" color="primary">Primary</Button>
          <Button :variant="v" color="secondary">Secondary</Button>
          <Button :variant="v" color="neutral">Neutral</Button>
          <Button :variant="v" color="danger">Danger</Button>
        </div>
      </section>

      <!-- Sizes + states -->
      <section class="mb-12 space-y-6">
        <h2 class="text-sm font-semibold uppercase tracking-wide text-muted">Sizes &amp; states</h2>
        <div class="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button pill>Pill</Button>
          <Button disabled>Disabled</Button>
          <Button :loading="loading" @click="fakeSubmit">Submit</Button>
        </div>
        <Button block size="lg">Block button</Button>
      </section>

      <!-- Input -->
      <section class="mb-12 max-w-sm space-y-6">
        <h2 class="text-sm font-semibold uppercase tracking-wide text-muted">Input</h2>
        <Input v-model="email" label="Email" placeholder="you@example.com" hint="We'll never share it." />
        <Input label="Email" model-value="not-an-email" error="Enter a valid email address." />
        <Input label="Disabled" model-value="Can't touch this" disabled />
      </section>

      <!-- Modal + Menu -->
      <section class="space-y-6">
        <h2 class="text-sm font-semibold uppercase tracking-wide text-muted">Modal &amp; Menu</h2>
        <div class="flex flex-wrap items-center gap-3">
          <Modal v-model:open="deleteOpen">
            <ModalTrigger as-child>
              <Button variant="outline" color="danger">Delete account…</Button>
            </ModalTrigger>
            <ModalContent size="sm">
              <ModalTitle>Delete account</ModalTitle>
              <ModalDescription>
                This will permanently delete your account. This action cannot be undone.
              </ModalDescription>
              <div class="mt-6 flex justify-end gap-2">
                <ModalClose as-child>
                  <Button variant="ghost" color="neutral">Cancel</Button>
                </ModalClose>
                <Button color="danger" @click="deleteOpen = false">Delete</Button>
              </div>
            </ModalContent>
          </Modal>

          <Menu>
            <MenuTrigger as-child>
              <Button variant="outline" color="neutral">Options ▾</Button>
            </MenuTrigger>
            <MenuContent>
              <MenuLabel>Account</MenuLabel>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuSeparator />
              <MenuItem variant="danger">Delete</MenuItem>
            </MenuContent>
          </Menu>
        </div>
      </section>
    </div>
  </div>
</template>
