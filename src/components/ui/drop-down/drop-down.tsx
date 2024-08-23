import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './drop-down.module.scss'

type DropdownMenuProps = {
  align?: 'center' | 'end' | 'start'
  ariaLabel?: string
  triangleRight?: string
  trigger: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Root>

export const DropdownMenu = (props: DropdownMenuProps) => {
  const { align = 'end', ariaLabel, children, triangleRight = '10px', trigger } = props
  const classNames = {
    content: clsx(s.content),
    trigger: clsx(s.trigger),
  }

  return (
    <DropdownMenuRadix.Root>
      <DropdownMenuRadix.Trigger aria-label={ariaLabel} className={classNames.trigger}>
        {trigger}
      </DropdownMenuRadix.Trigger>

      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content
          align={align}
          className={classNames.content}
          loop
          sideOffset={8}
          style={{ ['--triangle-right' as string]: triangleRight }}
        >
          {children}
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  )
}

type DropdownSubMenuProps = {
  ariaLabel?: string
  triangleRight?: string
  trigger: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Sub>

export const DropdownSubMenu = (props: DropdownMenuProps) => {
  const { ariaLabel, children, trigger } = props
  const classNames = {
    subContent: clsx(s.content, s.subContent),
    subTrigger: clsx(s.subTrigger),
  }

  return (
    <DropdownMenuRadix.Sub>
      <DropdownMenuRadix.SubTrigger aria-label={ariaLabel} className={classNames.subTrigger}>
        {trigger}
      </DropdownMenuRadix.SubTrigger>

      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.SubContent className={classNames.subContent} loop sideOffset={12}>
          {children}
        </DropdownMenuRadix.SubContent>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Sub>
  )
}

type DropdownItemProps = { children: ReactNode; className?: string } & ComponentPropsWithoutRef<
  typeof DropdownMenuRadix.Item
>

export const DropdownItem = (props: DropdownItemProps) => {
  const { children, className, ...rest } = props
  const classNames = {
    item: clsx(s.item, className),
  }

  return (
    <DropdownMenuRadix.Item {...rest} className={classNames.item}>
      {children}
    </DropdownMenuRadix.Item>
  )
}

type DropdownLabelProps = { children: ReactNode; className?: string } & ComponentPropsWithoutRef<
  typeof DropdownMenuRadix.Label
>

export const DropdownLabel = (props: DropdownLabelProps) => {
  const { children, className, ...rest } = props
  const classNames = {
    item: clsx(s.item, className),
  }

  return (
    <DropdownMenuRadix.Label {...rest} className={classNames.item}>
      {children}
    </DropdownMenuRadix.Label>
  )
}

type DropdownSeparatorProps = {
  className?: string
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Separator>

const classNames = {
  separator: clsx(s.separator),
}

export const DropdownSeparator = (props: DropdownSeparatorProps) => {
  return <DropdownMenuRadix.Separator {...props} className={classNames.separator} />
}
