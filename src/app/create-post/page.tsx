'use client'

import withRedux from '@/common/hocs/with-redux'
import { CreatePostForm } from '@/components/forms/create-post-form/create-post-form'
import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'

import s from './account.module.scss'

function Account() {
  const classNames = {
    page: clsx(s.page),
  }

  return (
    <Page className={classNames.page}>
      <CreatePostForm onSubmit={() => {}} />
    </Page>
  )
}
export default withRedux(Account)
