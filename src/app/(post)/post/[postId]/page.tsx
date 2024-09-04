import { routes } from '@/common/constants/routes'
import { dateFullToLocalRu } from '@/common/utils/date-full-to-local-ru'
import { dateShortToLocalRu } from '@/common/utils/date-short-to-local-ru'
import { Page } from '@/components/layouts/page/page'
import { Button } from '@/components/ui/button/button'
import { TextEditor } from '@/components/ui/text-editor/text-editor'
import { Typography } from '@/components/ui/typography/typography'
import { createDatabaseClient } from '@/server/database-config'
import { notPublishedPosts } from '@/server/functions/database/posts/not-published-posts'
import { postById } from '@/server/functions/database/posts/post-by-id'
import clsx from 'clsx'
import { jwtDecode } from 'jwt-decode'
import { Edit3 } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

import s from './post-by-id.module.scss'

type Props = {
  params: {
    postId: string
  }
}

export const dynamicParams = true

export const generateStaticParams = async () => {
  const { databasesInstance } = await createDatabaseClient()
  const postsData = await notPublishedPosts({ databasesInstance })

  return postsData.documents?.map(post => ({
    postId: post.$id,
  })) as any[]
}

export default async function Post({ params: { postId } }: Props) {
  const classNames = {
    description: clsx(s.description),
    descriptionWrapper: clsx(s.descriptionWrapper),
  }
  const { databasesInstance } = await createDatabaseClient()

  const postData = await postById({ databasesInstance, postId })
  const token = cookies().get(`${process.env.NEXT_PUBLIC_SESSION_NAME}`)

  let userId = ''

  if (token) {
    userId = jwtDecode<{ id: string; secret: string }>(token.value + '.' + token.value).id
  }

  return (
    <Page>
      <Typography.H1>{postData?.title}</Typography.H1>
      <TextEditor defaultValue={postData?.post} isEditable={false} />
      <div className={classNames.descriptionWrapper}>
        <Typography.Subtitle2>
          Автор:&nbsp;
          <Typography.Link2 as={Link} href={routes.account + '/' + postData.authorId}>
            {postData.authorName}
          </Typography.Link2>
        </Typography.Subtitle2>
        <div className={classNames.description}>
          <Typography.Subtitle2>
            Написан:&nbsp;
            <Typography.Body2 as={'span'}>
              {dateFullToLocalRu(postData.$createdAt)}
              {postData.$updatedAt !== postData.$createdAt
                ? ` (изменен: ${dateFullToLocalRu(postData.$updatedAt)})`
                : ''}
            </Typography.Body2>
          </Typography.Subtitle2>
          {userId === postData.authorId && (
            <Button
              as={Link}
              href={routes.updatePost + postData.$id}
              padding={false}
              title={'Редактировать'}
            >
              <Edit3 />
            </Button>
          )}
        </div>
      </div>
    </Page>
  )
}
