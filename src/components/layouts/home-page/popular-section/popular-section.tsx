import { GetPostsResponse } from '@/app/api/posts/posts.types'
import { projectConstants } from '@/common/constants/projectConstants'
import { PostsCard } from '@/components/layouts/posts-card/posts-card'
import { Typography } from '@/components/ui/typography/typography'
import { createDatabaseClient } from '@/server/database-config'
import { mostViewsPosts } from '@/server/functions/database/posts/most-views-posts'
import clsx from 'clsx'
import { getLocale, getTranslations } from 'next-intl/server'

import s from './popular-section.module.scss'

export const PopularSection = async () => {
  const classNames = {
    postsContainer: clsx(s.postsContainer),
    section: clsx(s.section),
  }
  const t = await getTranslations('HomePage.PopularSection')
  const locale = await getLocale()

  const { databasesInstance } = await createDatabaseClient()
  const { documents } = (await mostViewsPosts({
    databasesInstance,
    limit: projectConstants.NumberPostsForPopularSection,
    locale,
    offset: 0,
  })) as GetPostsResponse

  return (
    <section className={classNames.section} id={'popular'}>
      <Typography.H3>{t('title2')}</Typography.H3>
      <div className={classNames.postsContainer}>
        {documents.map(doc => (
          <PostsCard key={doc.$id} postData={doc} />
        ))}
      </div>
    </section>
  )
}
