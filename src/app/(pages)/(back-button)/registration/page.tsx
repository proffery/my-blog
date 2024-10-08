import { routes } from '@/common/constants/routes'
import RegistrationPage from '@/components/layouts/registration-page/registration-page'
import { getLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'RegistrationPage' })

  return {
    alternates: { canonical: routes.registration },
    openGraph: {
      title: `${t('title')}`,
      url: process.env.NEXT_PUBLIC_HOST_BASE + routes.registration,
    },
    title: t('title'),
    twitter: {
      title: `${t('title')}`,
    },
  }
}

export default function Registration() {
  return <RegistrationPage />
}
