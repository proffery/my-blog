'use client'

import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { CreatePostForm } from '@/components/forms/create-post-form/create-post-form'
import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
import { selectUserRole } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { redirect } from 'next/navigation'

import s from './account.module.scss'

function CreatePost() {
  const classNames = {
    page: clsx(s.page),
  }

  const isAuthenticated = useSelector(selectUserRole)

  if (!isAuthenticated) {
    redirect(routes.login)
  }

  return (
    <Page className={classNames.page}>
      <CreatePostForm onSubmit={() => {}} />
    </Page>
  )
}
export default withRedux(CreatePost)
