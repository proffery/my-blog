import type { Metadata } from 'next'

import { ReactNode } from 'react'

import { inter, nunito } from '@/styles/fonts'
import clsx from 'clsx'

import '@/styles/index.scss'

export const metadata: Metadata = {
  description: 'Generated by create next app',
  title: 'Care Service',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const classNames = {
    body: clsx(nunito.variable, inter.variable),
  }

  return (
    <html className={classNames.body} lang={'ru'}>
      <body>
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  )
}
