import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactNode,
  Ref,
  forwardRef,
} from 'react'

import clsx from 'clsx'

import s from './button.module.scss'

type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  padding?: boolean
  variant?: 'primary' | 'secondary' | 'text'
} & ComponentPropsWithoutRef<T>

const ButtonComponent = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
  ref: Ref<HTMLButtonElement>
) => {
  const {
    as: Component = 'button',
    className,
    disabled = false,
    fullWidth = false,
    padding = true,
    variant = 'primary',
    ...rest
  } = props
  const classNames = {
    component: clsx(
      s.button,
      s[variant],
      fullWidth && s.fullWidth,
      !padding && s.nonePadding,
      disabled && s.disabled,
      className
    ),
  }

  return <Component className={classNames.component} disabled={disabled} {...rest} ref={ref} />
}

export const Button = forwardRef(ButtonComponent) as <T extends ElementType = 'button'>(
  props: {
    ref?: ForwardedRef<ElementRef<T>>
  } & ButtonProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => ReturnType<typeof ButtonComponent>
