'use client'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { RegistrationForm } from '@/components/forms/registration-form/registration-form'
import { Page } from '@/components/layouts/page/page'
import { useMeQuery, useRegistrationMutation } from '@/services/auth/auth.service'
import clsx from 'clsx'
import { redirect } from 'next/navigation'

import s from './registration.module.scss'
function Registration() {
  const classNames = {
    container: clsx(s.container),
    formsWrapper: clsx(s.formsWrapper),
    page: clsx(s.page),
  }

  const { data: meData } = useMeQuery()

  const [registration] = useRegistrationMutation()

  if (meData) {
    redirect(routes.account)
  }

  return (
    <Page className={classNames.page}>
      <div className={classNames.formsWrapper}>
        <RegistrationForm onSubmit={registration} />
      </div>
    </Page>
  )
}

export default withRedux(Registration)
