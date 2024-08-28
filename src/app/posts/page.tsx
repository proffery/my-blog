'use client'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
import { useGetPostsQuery } from '@/services/posts/posts.service'
import Link from 'next/link'

function Posts() {
  const { data: postsData } = useGetPostsQuery({})
  const posts = postsData?.documents

  return (
    <Page>
      <Typography.H1>Posts Page</Typography.H1>
      {posts?.map(post => (
        <Typography.Body1 as={Link} href={routes.post + '/' + post.$id} key={post.$id}>
          {post.title}
        </Typography.Body1>
      ))}
    </Page>
  )
}

export default withRedux(Posts)
