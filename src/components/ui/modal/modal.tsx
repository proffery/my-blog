import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { CloseIcon } from '@/assets/icons/components/close-icon'
import { Typography } from '@/components/ui/typography/typography'
import * as ModalPrimitive from '@radix-ui/react-dialog'
import clsx from 'clsx'

import s from './modal.module.scss'

export type ModalProps = {
  className?: string
  title?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof ModalPrimitive.Root>

export const Modal = ({ children, className, title, trigger, ...props }: ModalProps) => {
  const classNames = {
    close: clsx(s.close),
    content: clsx(s.content, className),
    overlay: clsx(s.overlay),
    root: clsx(s.root),
    title: clsx(s.title),
  }

  return (
    <ModalPrimitive.Root {...props}>
      {trigger}
      <ModalPrimitive.Portal>
        <ModalPrimitive.Overlay className={classNames.overlay} />
        <ModalPrimitive.Content className={classNames.content}>
          <div className={classNames.title}>
            <Typography.H3 as={ModalPrimitive.Title}>{title}</Typography.H3>
            <ModalPrimitive.Close aria-label={'Close'} className={classNames.close}>
              <CloseIcon />
            </ModalPrimitive.Close>
          </div>
          {children}
        </ModalPrimitive.Content>
      </ModalPrimitive.Portal>
    </ModalPrimitive.Root>
  )
}

type ModalTriggerProps = {
  children?: ReactNode
  className?: string
} & ComponentPropsWithoutRef<typeof ModalPrimitive.Trigger>
export const ModalTrigger = ({ children, className }: ModalTriggerProps) => {
  const classNames = {
    trigger: clsx(s.trigger, className),
  }

  return (
    <ModalPrimitive.Trigger asChild className={classNames.trigger}>
      {children}
    </ModalPrimitive.Trigger>
  )
}
