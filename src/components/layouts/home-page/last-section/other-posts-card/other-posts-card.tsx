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

  return (
    <Card className={classNames.card} {...rest}>
      <div className={classNames.coverWrapper}>
        <Image
          alt={'Last post'}
          className={classNames.cover}
          height={120}
          src={cover ? cover : defaultImage}
          width={120}
        />
      </div>
      <div className={classNames.content}>
        <div>
          <Typography.H5>{title}</Typography.H5>
          <Typography.Body1 className={classNames.description}>
            {cleanFromHTML(post)}
          </Typography.Body1>
        </div>
        <Typography.Link1 as={Link} className={classNames.readMore} href={routes.post + $id}>
          Read more <RightBracketIcon className={classNames.readMoreIcon} />
        </Typography.Link1>
      </div>
    </Card>
  )
}
