import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './field-error.module.scss'

type Props = {
  errorMessage?: string
} & ComponentPropsWithoutRef<'div'>
export const FieldError = forwardRef<ElementRef<'div'>, Props>(
  ({ children, errorMessage }: Props, ref) => {
    const classNames = {
      error: clsx(s.error),
    }

    return (
      <div ref={ref}>
        {children}
        {errorMessage && <div className={classNames.error}>{errorMessage}</div>}
      </div>
    )
  }
)
