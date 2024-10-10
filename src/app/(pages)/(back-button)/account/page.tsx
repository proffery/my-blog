import { routes } from '@/common/constants/routes'
import MyAccountPage from '@/components/pages/my-account-page/my-account-page'
import { getLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'MyAccountPage' })

  return {
    alternates: { canonical: routes.account },
    openGraph: {
      title: `${t('title')}`,
      url: process.env.NEXT_PUBLIC_HOST_BASE + routes.account,
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

export default function MyAccount() {
  return <MyAccountPage />
}
