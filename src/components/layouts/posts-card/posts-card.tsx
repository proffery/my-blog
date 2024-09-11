import { ComponentPropsWithoutRef } from 'react'

import { routes } from '@/common/constants/routes'
import { cleanFromHTML } from '@/common/utils/clean-from-html'
import { dateShortToLocalRu } from '@/common/utils/date-short-to-local-ru'
import { Card } from '@/components/ui/card/card'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import Link from 'next/link'

import s from './posts-card.module.scss'

type Props = {
  authorId: string
  authorName: string
  date: string
  description: string
  imageUrl: string
  isPublished: boolean
  postId: string
  title: string
} & ComponentPropsWithoutRef<'div'>

export const PostsCard = ({
  authorId,
  authorName,
  className,
  date,
  description,
  imageUrl,
  isPublished,
  postId,
  title,
}: Props) => {
  const classNames = {
    author: clsx(s.author),
    bottomInfoWrapper: clsx(s.bottomInfoWrapper),
    card: clsx(s.card, !isPublished && s.notPublished, className),
    cardImage: clsx(s.cardImage),
    cardImageContainer: clsx(s.cardImageContainer),
    contentWrapper: clsx(s.contentWrapper),
    date: clsx(s.date),
    description: clsx(s.description),
    notPublishedDescription: clsx(s.notPublishedDescription),
    title: clsx(s.title),
    titleWrapper: clsx(s.titleWrapper),
  }

  return (
    <Card className={classNames.card}>
      <div className={classNames.cardImageContainer}>
        {!isPublished && (
          <Typography.H5 as={'span'} className={classNames.notPublishedDescription}>
            Ожидает модерации
          </Typography.H5>
        )}
        <img
          alt={'Card cover'}
          className={classNames.cardImage}
          src={imageUrl ? imageUrl : '/images/no-image.svg'}
        />
      </div>
      <div className={classNames.contentWrapper}>
        <div className={classNames.titleWrapper}>
          <Typography.H5 as={Link} className={classNames.title} href={routes.post + '/' + postId}>
            {title}
          </Typography.H5>
          <Typography.Body1 className={classNames.description}>
            {cleanFromHTML(description)}
          </Typography.Body1>
        </div>

        <div className={classNames.bottomInfoWrapper}>
          <Typography.Body2 as={'span'} className={classNames.author}>
            Автор:&nbsp;
            <Typography.Link2 as={Link} href={routes.account + '/' + authorId}>
              {authorName}
            </Typography.Link2>
          </Typography.Body2>
          <Typography.Body2 className={classNames.date}>
            {dateShortToLocalRu(date)}
          </Typography.Body2>
        </div>
      </div>
    </Card>
  )
}
