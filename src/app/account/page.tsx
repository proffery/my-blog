'use client'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { Page } from '@/components/layouts/page/page'
import { Button } from '@/components/ui/button/button'
import { Typography } from '@/components/ui/typography/typography'
import { useMeQuery, useSendVerifyEmailMutation } from '@/services/auth/auth.service'
import { selectUserIsAuthenticated } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { redirect, useRouter } from 'next/navigation'

import s from './account.module.scss'

function Account() {
  const classNames = {
    container: clsx(s.container),
    list: clsx(s.list),
    page: clsx(s.page),
  }
  const { data: meData } = useMeQuery()
  const [sendVerifyEmail] = useSendVerifyEmailMutation()
  const isAuthenticated = useSelector(selectUserIsAuthenticated)
  const router = useRouter()

  const sendVerifyEmailHandler = async () => {
    try {
      await sendVerifyEmail().unwrap()
      router.push(routes.confirmEmail)
    } catch (error) {
      console.error(error)
    }
  }

  if (!isAuthenticated) {
    redirect(routes.login)
  }

  return (
    <Page className={classNames.page}>
      <Typography.H1>Профиль</Typography.H1>
      <ul className={classNames.list}>
        <li>
          <strong>ID: </strong> {meData?.user?.$id}
        </li>
        <li>
          <strong>Имя:</strong> {meData?.user?.name}
        </li>
        <li>
          <strong>Почта:</strong> {meData?.user?.email} &nbsp;
          {meData?.user?.emailVerification ? (
            <strong>(подтверждена)</strong>
          ) : (
            <strong>(не подтверждена)</strong>
          )}
        </li>
        {meData?.user?.labels.length ? (
          <li>
            <strong>Status:</strong>{' '}
            {meData.user.labels.map(label => (
              <span key={label}>{label}&nbsp;</span>
            ))}
          </li>
        ) : null}
      </ul>
      {!meData?.user?.emailVerification && (
        <Button onClick={sendVerifyEmailHandler} type={'submit'}>
          Подтвердить почту
        </Button>
      )}
    </Page>
  )
}
export default withRedux(Account)
