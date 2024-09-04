import { Button } from '@/components/ui/button/button'
import { Modal, ModalProps } from '@/components/ui/modal/modal'
import clsx from 'clsx'

import s from './dialog.module.scss'

export type DialogProps = {
  cancelText?: string
  confirmText?: string
  onCancel?: () => void
  onConfirm?: () => void
} & ModalProps
export const Dialog = ({
  cancelText = 'Cancel',
  children,
  confirmText = 'OK',
  onCancel,
  onConfirm,
  onOpenChange,
  ...rest
}: DialogProps) => {
  const classNames = {
    buttons: clsx(s.buttons),
  }

  const handleCancel = () => {
    onOpenChange?.(false)
    onCancel?.()
  }
  const handleConfirm = () => {
    onConfirm?.()
    onOpenChange?.(false)
  }

  return (
    <Modal onOpenChange={handleCancel} {...rest}>
      {children}
      <div className={classNames.buttons}>
        <Button onClick={handleCancel}>{cancelText}</Button>
        <Button onClick={handleConfirm}>{confirmText}</Button>
      </div>
    </Modal>
  )
}
