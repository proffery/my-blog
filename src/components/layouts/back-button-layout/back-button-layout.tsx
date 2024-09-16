'use client'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import { projectConstants } from '@/common/constants/project-constants'
import { useWidth } from '@/common/hooks/use-width'
import { Button } from '@/components/ui/button/button'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import s from './back-button-layout.module.scss'

export const BackButtonLayout = () => {
  const classNames = {
    button: clsx(s.button),
    container: clsx(s.container),
    icon: clsx(s.icon),
  }
  const router = useRouter()
  const width = useWidth()
  const t = useTranslations('Components')

  return (
    <div className={classNames.container}>
      <Typography.Link1
        as={Button}
        className={classNames.button}
        onClick={router.back}
        variant={'text'}
      >
        <RightBracketIcon className={classNames.icon} />
        {width >= projectConstants.mobileWidth && (
          <Typography.Caption>{t('BackButton.Back')}</Typography.Caption>
        )}
      </Typography.Link1>
    </div>
  )
}
