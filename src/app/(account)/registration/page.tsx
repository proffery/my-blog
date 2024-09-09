'use client'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { getErrorMessage } from '@/common/utils/get-error-message'
import { RegistrationForm } from '@/components/forms/registration-form/registration-form'
import { RegistrationFormValues } from '@/components/forms/registration-form/schema'
import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
import {
  useLoginEmailMutation,
  useRegistrationMutation,
  useSendVerifyEmailMutation,
} from '@/services/auth/auth.service'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import s from './registration.module.scss'

function Registration() {
  const classNames = {
    container: clsx(s.container),
    formsWrapper: clsx(s.formsWrapper),
    page: clsx(s.page),
  }

  const [registration, { error: registrationError }] = useRegistrationMutation()
  const [sendVerifyEmail] = useSendVerifyEmailMutation()
  const [loginWithEmail] = useLoginEmailMutation()
  const router = useRouter()
  const registrationHandler = async (data: Omit<RegistrationFormValues, 'confirmPassword'>) => {
    try {
      await registration({ email: data.email, name: data.name, password: data.password }).unwrap()
      await loginWithEmail({ email: data.email, password: data.password }).unwrap()
      await sendVerifyEmail().unwrap()
      router.push(routes.confirmEmail)
    } catch (error) {
      console.error(error)
    }
  }

  const errorMessage = getErrorMessage(registrationError)

  return (
    <Page className={classNames.page}>
      <div className={classNames.formsWrapper}>
        <RegistrationForm errorMessage={errorMessage} onSubmit={registrationHandler} />
        <Typography.Body1>
          Уже есть аккаунт?&nbsp;
          <Typography.Link1 as={Link} href={routes.login}>
            Войти
          </Typography.Link1>
        </Typography.Body1>
      </div>
    </Page>
  )
}

export default withRedux(Registration)