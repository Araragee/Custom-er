import { DialogClose, DialogRoot, DialogTrigger } from 'reka-ui'

/**
 * Compound Modal API, mirroring Reka UI's Dialog primitives with the library's
 * styling layered onto the content/title/description pieces:
 *
 *   <Modal v-model:open="open">
 *     <ModalTrigger as-child><Button>Open</Button></ModalTrigger>
 *     <ModalContent size="sm">
 *       <ModalTitle>Delete account</ModalTitle>
 *       <ModalDescription>This action cannot be undone.</ModalDescription>
 *       <div class="mt-6 flex justify-end gap-2">
 *         <ModalClose as-child><Button variant="ghost">Cancel</Button></ModalClose>
 *         <Button color="danger">Delete</Button>
 *       </div>
 *     </ModalContent>
 *   </Modal>
 */
export const Modal = DialogRoot
export const ModalTrigger = DialogTrigger
export const ModalClose = DialogClose

export { default as ModalContent } from './ModalContent.vue'
export { default as ModalTitle } from './ModalTitle.vue'
export { default as ModalDescription } from './ModalDescription.vue'
export type { ModalContentProps, ModalSize } from './types'
