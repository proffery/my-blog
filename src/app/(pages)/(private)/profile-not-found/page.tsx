import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import s from './profile-not-found.module.scss'

export default function ProfileNotFound() {
  const classNames = {
    page: clsx(s.page),
  }
  const t = useTranslations('ProfileNotFoundPage')

  return (
    <Page className={classNames.page}>
      <Typography.H1>{t('title')}</Typography.H1>
      <Typography.H4>{t('description')}</Typography.H4>
    </Page>
  )
}
