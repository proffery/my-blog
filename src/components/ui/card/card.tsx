import { ComponentPropsWithoutRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

export const Card = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  ({ children, className, ...rest }, ref) => {
    const classNames = {
      card: clsx(s.card, className),
    }

    return (
      <div {...rest} className={classNames.card} ref={ref}>
        {children}
      </div>
    )
  }
)
