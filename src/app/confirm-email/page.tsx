'use client'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { ConfirmEmailIcon } from '@/assets/icons/components/confirm-email-icon'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import withSuspense from '@/common/hocs/with-suspense'
import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
import { useMeQuery, useVerifyEmailMutation } from '@/services/auth/auth.service'
import { VerifyEmailRequest } from '@/services/auth/auth.types'
import { selectUserIsAuthenticated } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { redirect, useSearchParams } from 'next/navigation'

import s from './confirm-email.module.scss'

function ConfirmEmail() {
  const classNames = {
    confirmIcon: clsx(s.confirmIcon),
    container: clsx(s.container),
    page: clsx(s.page),
  }
  const searchParams = useSearchParams()

  const userId = searchParams.get('userId')
  const secret = searchParams.get('secret')

  const [verifyEmail] = useVerifyEmailMutation()
  const { data: meData } = useMeQuery()

  const isAuthenticated = useSelector(selectUserIsAuthenticated)
  const isEmailVerified = meData?.user?.emailVerification
  const [verifyMessage, setVerifyMessage] = useState(
    `На указанную Вами почту ${meData?.user?.email ?? ''} было выслано письмо с дальнейшими инструкциями.`
  )

  const verifyEmailHandler = (data: VerifyEmailRequest) => {
    try {
      console.log(data)
      verifyEmail(data).unwrap()
      setVerifyMessage(`Ваша почта ${meData?.user?.email ?? ''} подтверждена!`)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (userId && secret && isAuthenticated) {
      verifyEmailHandler({ secret, userId })
    } else {
      setVerifyMessage(
        `На указанную Вами почту ${meData?.user?.email ?? ''} было выслано письмо с дальнейшими инструкциями.`
      )
    }
  }, [secret, userId, isAuthenticated])

  if (isEmailVerified) {
    redirect(routes.account)
  }

  return (
    <Page className={classNames.page}>
      <div className={classNames.container}>
        <Typography.H1>Подтверждение почты</Typography.H1>
        <Typography.Body1>{verifyMessage}</Typography.Body1>
      </div>
      <ConfirmEmailIcon className={classNames.confirmIcon} />
    </Page>
  )
}

export default withSuspense(withRedux(ConfirmEmail))
