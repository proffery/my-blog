import { ComponentPropsWithoutRef } from 'react'

import { routes } from '@/common/constants/routes'
import { cleanFromHTML } from '@/common/utils/clean-from-html'
import { Card } from '@/components/ui/card/card'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useFormatter, useTranslations } from 'next-intl'

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
  const t = useTranslations('Components')
  const format = useFormatter()
  const dateTime = new Date(date)

  return (
    <Card className={classNames.card}>
      <div className={classNames.cardImageContainer}>
        {!isPublished && (
          <Typography.H5 as={'span'} className={classNames.notPublishedDescription}>
            {t('PostCard.Moderation')}
          </Typography.H5>
        )}
        <Image
          alt={'Card cover'}
          className={classNames.cardImage}
          height={380}
          src={imageUrl ? imageUrl : '/images/no-image.svg'}
          width={380}
        />
      </div>
      <div className={classNames.contentWrapper}>
        <div className={classNames.titleWrapper}>
          <Typography.H5 as={Link} className={classNames.title} href={routes.post + postId}>
            {title}
          </Typography.H5>
          <Typography.Body1 className={classNames.description}>
            {cleanFromHTML(description)}
          </Typography.Body1>
        </div>

        <div className={classNames.bottomInfoWrapper}>
          <Typography.Body2 as={'span'} className={classNames.author}>
            {t('PostCard.Author')}&nbsp;
            <Typography.Link2 as={Link} href={routes.account + '/' + authorId}>
              {authorName}
            </Typography.Link2>
          </Typography.Body2>
          <Typography.Body2 className={classNames.date}>
            {format.dateTime(dateTime, {
              day: 'numeric',
              month: 'short',
              weekday: 'short',
              year: 'numeric',
            })}
          </Typography.Body2>
        </div>
      </div>
    </Card>
  )
}
