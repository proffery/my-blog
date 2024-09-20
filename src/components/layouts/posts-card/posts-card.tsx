import { ComponentPropsWithoutRef } from 'react'

import { PostModel } from '@/app/api/posts/posts.types'
import defaultImage from '@/assets/images/no-image.svg'
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
  postData: PostModel
} & ComponentPropsWithoutRef<'div'>

export const PostsCard = ({ postData, ...rest }: Props) => {
  const { $createdAt, $id, authorId, authorName, className, cover, isPublished, post, title } =
    postData

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
  const dateTime = new Date($createdAt)

  return (
    <Card {...rest} className={classNames.card}>
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
          src={cover ? cover : defaultImage}
          width={380}
        />
      </div>
      <div className={classNames.contentWrapper}>
        <div className={classNames.titleWrapper}>
          <Typography.H5 as={Link} className={classNames.title} href={routes.post + $id}>
            {title}
          </Typography.H5>
          <Typography.Body1 className={classNames.description}>
            {cleanFromHTML(post)}
          </Typography.Body1>
        </div>

        <div className={classNames.bottomInfoWrapper}>
          <Typography.Subtitle2 as={'span'} className={classNames.author}>
            {t('PostCard.Author')}&nbsp;
            <Typography.Link2 as={Link} href={routes.account + '/' + authorId}>
              {authorName}
            </Typography.Link2>
          </Typography.Subtitle2>
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
