'use client'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { Page } from '@/components/layouts/page/page'
import { Button } from '@/components/ui/button/button'
import { useMeQuery, useSendVerifyEmailMutation } from '@/services/auth/auth.service'
import { selectUserIsAuthenticated } from '@/services/user/user.selectors'
import { redirect, useRouter } from 'next/navigation'

function Account() {
  const { data: meData } = useMeQuery()
  const [sendVerifyEmail] = useSendVerifyEmailMutation()
  const isAuthenticated = useSelector(selectUserIsAuthenticated)
  const router = useRouter()

  const sendVerifyEmailHandler = async () => {
    try {
      await sendVerifyEmail()
      router.push(routes.confirmEmail)
    } catch (error) {
      console.error(error)
    }
  }

  if (!isAuthenticated) {
    redirect(routes.login)
  }

  return (
    <Page>
      <ul>
        <li>
          <strong>ID: </strong> {meData?.user?.$id}
        </li>
        <li>
          <strong>Name:</strong> {meData?.user?.name}
        </li>
        <li>
          <strong>Email:</strong> {meData?.user?.email}
          {meData?.user?.emailVerification ? (
            <strong>(verified)</strong>
          ) : (
            <Button onClick={sendVerifyEmailHandler} type={'submit'}>
              Verify Email
            </Button>
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
    </Page>
  )
}
export default withRedux(Account)
