import type { Metadata } from 'next'

import { ReactNode } from 'react'

import { roboto, vollkorn } from '@/styles/fonts'
import clsx from 'clsx'
import { useLocale } from 'next-intl'

type Props = {
  children: ReactNode
}

export const metadata: Metadata = {
  description:
    'platform for street photography enthusiasts, featuring stunning images,' +
    ' tips, and stories that celebrate urban life and spontaneity.',
  title: 'STREET PHOTO WORLD',
}

export default function RootLayout({ children }: Props) {
  const classNames = {
    body: clsx(roboto.variable, vollkorn.variable),
  }
  const locale = useLocale()

  return (
    <html className={classNames.body} lang={locale}>
      <body>{children}</body>
    </html>
  )
}
