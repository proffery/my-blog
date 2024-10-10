import headerTitleImage from '@/assets/images/home-page/header.webp'
import popularTitleImage from '@/assets/images/home-page/popular.webp'
import { constants } from '@/common/constants/constants'
import { routes } from '@/common/constants/routes'
import { Page } from '@/components/layouts/page/page'
import { TitleWithBackground } from '@/components/layouts/title-with-background/title-with-background'
import { LastSection } from '@/components/pages/home-page/last-section/last-section'
import { PopularSection } from '@/components/pages/home-page/popular-section/popular-section'
import { Button } from '@/components/ui/button/button'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import s from './home-page.module.scss'

export default function Home() {
  const t = useTranslations('HomePage')
  const classNames = {
    page: clsx(s.page),
    titleWithBackground: clsx(s.titleWithBackground),
    titleWithBackgroundButton: clsx(s.titleWithBackgroundButton),
  }

  return (
    <Page className={classNames.page}>
      <TitleWithBackground
        height={250}
        imageAlt={'Title background'}
        position={'flex-start'}
        src={headerTitleImage}
        width={constants.maxContentWidth}
      >
        <Typography.H1>{t('title')}</Typography.H1>
        <Typography.Caption style={{ fontWeight: 'var(--font-weight-bold)' }}>
          {t('description')}
        </Typography.Caption>
      </TitleWithBackground>
      <LastSection />
      <TitleWithBackground
        height={250}
        imageAlt={'Popular posts background'}
        src={popularTitleImage}
        width={constants.maxContentWidth}
      >
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
      </TitleWithBackground>
      <PopularSection />
    </Page>
  )
}
