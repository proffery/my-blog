'use client'
import { ComponentPropsWithoutRef } from 'react'
import { Parallax } from 'react-scroll-parallax'

import clsx from 'clsx'

import s from './card.module.scss'

type Props = ComponentPropsWithoutRef<typeof Parallax>

export const Card = ({ children, className, ...rest }: Props) => {
  const classNames = {
    card: clsx(s.card, className),
  }

  return (
    <Parallax scale={[1, 0.95]} {...rest} className={classNames.card}>
      {children}
    </Parallax>
  )
}
