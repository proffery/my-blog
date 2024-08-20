import { ReactNode } from 'react'

import clsx from 'clsx'

import s from './field-error.module.scss'

type Props = {
  children?: ReactNode
  errorMessage?: string
}
export const FieldError = ({ children, errorMessage }: Props) => {
  const classNames = {
    error: clsx(s.error),
  }

  return (
    <div>
      {children}
      {errorMessage && <div className={classNames.error}>{errorMessage}</div>}
    </div>
  )
}
