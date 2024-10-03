import { GetPostsResponse } from '@/app/api/posts/posts.types'
import { constants } from '@/common/constants/constants'
import { LastPostCard } from '@/components/layouts/home-page/last-section/last-post-card/last-post-card'
import { OtherPostCard } from '@/components/layouts/home-page/last-section/other-posts-card/other-posts-card'
import { Typography } from '@/components/ui/typography/typography'
import { createDatabaseClient } from '@/server/database-config'
import { paginatedPosts } from '@/server/functions/database/posts/paginated-posts'
import clsx from 'clsx'
import { getLocale, getTranslations } from 'next-intl/server'

import s from './last-section.module.scss'

export const LastSection = async () => {
  const classNames = {
    otherPosts: clsx(s.otherPosts),
    postFive: clsx(s.postFive),
    postFour: clsx(s.postFour),
    postOne: clsx(s.postOne),
    postThree: clsx(s.postThree),
    postTwo: clsx(s.postTwo),
    postsContainer: clsx(s.postsContainer),
    section: clsx(s.section),
  }
  const t = await getTranslations('HomePage.LatestSection')
  const locale = await getLocale()

  const { databasesInstance } = await createDatabaseClient()
  const { documents } = (await paginatedPosts({
    databasesInstance,
    limit: constants.NumberPostsForLastSection,
    locale,
    offset: 0,
    sort: null,
    sortBy: null,
  })) as GetPostsResponse

  return (
    <section className={classNames.section} id={'last'}>
      <Typography.H3>{t('title')}</Typography.H3>
      <div className={classNames.postsContainer}>
        {documents[0] && <LastPostCard className={classNames.postOne} postData={documents[0]} />}
        {documents[1] && <OtherPostCard className={classNames.postTwo} postData={documents[1]} />}
        {documents[2] && <OtherPostCard className={classNames.postThree} postData={documents[2]} />}
        {documents[3] && <OtherPostCard className={classNames.postFour} postData={documents[3]} />}
        {documents[4] && <OtherPostCard className={classNames.postFive} postData={documents[4]} />}
      </div>
    </section>
  )
}
