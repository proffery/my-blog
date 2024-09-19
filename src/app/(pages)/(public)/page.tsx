import { LastSection } from '@/components/layouts/home-page/last-section/last-section'
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
        <Typography.H1 as={'h2'}>Stay inspired with</Typography.H1>
        <Typography.H1>Street Photo World articles</Typography.H1>
      </div>
      <Typography.Body1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography.Body1>
      <LastSection />
    </Page>
  )
}
