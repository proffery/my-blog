'use client'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { getErrorMessage } from '@/common/utils/get-error-message'
import { EditNameForm } from '@/components/forms/edit-name-form/edit-name-form'
import { EditNameValues } from '@/components/forms/edit-name-form/schema'
import { Page } from '@/components/layouts/page/page'
import { Button } from '@/components/ui/button/button'
import { Typography } from '@/components/ui/typography/typography'
import clearCachesByServerAction from '@/server/utils/clear-caches-by-server-action'
import {
  useChangeNameMutation,
  useMeQuery,
  useSendVerifyEmailMutation,
} from '@/services/auth/auth.service'
import { selectUserRole } from '@/services/user/user.selectors'
import clsx from 'clsx'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'

import s from './account.module.scss'

function Account() {
  const classNames = {
    container: clsx(s.container),
    item: clsx(s.item),
    page: clsx(s.page),
  }
  const { data: meData } = useMeQuery()
  const [sendVerifyEmail] = useSendVerifyEmailMutation()
  const [changeName, { error: changeNameError }] = useChangeNameMutation()

  const isAuthenticated = useSelector(selectUserRole)
  const router = useRouter()

  const sendVerifyEmailHandler = async () => {
    try {
      await sendVerifyEmail().unwrap()
      router.push(routes.confirmEmail)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeNameSubmit = async (data: EditNameValues) => {
    try {
      await changeName(data).unwrap()
      clearCachesByServerAction(routes.account + '/' + meData?.user?.$id)
    } catch (error) {
      console.error(error)
    }
  }

  const errorMessage = getErrorMessage(changeNameError)

  if (!isAuthenticated) {
    redirect(routes.login)
  }

  return (
    <Page className={classNames.page}>
      <Typography.H1>Профиль</Typography.H1>
      <div className={classNames.container}>
        <div className={classNames.item}>
          <Typography.Subtitle1>ID:&nbsp;</Typography.Subtitle1>
          <Typography.Link1 as={Link} href={routes.account + '/' + meData?.user?.$id}>
            {meData?.user?.$id}
          </Typography.Link1>
        </div>
        <div className={classNames.item}>
          <Typography.Subtitle1>Почта:&nbsp;</Typography.Subtitle1>{' '}
          <Typography.Body1>{meData?.user?.email} &nbsp;</Typography.Body1>
          {meData?.user?.emailVerification ? (
            <Typography.Subtitle2>(подтверждена)</Typography.Subtitle2>
          ) : (
            <Typography.Subtitle2>(не подтверждена)</Typography.Subtitle2>
          )}
        </div>
        <div className={classNames.item}>
          <Typography.Subtitle1>Имя:&nbsp;</Typography.Subtitle1>
          <EditNameForm
            defaultValue={meData?.user?.name}
            errorMessage={errorMessage}
            onSubmit={handleChangeNameSubmit}
          />
        </div>
        <div className={classNames.item}>
          {meData?.user?.labels.length ? (
            <Typography.Subtitle1>Группа:&nbsp;</Typography.Subtitle1>
          ) : null}
          {meData?.user?.labels.map(label => (
            <Typography.Subtitle1 key={label}>{label.toUpperCase()}&nbsp;</Typography.Subtitle1>
          ))}
        </div>
      </div>
      {!meData?.user?.emailVerification && (
        <Button onClick={sendVerifyEmailHandler} type={'submit'}>
          Подтвердить почту
        </Button>
      )}
    </Page>
  )
}
export default withRedux(Account)
