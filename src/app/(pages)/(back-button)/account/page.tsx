import { routes } from '@/common/constants/routes'
import AccountPage from '@/components/layouts/account-page/page'
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
    title: t('title'),
    twitter: {
      title: `${t('title')}`,
    },
  }
}

export default function Account() {
  return <AccountPage />
}
