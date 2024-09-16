import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

type Props = ComponentPropsWithoutRef<'div'>

export const Card = ({ children, className }: Props) => {
  const classNames = {
    card: clsx(s.card, className),
  }

  return <div className={classNames.card}>{children}</div>
}
