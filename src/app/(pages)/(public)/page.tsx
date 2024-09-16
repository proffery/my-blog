import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('HomePage')

  return (
    <Page>
      <Typography.H1>HomePage</Typography.H1>

      <Typography.H2>{t('test')}</Typography.H2>
    </Page>
  )
}
