'use client'
import { ComponentPropsWithoutRef, ReactNode, forwardRef, useId } from 'react'

import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import { Label } from '@/components/ui/label/label'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as SelectRadix from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

type SelectProps = {
  children?: ReactNode
  className?: string
  disabled?: boolean
  label?: string
  placeholder?: ReactNode
} & ComponentPropsWithoutRef<typeof SelectRadix.Root>
export const Select = (props: SelectProps) => {
  const { children, className, disabled, label, placeholder, ...rest } = props
  const id = useId()
  const classNames = {
    container: clsx(s.container),
    content: clsx(s.content),
    icon: clsx(s.icon),
    label: clsx(s.label),
    trigger: clsx(s.trigger, className),
    value: clsx(s.value),
  }

  return (
    <div className={classNames.container}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <SelectRadix.Root {...rest}>
        <SelectRadix.Trigger
          aria-label={label}
          className={classNames.trigger}
          disabled={disabled}
          id={id}
        >
          <span className={classNames.value}>
            <SelectRadix.Value placeholder={placeholder} />
          </span>
          <RightBracketIcon className={classNames.icon} />
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content className={classNames.content} position={'popper'}>
            <ScrollArea.Root type={'auto'}>
              <SelectRadix.Viewport>
                <ScrollArea.Viewport style={{ overflowY: undefined }}>
                  {children}
                </ScrollArea.Viewport>
              </SelectRadix.Viewport>
            </ScrollArea.Root>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}

type ItemProps = {
  children?: ReactNode
  className?: string
} & ComponentPropsWithoutRef<typeof SelectRadix.Item>

export const SelectItem = forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { children, className, ...rest } = props

  const classNames = {
    item: clsx(s.item, className),
    value: clsx(s.value),
  }

  return (
    <SelectRadix.Item {...rest} className={classNames.item} ref={ref}>
      <span className={classNames.value}>
        <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      </span>
    </SelectRadix.Item>
  )
})
