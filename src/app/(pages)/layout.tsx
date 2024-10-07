import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import { Providers } from '@/app/providers'
import { Footer } from '@/components/layouts/footer/footer'
import Header from '@/components/layouts/header/header'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import '@/styles/index.scss'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  children: ReactNode
}

export default async function PagesLayout({ children }: Props) {
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <Header />
        {children}
        <Footer />
        <ToastContainer
          autoClose={5000}
          closeOnClick
          draggable
          hideProgressBar={false}
          newestOnTop={false}
          pauseOnFocusLoss
          pauseOnHover
          position={'bottom-right'}
          rtl={false}
          theme={'light'}
        />
      </Providers>
    </NextIntlClientProvider>
  )
}
