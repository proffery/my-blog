'use client'
import { useSelector } from 'react-redux'

import { GithubIcon } from '@/assets/icons/components/github-icon'
import { GoogleIcon } from '@/assets/icons/components/google-icon'
import { breakpoints } from '@/common/constants/breakpoints'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { useWidth } from '@/common/hooks/use-width'
import { LoginForm } from '@/components/forms/login-form/login-form'
import { Page } from '@/components/layouts/page/page'
import { Button } from '@/components/ui/button/button'
import { signUpWithGithub, signUpWithGoogle } from '@/server/oauth'
import { selectIsAuthenticated } from '@/services/app/app.selectors'
import { useLoginEmailMutation } from '@/services/auth/auth.service'
import clsx from 'clsx'
import { redirect } from 'next/navigation'

import s from './login.module.scss'
function Login() {
  const classNames = {
    buttonsWrapper: clsx(s.buttonsWrapper),
    container: clsx(s.container),
    form: clsx(s.form),
    formsWrapper: clsx(s.formsWrapper),
    page: clsx(s.page),
  }

  const [loginWithEmail] = useLoginEmailMutation()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const width = useWidth()

  if (isAuthenticated) {
    redirect(routes.account)
  }

  return (
    <Page className={classNames.page}>
      <div className={classNames.formsWrapper}>
        <LoginForm onSubmit={loginWithEmail} />
        <div className={classNames.buttonsWrapper}>
          <form action={signUpWithGoogle} className={classNames.form}>
            <Button fullWidth type={'submit'}>
              <GoogleIcon /> Sign in with Google
            </Button>
          </form>
          <form action={signUpWithGithub} className={classNames.form}>
            <Button fullWidth type={'submit'}>
              <GithubIcon />
              Sign in with Github
            </Button>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default withRedux(Login)
