import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'

import s from './profile-not-found.module.scss'

export default function ProfileNotFound() {
  const classNames = {
    page: clsx(s.page),
  }

  return (
    <Page className={classNames.page}>
      <Typography.H1>Профиль не найден...</Typography.H1>
      <Typography.H4>Такого автора не существует, или он был удален</Typography.H4>
    </Page>
  )
}
