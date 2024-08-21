'use client'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { getErrorMessage } from '@/common/utils/get-error-message'
import { Page } from '@/components/layouts/page/page'
import { Button } from '@/components/ui/button/button'
import { EditableSpan, EditableSpanValues } from '@/components/ui/editable-span/editable-span'
import { Typography } from '@/components/ui/typography/typography'
import {
  useChangeNameMutation,
  useMeQuery,
  useSendVerifyEmailMutation,
} from '@/services/auth/auth.service'
import { selectUserIsAuthenticated } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { redirect, useRouter } from 'next/navigation'

import s from './account.module.scss'

function Account() {
  const classNames = {
    container: clsx(s.container),
    list: clsx(s.list),
    listItem: clsx(s.listItem),
    page: clsx(s.page),
  }
  const { data: meData } = useMeQuery()
  const [sendVerifyEmail] = useSendVerifyEmailMutation()
  const [changeName, { error: chngeNameError }] = useChangeNameMutation()

  const isAuthenticated = useSelector(selectUserIsAuthenticated)
  const router = useRouter()

  const sendVerifyEmailHandler = () => {
    try {
      sendVerifyEmail().unwrap()
      router.push(routes.confirmEmail)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeNameSubmit = (data: EditableSpanValues) => {
    changeName(data).unwrap()
  }

  const errorMessage = getErrorMessage(chngeNameError)

  if (!isAuthenticated) {
    redirect(routes.login)
  }

  return (
    <Page className={classNames.page}>
      <Typography.H1>Профиль</Typography.H1>
      <ul className={classNames.list}>
        <li className={classNames.listItem}>
          <strong>ID:&nbsp;</strong> {meData?.user?.$id}
        </li>
        <li className={classNames.listItem}>
          <strong>Имя:&nbsp;</strong>
          <EditableSpan defaultValue={meData?.user?.name} onSubmit={handleChangeNameSubmit} />
        </li>
        <li className={classNames.listItem}>
          <strong>Почта:&nbsp;</strong> {meData?.user?.email} &nbsp;
          {meData?.user?.emailVerification ? (
            <strong>(подтверждена)</strong>
          ) : (
            <strong>(не подтверждена)</strong>
          )}
        </li>
        {meData?.user?.labels.length ? (
          <li className={classNames.listItem}>
            <strong>Status:</strong>
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
