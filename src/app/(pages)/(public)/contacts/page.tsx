import { routes } from '@/common/constants/routes'
import ContactsPage from '@/components/layouts/contacts-page/contacts-page'
import { getLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'ContactsPage' })

  return {
    alternates: { canonical: routes.contacts },
    description: t('description'),
    openGraph: {
      description: t('description'),
      title: `${t('title')}`,
      url: process.env.NEXT_PUBLIC_HOST_BASE + routes.contacts,
    },
    title: t('title'),
    twitter: {
      description: t('description'),
      title: `${t('title')}`,
    },
  }
}

export default function Contacts() {
  return <ContactsPage />
}
