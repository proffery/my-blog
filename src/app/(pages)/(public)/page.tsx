import popularTitleImage from '@/assets/images/home-page/popular.webp'
import { routes } from '@/common/constants/routes'
import { LastSection } from '@/components/layouts/home-page/last-section/last-section'
import { PopularSection } from '@/components/layouts/home-page/popular-section/popular-section'
import { Page } from '@/components/layouts/page/page'
import { Button } from '@/components/ui/button/button'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import s from './home-page.module.scss'

export default function Home() {
  const t = useTranslations('HomePage')
  const classNames = {
    page: clsx(s.page),
    titleWithBackground: clsx(s.titleWithBackground),
    titleWithBackgroundButton: clsx(s.titleWithBackgroundButton),
    titleWithBackgroundImage: clsx(s.titleWithBackgroundImage),
    titleWithBackgroundWrapper: clsx(s.titleWithBackgroundWrapper),
  }

  return (
    <Page className={classNames.page}>
      <div>
        <Typography.H1>{t('title')}</Typography.H1>
        <Typography.Caption>{t('description')}</Typography.Caption>
      </div>
      <LastSection />
      <div className={classNames.titleWithBackgroundWrapper}>
        <Typography.H1 as={'h2'} className={classNames.titleWithBackground}>
          {t('PopularSection.title1')}
        </Typography.H1>
        <Button
          as={Link}
          className={classNames.titleWithBackgroundButton}
          href={routes.posts + '/?sortBy=views'}
        >
          {t('PopularSection.button')}
        </Button>
        <Image
          alt={'Popular posts background'}
          className={classNames.titleWithBackgroundImage}
          height={250}
          src={popularTitleImage}
          width={1248}
        />
      </div>
      <PopularSection />
    </Page>
  )
}
