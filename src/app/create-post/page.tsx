'use client'

import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { CreatePostForm } from '@/components/forms/create-post-form/create-post-form'
import { CreatePostFormValues } from '@/components/forms/create-post-form/schema'
import { Page } from '@/components/layouts/page/page'
import clearCachesByServerAction from '@/server/utils/clear-caches-by-server-action'
import { useMeQuery } from '@/services/auth/auth.service'
import { useCreatePostMutation } from '@/services/posts/posts.service'
import { selectUserRole } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { redirect } from 'next/navigation'

import s from './account.module.scss'

function CreatePost() {
  const classNames = {
    page: clsx(s.page),
  }

  const isAuthenticated = useSelector(selectUserRole)
  const { data: meData } = useMeQuery()
  const authorId = meData?.user?.$id ?? ''

  const [createPost] = useCreatePostMutation()

  const submitPostHandler = async (data: CreatePostFormValues) => {
    await createPost({ authorId, ...data, tags: [] }).unwrap()
    await clearCachesByServerAction(routes.posts)
  }

  if (!isAuthenticated) {
    redirect(routes.login)
  }

  return (
    <Page className={classNames.page}>
      <CreatePostForm onSubmit={submitPostHandler} />
    </Page>
  )
}
export default withRedux(CreatePost)
