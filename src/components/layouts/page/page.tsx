import { ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './page.module.scss'

type Props = ComponentPropsWithoutRef<'main'>

export const Page = ({ children, className, ...rest }: Props) => {
  const classNames = {
    main: clsx(s.main, className),
  }

  return (
    <main className={classNames.main} {...rest}>
      {children}
    </main>
  )
}
