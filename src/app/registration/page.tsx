'use client'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { getErrorMessage } from '@/common/utils/get-error-message'
import { LoginEmailFormValues } from '@/components/forms/login-form/schema'
import { RegistrationForm } from '@/components/forms/registration-form/registration-form'
import { RegistrationFormValues } from '@/components/forms/registration-form/schema'
import { Page } from '@/components/layouts/page/page'
import { useRegistrationMutation } from '@/services/auth/auth.service'
import { selectUserIsAuthenticated } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { redirect } from 'next/navigation'

import s from './registration.module.scss'
function Registration() {
  const classNames = {
    container: clsx(s.container),
    formsWrapper: clsx(s.formsWrapper),
    page: clsx(s.page),
  }

  const [registration, { error: registrationError }] = useRegistrationMutation()
  const isAuthenticated = useSelector(selectUserIsAuthenticated)

  const registrationHandler = (registrationData: RegistrationFormValues) => {
    registration(registrationData).unwrap()
  }

  const errorMessage = getErrorMessage(registrationError)

  if (isAuthenticated) {
    redirect(routes.account)
  }

  return (
    <Page className={classNames.page}>
      <div className={classNames.formsWrapper}>
        <RegistrationForm errorMessage={errorMessage} onSubmit={registrationHandler} />
      </div>
    </Page>
  )
}

export default withRedux(Registration)
