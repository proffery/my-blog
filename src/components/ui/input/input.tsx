import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  Ref,
  forwardRef,
  useId,
} from 'react'

import { FieldError } from '@/components/ui/field-error/field-error'
import { Label } from '@/components/ui/label/label'
import clsx from 'clsx'

import s from './input.module.scss'

type Props<T extends ElementType = 'input'> = {
  as?: T
  className?: string
  cleanSearch?: () => void
  errorMessage?: string
  label?: string
  value?: string
  variant?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

const InputComponent = <T extends ElementType = 'input'>(
  props: Omit<ComponentPropsWithoutRef<T>, keyof Props<T>> & Props<T>,
  ref: Ref<HTMLInputElement>
) => {
  const {
    as: Component = 'input',
    className,
    disabled,
    errorMessage,
    id,
    label,
    value,
    variant = 'primary',
    ...rest
  } = props
  const classNames = {
    container: clsx(s.container),
    input: clsx(
      className,
      s.input,
      Component === 'textarea' && s.textarea,
      s[variant],
      disabled && s.disabled
    ),
  }

  const new_id = useId()

  return (
    <FieldError errorMessage={errorMessage}>
      {label && (
        <Label disabled={disabled} htmlFor={id ?? new_id} variant={variant}>
          {label}
        </Label>
      )}
      <Component
        className={classNames.input}
        disabled={disabled}
        id={id ?? new_id}
        ref={ref}
        value={value}
        {...rest}
      />
    </FieldError>
  )
}

export const Input = forwardRef(InputComponent) as <T extends ElementType = 'input'>(
  props: {
    ref?: ForwardedRef<ElementRef<T>>
  } & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>> &
    Props<T>
) => ReturnType<typeof InputComponent>
