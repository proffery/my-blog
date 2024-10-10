import { routes } from '@/common/constants/routes'
import ModeratorPage from '@/components/pages/moderator-page/moderator-page'
import { getLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'ModerationPage' })

  return {
    alternates: { canonical: routes.moderator },
    openGraph: {
      title: `${t('title')}`,
      url: process.env.NEXT_PUBLIC_HOST_BASE + routes.moderator,
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

export default function Moderator() {
  return <ModeratorPage />
}
