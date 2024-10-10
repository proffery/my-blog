import { routes } from '@/common/constants/routes'
import LoginPage from '@/components/pages/login-page/login-page'
import { getLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'LoginPage' })

  return {
    alternates: { canonical: routes.login },
    openGraph: {
      title: `${t('title')}`,
      url: process.env.NEXT_PUBLIC_HOST_BASE + routes.login,
    },
    title: t('title'),
    twitter: {
      title: `${t('title')}`,
    },
  }
}

export default function Login() {
  return <LoginPage />
}
