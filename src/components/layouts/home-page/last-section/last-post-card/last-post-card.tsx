import { ComponentPropsWithoutRef } from 'react'

import { PostModel } from '@/app/api/posts/posts.types'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import { routes } from '@/common/constants/routes'
import { cleanFromHTML } from '@/common/utils/clean-from-html'
import { Card } from '@/components/ui/card/card'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import s from './last-post-card.module.scss'

type Props = {
  postData: PostModel
} & ComponentPropsWithoutRef<typeof Card>

export const LastPostCard = ({ className, postData, ...rest }: Props) => {
  const { $id, cover, post, title } = postData

  const classNames = {
    card: clsx(s.card, className),
    cover: clsx(s.cover),
    description: clsx(s.description),
    readMore: clsx(s.readMore),
    readMoreIcon: clsx(s.readMoreIcon),
  }

  return (
    <Card className={classNames.card} {...rest}>
      <Image alt={'Last post'} className={classNames.cover} height={400} src={cover} width={640} />
      <Typography.H4>{title}</Typography.H4>
      <Typography.Body1 className={classNames.description}>{cleanFromHTML(post)}</Typography.Body1>
      <Typography.Link1 as={Link} className={classNames.readMore} href={routes.post + $id}>
        Read more <RightBracketIcon className={classNames.readMoreIcon} />
      </Typography.Link1>
    </Card>
  )
}