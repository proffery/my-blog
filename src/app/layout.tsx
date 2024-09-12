import type { Metadata } from 'next'

import { ReactNode } from 'react'

import { Footer } from '@/components/layouts/footer/footer'
import Header from '@/components/layouts/header/header'
import { roboto, vollkorn } from '@/styles/fonts'
import { Analytics } from '@vercel/analytics/react'
import clsx from 'clsx'
import { NextIntlClientProvider, useLocale } from 'next-intl'
import { getMessages } from 'next-intl/server'

import '@/styles/index.scss'

export const metadata: Metadata = {
  description: 'Next app',
  title: 'Blog App',
}
type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  const classNames = {
    body: clsx(roboto.variable, vollkorn.variable),
  }

  const locale = useLocale()
  let messages

  getMessages().then(res => (messages = res.messages))

  return (
    <html className={classNames.body} lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
