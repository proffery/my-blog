'use client'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { getErrorMessage } from '@/common/utils/get-error-message'
import {
  RegistrationForm,
  RegistrationFormValues,
} from '@/components/forms/registration-form/registration-form'
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
import { useTranslations } from 'next-intl'

import s from './registration.module.scss'

function RegistrationPage() {
  const classNames = {
    container: clsx(s.container),
    formsWrapper: clsx(s.formsWrapper),
    page: clsx(s.page),
  }

  const [registration, { error: registrationError, isLoading: isRegistrationLoading }] =
    useRegistrationMutation()
  const [sendVerifyEmail, { isLoading: isSendVerifyEmailLoading }] = useSendVerifyEmailMutation()
  const [loginWithEmail, { isLoading: isLoginWithEmailLoading }] = useLoginEmailMutation()
  const router = useRouter()
  const t = useTranslations('RegistrationPage')

  const registrationHandler = async (data: RegistrationFormValues) => {
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
      <Typography.H1>{t('title')}</Typography.H1>
      <div className={classNames.formsWrapper}>
        <RegistrationForm
          disabled={isRegistrationLoading || isRegistrationLoading || isSendVerifyEmailLoading}
          errorMessage={errorMessage}
          onSubmit={registrationHandler}
        />
        <Typography.Body1>
          {t('description1')}&nbsp;
          <Typography.Link1 as={Link} href={routes.login}>
            {t('description2')}
          </Typography.Link1>
        </Typography.Body1>
      </div>
    </Page>
  )
}

export default withRedux(RegistrationPage)
