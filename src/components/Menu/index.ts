import { DropdownMenuRoot, DropdownMenuTrigger } from 'reka-ui'

/**
 * Compound Menu (dropdown) API, mirroring Reka UI's DropdownMenu primitives
 * with the library's styling layered onto content/item/label/separator:
 *
 *   <Menu>
 *     <MenuTrigger as-child><Button variant="outline">Options</Button></MenuTrigger>
 *     <MenuContent>
 *       <MenuLabel>Account</MenuLabel>
 *       <MenuItem @select="onProfile">Profile</MenuItem>
 *       <MenuItem @select="onSettings">Settings</MenuItem>
 *       <MenuSeparator />
 *       <MenuItem variant="danger" @select="onDelete">Delete</MenuItem>
 *     </MenuContent>
 *   </Menu>
 */
export const Menu = DropdownMenuRoot
export const MenuTrigger = DropdownMenuTrigger

export { default as MenuContent } from './MenuContent.vue'
export { default as MenuItem } from './MenuItem.vue'
export { default as MenuLabel } from './MenuLabel.vue'
export { default as MenuSeparator } from './MenuSeparator.vue'
export type { MenuContentProps, MenuItemProps, MenuItemVariant } from './types'
