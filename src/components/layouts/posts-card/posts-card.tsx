import { ComponentPropsWithoutRef } from 'react'

import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import cover from '@/assets/images/no-image.svg'
import { routes } from '@/common/constants/routes'
import { cleanFromHTML } from '@/common/utils/clean-from-html'
import { dateIsoToLocalRu } from '@/common/utils/date-iso-to-local-ru'
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
    bottomInfoWrapper: clsx(s.bottomInfoWrapper),
    card: clsx(s.card, className),
    cardImage: clsx(s.cardImage),
    contentWrapper: clsx(s.contentWrapper),
    description: clsx(s.description),
    readButton: clsx(s.read),
    readIcon: clsx(s.readIcon),
    title: clsx(s.title),
    titleWrapper: clsx(s.titleWrapper),
  }

  return (
    <Card className={classNames.card}>
      <Image
        alt={'Card cover'}
        className={classNames.cardImage}
        height={400}
        src={image ? image : cover}
        style={{
          height: 'auto',
          objectFit: 'cover',
          objectPosition: 'center',
          width: '100%',
        }}
        width={400}
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
        <div className={classNames.bottomInfoWrapper}>
          <Button
            as={Link}
            className={classNames.readButton}
            href={routes.post + '/' + postId}
            variant={'text'}
          >
            <Typography.Subtitle2>Читать</Typography.Subtitle2>{' '}
            <RightBracketIcon className={classNames.readIcon} />
          </Button>
          <Typography.Body2>{dateIsoToLocalRu(date)}</Typography.Body2>
        </div>
      </div>
    </Card>
  )
}
