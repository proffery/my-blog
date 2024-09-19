import { GetPostsResponse } from '@/app/api/posts/posts.types'
import { projectConstants } from '@/common/constants/projectConstants'
import { LastPostCard } from '@/components/layouts/home-page/last-section/last-post-card/last-post-card'
import { OtherPostCard } from '@/components/layouts/home-page/last-section/other-posts-card/other-posts-card'
import { Typography } from '@/components/ui/typography/typography'
import { createDatabaseClient } from '@/server/database-config'
import { paginatedPostsByCreate } from '@/server/functions/database/posts/paginated-posts-by-create'
import clsx from 'clsx'
import { getLocale } from 'next-intl/server'

import s from './last-section.module.scss'

export const LastSection = async () => {
  const classNames = {
    otherPosts: clsx(s.otherPosts),
    postFour: clsx(s.postFour),
    postOne: clsx(s.postOne),
    postThree: clsx(s.postThree),
    postTwo: clsx(s.postTwo),
    postsContainer: clsx(s.postsContainer),
    section: clsx(s.section),
  }
  const { databasesInstance } = await createDatabaseClient()
  const locale = await getLocale()
  const { documents } = (await paginatedPostsByCreate({
    databasesInstance,
    limit: projectConstants.NumberPostsForLastSection,
    locale,
    offset: 0,
    sort: null,
  })) as GetPostsResponse

  return (
    <section className={classNames.section} id={'last'}>
      <Typography.H5 as={'h3'}>Latest blog posts</Typography.H5>
      <div className={classNames.postsContainer}>
        {documents[0] && <LastPostCard className={classNames.postOne} postData={documents[0]} />}
        {documents[1] && <OtherPostCard className={classNames.postTwo} postData={documents[1]} />}
        {documents[2] && <OtherPostCard className={classNames.postThree} postData={documents[2]} />}
        {documents[3] && <OtherPostCard className={classNames.postFour} postData={documents[3]} />}
      </div>
    </section>
  )
}
