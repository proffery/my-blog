import { routes } from '@/common/constants/routes'
import ConfirmEmailPage from '@/components/pages/confirm-email-page/confirm-email-page'
import { getLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'ConfirmEmailPage' })

  return {
    alternates: { canonical: routes.confirmEmail },
    openGraph: {
      title: `${t('title')}`,
      url: process.env.NEXT_PUBLIC_HOST_BASE + routes.confirmEmail,
    },
    title: t('title'),
    twitter: {
      title: `${t('title')}`,
    },
  }
}

export default function ConfirmEmail() {
  return <ConfirmEmailPage />
}
