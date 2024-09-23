'use client'
import { useSelector } from 'react-redux'

import withRedux from '@/common/hocs/with-redux'
import { ContactUsForm } from '@/components/forms/contact-us-form/contact-us-form'
import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
import { useMeQuery } from '@/services/auth/auth.service'
import { selectUserId } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import s from './contacts-page.module.scss'

function Contacts() {
  const classNames = {
    column: clsx(s.column),
    page: clsx(s.page),
    row: clsx(s.row),
  }

  const userId = useSelector(selectUserId)
  const { data: meData } = useMeQuery()
  const t = useTranslations('ContactsPage')

  return (
    <Page>
      <div className={classNames.row}>
        <div className={classNames.column}>
          <Typography.H1>{t('title')}</Typography.H1>
          <Typography.Caption>{t('description')}</Typography.Caption>
        </div>
        <div className={classNames.column}>
          <ContactUsForm
            defaultValues={
              userId
                ? { email: meData?.user?.email ?? '', name: meData?.user?.name ?? '' }
                : undefined
            }
            onSubmit={() => {}}
          />
        </div>
      </div>
    </Page>
  )
}

export default withRedux(Contacts)
