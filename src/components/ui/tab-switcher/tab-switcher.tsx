import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { Label } from '@/components/ui/label/label'
import * as Tabs from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './tab-switcher.module.scss'

type TabGroupProps = {
  children?: ReactNode
  className?: string
  label?: string
} & ComponentPropsWithoutRef<typeof Tabs.Root>
export const TabGroup = forwardRef<ElementRef<typeof Tabs.Root>, TabGroupProps>(
  ({ children, className, label, ...props }: TabGroupProps, ref) => {
    const classNames = {
      root: clsx(className),
    }

    return (
      <div className={classNames.root}>
        {label && <Label>{label}</Label>}
        <Tabs.Root ref={ref} {...props}>
          {children}
        </Tabs.Root>
      </div>
    )
  }
)

type TabListProps = {
  children?: ReactNode
} & ComponentPropsWithoutRef<typeof Tabs.List>
export const TabList = forwardRef<ElementRef<typeof Tabs.List>, TabListProps>(
  ({ children, ...props }: TabListProps, ref) => {
    const classNames = { list: clsx(s.tabList) }

    return (
      <Tabs.List className={classNames.list} ref={ref} {...props}>
        {children}
      </Tabs.List>
    )
  }
)

type TabItemProps = {
  children?: ReactNode
  selected?: boolean
} & ComponentPropsWithoutRef<typeof Tabs.Trigger>
export const TabItem = forwardRef<ElementRef<typeof Tabs.Trigger>, TabItemProps>(
  ({ children, disabled, selected, ...props }: TabItemProps, ref) => {
    const classNames = { item: clsx(s.tabItem, selected && s.selected, disabled && s.disabled) }

    return (
      <Tabs.Trigger className={classNames.item} disabled={disabled} {...props} ref={ref}>
        {children}
      </Tabs.Trigger>
    )
  }
)

type TabContentItemProps = {
  children?: ReactNode
} & ComponentPropsWithoutRef<typeof Tabs.Content>
export const TabContentItem = forwardRef<ElementRef<typeof Tabs.Content>, TabContentItemProps>(
  ({ children, ...props }: TabContentItemProps, ref) => {
    const classNames = { content: clsx(s.content) }

    return (
      <Tabs.Content className={classNames.content} {...props} ref={ref}>
        {children}
      </Tabs.Content>
    )
  }
)
