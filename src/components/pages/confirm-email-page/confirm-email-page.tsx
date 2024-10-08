'use client'
import { useEffect } from 'react'

import { VerifyEmailRequest } from '@/app/api/auth/auth.types'
import { ConfirmEmailIcon } from '@/assets/icons/components/confirm-email-icon'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import withSuspense from '@/common/hocs/with-suspense'
import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
import { useMeQuery, useVerifyEmailMutation } from '@/services/auth/auth.service'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import s from './confirm-email.module.scss'

function ConfirmEmailPage() {
  const classNames = {
    confirmIcon: clsx(s.confirmIcon),
    container: clsx(s.container),
    page: clsx(s.page),
  }
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const secret = searchParams.get('secret')
  const router = useRouter()
  const [verifyEmail] = useVerifyEmailMutation()
  const { data: meData } = useMeQuery()
  const t = useTranslations('ConfirmEmailPage')

  async function verifyEmailHandler(data: VerifyEmailRequest) {
    try {
      await verifyEmail(data).unwrap()
      router.push(routes.account)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    secret && userId && verifyEmailHandler({ secret, userId })
  }, [secret, userId])

  useEffect(() => {
    if (meData?.user?.emailVerification) {
      router.push(routes.account)
    }
  }, [meData, router])

  return (
    <Page className={classNames.page}>
      <div className={classNames.container}>
        <Typography.H1>{t('title')}</Typography.H1>
        <Typography.Body1>{`${t('description1')} ${meData?.user?.email ?? ''}${t(
          'description2'
        )}`}</Typography.Body1>
      </div>
      <ConfirmEmailIcon className={classNames.confirmIcon} />
    </Page>
  )
}

export default withSuspense(withRedux(ConfirmEmailPage))
