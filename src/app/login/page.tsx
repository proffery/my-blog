'use client'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { LoginForm } from '@/components/forms/login-form/login-form'
import { Page } from '@/components/layouts/page/page'
import { Button } from '@/components/ui/button/button'
import { signUpWithGithub, signUpWithGoogle } from '@/server/oauth'
import { selectIsAuthenticated } from '@/services/app/app.selectors'
import { useLoginEmailMutation, useMeQuery } from '@/services/auth/auth.service'
import clsx from 'clsx'
import { redirect } from 'next/navigation'

import s from './login.module.scss'
function Login() {
  const classNames = {
    buttonsWrapper: clsx(s.buttonsWrapper),
    container: clsx(s.container),
    formsWrapper: clsx(s.formsWrapper),
    page: clsx(s.page),
  }

  const [loginWithEmail] = useLoginEmailMutation()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    redirect(routes.account)
  }

  return (
    <Page className={classNames.page}>
      <div className={classNames.formsWrapper}>
        <LoginForm onSubmit={loginWithEmail} />
        <div className={classNames.buttonsWrapper}>
          <form action={signUpWithGoogle}>
            <Button fullWidth type={'submit'}>
              Login with Google
            </Button>
          </form>
          <form action={signUpWithGithub}>
            <Button fullWidth type={'submit'}>
              Login with GitHub
            </Button>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default withRedux(Login)
