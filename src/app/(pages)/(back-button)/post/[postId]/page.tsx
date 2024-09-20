import { PostModel } from '@/app/api/posts/posts.types'
import { routes } from '@/common/constants/routes'
import { Page } from '@/components/layouts/page/page'
import { Button } from '@/components/ui/button/button'
import { TextEditor } from '@/components/ui/text-editor/text-editor'
import { Typography } from '@/components/ui/typography/typography'
import { createDatabaseClient } from '@/server/database-config'
import { allPosts } from '@/server/functions/database/posts/all-posts'
import { postById } from '@/server/functions/database/posts/post-by-id'
import { updatePostViews } from '@/server/functions/database/posts/update-post-views'
import clsx from 'clsx'
import { jwtDecode } from 'jwt-decode'
import { Edit3, Eye } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getFormatter, getLocale, getTranslations } from 'next-intl/server'

import s from './post-by-id.module.scss'

type Props = {
  params: {
    postId: string
  }
}

export const dynamicParams = true

export const generateStaticParams = async () => {
  const { databasesInstance } = await createDatabaseClient()
  const postsData = await allPosts({ databasesInstance })

  return postsData.documents?.map(post => ({
    postId: post.$id,
  })) as any[]
}

export default async function Post({ params: { postId } }: Props) {
  const classNames = {
    cover: clsx(s.cover),
    description: clsx(s.description),
    descriptionWrapper: clsx(s.descriptionWrapper),
    title: clsx(s.title),
    viewsWrapper: clsx(s.viewsWrapper),
  }

  const { databasesInstance } = await createDatabaseClient()
  let postData

  try {
    postData = (await postById({ databasesInstance, postId })) as PostModel
  } catch (error) {
    redirect(routes.base)
  }

  if (postData.views) {
    await updatePostViews({ databasesInstance, postId, views: postData.views + 1 })
  }
  const token = cookies().get(`${process.env.NEXT_PUBLIC_SESSION_NAME}`)

  let userId = ''

  const t = await getTranslations('PostPage')
  const locale = await getLocale()
  const format = await getFormatter()

  const formatDateHandler = (postDate: string) => {
    const dateTime = new Date(postDate)

    return format.dateTime(dateTime, {
      day: 'numeric', // Day of the month
      hour: '2-digit', // Two-digit hour
      hour12: locale !== 'ru', // 24-hour format
      minute: '2-digit', // Two-digit minute
      month: 'short', // Full month [name]
      second: '2-digit', // Two-digit second
      year: 'numeric', // Full year
    })
  }

  if (token) {
    userId = jwtDecode<{ id: string; secret: string }>(token.value + '.' + token.value).id
  }

  return (
    <Page>
      <Typography.H1 className={classNames.title}>{postData?.title}</Typography.H1>
      {postData?.cover && (
        <Image
          alt={'Post cover'}
          className={classNames.cover}
          height={900}
          src={postData.cover}
          width={900}
        />
      )}
      <TextEditor defaultValue={postData?.post} isEditable={false} />
      <div className={classNames.descriptionWrapper}>
        <Typography.Subtitle2>
          {t('Author')}&nbsp;
          <Typography.Link2 as={Link} href={routes.account + '/' + postData.authorId}>
            {postData.authorName}
          </Typography.Link2>
        </Typography.Subtitle2>
        <div className={classNames.description}>
          <Typography.Subtitle2>
            {t('Created')}&nbsp;
            <Typography.Body2 as={'span'}>
              {formatDateHandler(postData.$createdAt)}
              {postData.$updatedAt !== postData.$createdAt
                ? ` (${t('Updated')} ${formatDateHandler(postData.$updatedAt)})`
                : ''}
            </Typography.Body2>
          </Typography.Subtitle2>
          <Typography.Caption as={'div'} className={classNames.viewsWrapper}>
            <Eye />
            &nbsp;
            {postData.views}
          </Typography.Caption>
          {userId === postData.authorId && (
            <Button
              as={Link}
              href={routes.updatePost + postData.$id}
              padding={false}
              title={t('EditButton.title')}
            >
              <Edit3 />
            </Button>
          )}
        </div>
      </div>
    </Page>
  )
}
