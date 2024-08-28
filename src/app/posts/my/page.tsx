'use client'
import { useState } from 'react'

import { SortDirection } from '@/app/api/posts/route'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { Page } from '@/components/layouts/page/page'
import { Button } from '@/components/ui/button/button'
import { Typography } from '@/components/ui/typography/typography'
import { useMeQuery } from '@/services/auth/auth.service'
import { useGetPostsQuery } from '@/services/posts/posts.service'
import clsx from 'clsx'
import Link from 'next/link'

import s from './my-posts.module.scss'

function MyPosts() {
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const classNames = {
    sortIcon: clsx(s.sortIcon, sortDirection === 'desc' ? s.sortIconDesc : s.sortIconAsc),
  }

  const { data: meData } = useMeQuery()
  const { data: postsData } = useGetPostsQuery({
    authorId: meData?.user?.$id ?? '',
    sortDirection,
  })

  const posts = postsData?.documents

  const sortChangeHandler = () => {
    sortDirection === 'desc' ? setSortDirection('asc') : setSortDirection('desc')
  }

  return (
    <Page>
      <Typography.H1>My Posts Page</Typography.H1>
      <div>
        <Button onClick={sortChangeHandler}>
          Сортировать <RightBracketIcon className={classNames.sortIcon} />
        </Button>
      </div>
      {posts?.length === 0 && <Typography.Caption>У вас пока нет постов</Typography.Caption>}
      {posts?.map(post => (
        <Typography.Body1 as={Link} href={routes.post + '/' + post.$id} key={post.$id}>
          {post.title}
        </Typography.Body1>
      ))}
    </Page>
  )
}

export default withRedux(MyPosts)
