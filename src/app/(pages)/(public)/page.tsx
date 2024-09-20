import { LastSection } from '@/components/layouts/home-page/last-section/last-section'
import { PopularSection } from '@/components/layouts/home-page/popular-section/popular-section'
import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import s from './home-page.module.scss'

export default function Home() {
  const t = useTranslations('HomePage')
  const classNames = {
    page: clsx(s.page),
  }

  return (
    <Page className={classNames.page}>
      <div>
        <Typography.H1>{t('title1')}</Typography.H1>
        <Typography.Caption>{t('description')}</Typography.Caption>
      </div>
      <LastSection />
      <Typography.H1 as={'h2'}>{t('title2')}</Typography.H1>
      <PopularSection />
    </Page>
  )
}
