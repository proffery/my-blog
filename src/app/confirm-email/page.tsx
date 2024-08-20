'use client'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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
    'На указанную Вами почту было выслано письмо с дальнейшими инструкциями.'
  )

  const verifyEmailHandler = async (data: VerifyEmailRequest) => {
    try {
      await verifyEmail(data).unwrap()
      setVerifyMessage('Ваша почта подтверждена!')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (userId && secret && isAuthenticated) {
      verifyEmailHandler({ secret, userId })
    }
  }, [secret, userId, isAuthenticated])

  if (isEmailVerified) {
    redirect(routes.account)
  }

  return (
    <Page className={classNames.page}>
      <Typography.H1>Подтверждение почты</Typography.H1>
      <Typography.Body1>{verifyMessage}</Typography.Body1>
    </Page>
  )
}

export default withSuspense(withRedux(ConfirmEmail))
