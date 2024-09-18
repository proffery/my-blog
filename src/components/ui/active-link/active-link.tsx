'use client'
import { ReactNode } from 'react'

import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import s from './active-link.module.scss'

type Props = {
  children?: ReactNode
  variant?: 'primary' | 'secondary'
} & LinkProps
export const ActiveLink = ({ children, variant = 'primary', ...rest }: Props) => {
  const { href } = rest
  const pathname = usePathname()

  const isActive = pathname.replaceAll('/', '') === href.toString().replaceAll('/', '')

  const classNames = { link: clsx(s.link, isActive && s.activeLink, s[variant]) }

  return (
    <Link {...rest} className={classNames.link}>
      {children}
    </Link>
  )
}
