import { ReactNode } from 'react'

import { routes } from '@/common/constants/routes'
import { roboto, vollkorn } from '@/styles/fonts'
import clsx from 'clsx'
import { useLocale } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'

type Props = {
  children: ReactNode
}

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    alternates: { canonical: routes.base },
    applicationName: t('applicationName'),
    description: t('description'),
    keywords: t('applicationName').replaceAll(' ', ','),
    metadataBase: new URL(process.env.NEXT_PUBLIC_HOST_BASE ?? `http://localhost:3000`),
    openGraph: {
      description: t('description'),
      locale,
      siteName: `${t('applicationName')}`,
      title: `${t('title')}`,
      type: 'website',
      url: process.env.NEXT_PUBLIC_HOST_BASE,
    },
    title: { default: `${t('title')}`, template: `%s | ${t('title')}` },
    twitter: {
      card: 'summary_large_image',
      description: t('description'),
      title: `${t('title')}`,
    },
  }
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
