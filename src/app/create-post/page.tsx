'use client'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { getErrorMessage } from '@/common/utils/get-error-message'
import { CreatePostForm } from '@/components/forms/create-post-form/create-post-form'
import { CreatePostFormValues } from '@/components/forms/create-post-form/schema'
import { Page } from '@/components/layouts/page/page'
import { useMeQuery } from '@/services/auth/auth.service'
import { useCreatePostMutation } from '@/services/posts/posts.service'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import s from './account.module.scss'

function CreatePost() {
  const classNames = {
    page: clsx(s.page),
  }

  const { data: meData } = useMeQuery()
  const authorId = meData?.user?.$id ?? ''
  const authorName = meData?.user?.name ?? ''

  const [createPost, { error: createPostError }] = useCreatePostMutation()
  const router = useRouter()
  const submitPostHandler = async (data: CreatePostFormValues) => {
    const newPost = await createPost({ authorId, ...data, authorName }).unwrap()

    router.push(routes.post + '/' + newPost.$id)
  }

  const errorMessage = getErrorMessage(createPostError)

  return (
    <Page className={classNames.page}>
      <CreatePostForm errorMessage={errorMessage} onSubmit={submitPostHandler} />
    </Page>
  )
}
export default withRedux(CreatePost)
