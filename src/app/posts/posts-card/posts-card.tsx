import { ComponentPropsWithoutRef } from 'react'

import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import cover from '@/assets/images/no-image.svg'
import { routes } from '@/common/constants/routes'
import { cleanFromHTML } from '@/common/utils/clean-from-html'
import { Button } from '@/components/ui/button/button'
import { Card } from '@/components/ui/card/card'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import s from './posts-card.module.scss'

type Props = {
  date: string
  description: string
  image?: string
  postId: string
  title: string
} & ComponentPropsWithoutRef<'div'>

export const PostsCard = ({ className, date, description, image, postId, title }: Props) => {
  const classNames = {
    card: clsx(s.card, className),
    contentWrapper: clsx(s.contentWrapper),
    description: clsx(s.description),
    image: clsx(s.image),
    readButton: clsx(s.read),
    readIcon: clsx(s.readIcon),
    title: clsx(s.title),
    titleWrapper: clsx(s.titleWrapper),
  }

  return (
    <Card className={classNames.card}>
      <Image
        alt={'Card cover'}
        className={classNames.image}
        src={image ? image : cover}
        style={{ height: 'auto', width: '100%' }}
      />
      <div className={classNames.contentWrapper}>
        <div className={classNames.titleWrapper}>
          <Typography.H5 as={'h2'} className={classNames.title}>
            {title}
          </Typography.H5>
          <Typography.Body1 className={classNames.description}>
            {cleanFromHTML(description)}
          </Typography.Body1>
        </div>
        <Button
          as={Link}
          className={classNames.readButton}
          href={routes.post + '/' + postId}
          variant={'text'}
        >
          <Typography.Body2>Читать больше</Typography.Body2>{' '}
          <RightBracketIcon className={classNames.readIcon} />
        </Button>
      </div>
    </Card>
  )
}
