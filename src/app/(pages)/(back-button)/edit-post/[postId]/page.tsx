import { routes } from '@/common/constants/routes'
import EditPostPage from '@/components/pages/edit-post-page/edit-post-page'
import { getLocale, getTranslations } from 'next-intl/server'

type Props = {
  params: { postId: string }
}

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'UpdatePostPage' })

  return {
    alternates: { canonical: routes.updatePost },
    openGraph: {
      title: `${t('title')}`,
      url: process.env.NEXT_PUBLIC_HOST_BASE + routes.updatePost,
    },
    title: t('title'),
    twitter: {
      title: `${t('title')}`,
    },
  }
}

export default function EditPost({ params }: Props) {
  return <EditPostPage params={params} />
}
