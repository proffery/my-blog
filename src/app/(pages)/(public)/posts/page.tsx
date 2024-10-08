import { routes } from '@/common/constants/routes'
import PostsPage from '@/components/layouts/posts-page/page'
import { getLocale, getTranslations } from 'next-intl/server'

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'PostsPage' })

  return {
    alternates: { canonical: routes.posts },
    description: t('description'),
    openGraph: {
      description: t('description'),
      title: `${t('title')}`,
      url: process.env.NEXT_PUBLIC_HOST_BASE + routes.posts,
    },
    title: t('title'),
    twitter: {
      description: t('description'),
      title: `${t('title')}`,
    },
  }
}

export default function Posts() {
  return <PostsPage />
}
