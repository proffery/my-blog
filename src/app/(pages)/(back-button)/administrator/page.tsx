import { routes } from '@/common/constants/routes'
import AdministratorPage from '@/components/pages/administrator-page/administrator-page'
import { getLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'AdministratorPage' })

  return {
    alternates: { canonical: routes.administrator },
    openGraph: {
      title: `${t('title')}`,
      url: process.env.NEXT_PUBLIC_HOST_BASE + routes.administrator,
    },
    robots: {
      follow: true,
      index: false,
    },
    title: t('title'),
    twitter: {
      title: `${t('title')}`,
    },
  }
}

export default function Administrator() {
  return <AdministratorPage />
}
