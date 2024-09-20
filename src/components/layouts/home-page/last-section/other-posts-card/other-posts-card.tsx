import { ComponentPropsWithoutRef } from 'react'

import { PostModel } from '@/app/api/posts/posts.types'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import defaultImage from '@/assets/images/no-image.svg'
import { routes } from '@/common/constants/routes'
import { cleanFromHTML } from '@/common/utils/clean-from-html'
import { Card } from '@/components/ui/card/card'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import s from './other-posts-card.module.scss'

type Props = {
  postData: PostModel
} & ComponentPropsWithoutRef<typeof Card>

export const OtherPostCard = ({ className, postData, ...rest }: Props) => {
  const { $id, cover, post, title } = postData

  const classNames = {
    card: clsx(s.card, className),
    content: clsx(s.content),
    cover: clsx(s.cover),
    coverWrapper: clsx(s.coverWrapper),
    description: clsx(s.description),
    readMore: clsx(s.readMore),
    readMoreIcon: clsx(s.readMoreIcon),
  }

  const t = useTranslations('HomePage.LatestSection.Card')

  return (
    <Card className={classNames.card} {...rest}>
      <div className={classNames.coverWrapper}>
        <Image
          alt={'Last post'}
          className={classNames.cover}
          height={150}
          src={cover ? cover : defaultImage}
          width={150}
        />
      </div>
      <div className={classNames.content}>
        <div>
          <Typography.H5>{title}</Typography.H5>
          <Typography.Body1 className={classNames.description}>
            {cleanFromHTML(post)}
          </Typography.Body1>
        </div>
        <Typography.Subtitle2 as={Link} className={classNames.readMore} href={routes.post + $id}>
          {t('ReadMore')}
          <RightBracketIcon className={classNames.readMoreIcon} />
        </Typography.Subtitle2>
      </div>
    </Card>
  )
}
