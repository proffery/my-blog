import { endpoints } from '@/common/constants/endpoints'
import { routes } from '@/common/constants/routes'
import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
import { getData } from '@/server/utils/get-data'
import { GetPostsListResponse } from '@/services/posts/posts.types'
import Link from 'next/link'

export default async function Posts() {
  const postsData = await getData<GetPostsListResponse, null>(endpoints.posts_get_all, {
    cache: 'no-store',
  })

  const posts = postsData?.documents

  return (
    <Page>
      <Typography.H1>Posts Page</Typography.H1>
      {posts?.map(post => (
        <Typography.Body1 as={Link} href={routes.posts + '/' + post.$id} key={post.$id}>
          {post.title}
        </Typography.Body1>
      ))}
    </Page>
  )
}
