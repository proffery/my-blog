import { routes } from '@/common/constants/routes'
import CreatePostPage from '@/components/pages/create-post-page/create-post-page'
import { getLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'CreatePostPage' })

  return {
    alternates: { canonical: routes.createPost },
    openGraph: {
      title: `${t('title')}`,
      url: process.env.NEXT_PUBLIC_HOST_BASE + routes.createPost,
    },
    title: t('title'),
    twitter: {
      title: `${t('title')}`,
    },
  }
}

export default function CreatePost() {
  return <CreatePostPage />
}
