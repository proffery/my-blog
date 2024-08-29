import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

type Props = ComponentPropsWithoutRef<'div'>

export const Card = forwardRef<ElementRef<'div'>, Props>(
  ({ children, className, ...rest }: Props, ref) => {
    const classNames = {
      card: clsx(s.card, className),
    }

    return (
      <div className={classNames.card} {...rest} ref={ref}>
        {children}
      </div>
    )
  }
)
