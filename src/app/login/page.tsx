'use client'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { GithubIcon } from '@/assets/icons/components/github-icon'
import { GoogleIcon } from '@/assets/icons/components/google-icon'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { getErrorMessage } from '@/common/utils/get-error-message'
import { LoginForm } from '@/components/forms/login-form/login-form'
import { LoginEmailFormValues } from '@/components/forms/login-form/schema'
import { Page } from '@/components/layouts/page/page'
import { Button } from '@/components/ui/button/button'
import { signUpWithGithub, signUpWithGoogle } from '@/server/oauth'
import { useLoginEmailMutation } from '@/services/auth/auth.service'
import { selectUserIsAuthenticated } from '@/services/user/user.selectors'
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

  const [loginWithEmail, { error: loginWithEmailError }] = useLoginEmailMutation()
  const isAuthenticated = useSelector(selectUserIsAuthenticated)

  const loginWithEmailHandler = (loginData: LoginEmailFormValues) => {
    loginWithEmail(loginData).unwrap()
  }

  const errorMessage = getErrorMessage(loginWithEmailError)

  if (isAuthenticated) {
    redirect(routes.base)
  }

  return (
    <Page className={classNames.page}>
      <div className={classNames.formsWrapper}>
        <LoginForm errorMessage={errorMessage} onSubmit={loginWithEmailHandler} />
        <div className={classNames.buttonsWrapper}>
          <form action={signUpWithGoogle} className={classNames.form}>
            <Button fullWidth type={'submit'}>
              <GoogleIcon /> Google
            </Button>
          </form>
          <form action={signUpWithGithub} className={classNames.form}>
            <Button fullWidth type={'submit'}>
              <GithubIcon />
              Github
            </Button>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default withRedux(Login)
