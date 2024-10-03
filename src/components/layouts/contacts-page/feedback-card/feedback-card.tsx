import { FeedbackModel } from '@/app/api/feedbacks/feedbacks.types'
import { routes } from '@/common/constants/routes'
import { Card } from '@/components/ui/card/card'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import Link from 'next/link'

import s from './feedback-card.module.scss'

type Props = {
  feedbackData: FeedbackModel
}

export const FeedbackCard = ({ feedbackData: { authorId, message, name } }: Props) => {
  const classNames = {
    card: clsx(s.card),
    feedback: clsx(s.feedback),
  }

  return (
    <Card className={classNames.card}>
      <Typography.Subtitle1 as={'p'} className={classNames.feedback}>
        {message}
      </Typography.Subtitle1>
      {authorId ? (
        <Typography.Subtitle2 as={Link} href={routes.account + '/' + authorId}>
          {name}
        </Typography.Subtitle2>
      ) : (
        <Typography.Subtitle2>{name}</Typography.Subtitle2>
      )}
    </Card>
  )
}
