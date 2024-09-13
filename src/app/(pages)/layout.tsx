import { ReactNode } from 'react'

import { Footer } from '@/components/layouts/footer/footer'
import Header from '@/components/layouts/header/header'
import { Analytics } from '@vercel/analytics/react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import '@/styles/index.scss'

type Props = {
  children: ReactNode
}

export default async function PagesLayout({ children }: Props) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      {children}
      <Footer />
      <Analytics />
    </NextIntlClientProvider>
  )
}
