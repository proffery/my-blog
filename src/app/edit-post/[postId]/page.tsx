'use client'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { getErrorMessage } from '@/common/utils/get-error-message'
import { CreatePostForm } from '@/components/forms/create-post-form/create-post-form'
import { CreatePostFormValues } from '@/components/forms/create-post-form/schema'
import { Page } from '@/components/layouts/page/page'
import clearCachesByServerAction from '@/server/utils/clear-caches-by-server-action'
import { useMeQuery } from '@/services/auth/auth.service'
import { useGetPostQuery, useUpdatePostMutation } from '@/services/posts/posts.service'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import s from '@/app/create-post/create-post.module.scss'

type Props = {
  params: { postId: string }
}

function EditPost(props: Props) {
  const classNames = {
    page: clsx(s.page),
  }
  const router = useRouter()

  const { data: meData } = useMeQuery()
  const userId = meData?.user?.$id ?? ''
  const authorName = meData?.user?.name ?? ''

  const postId = props.params.postId
  const { data: postData } = useGetPostQuery({ params: { postId } })

  const authorId = postData?.authorId

  const [updatePost, { error: updatePostError }] = useUpdatePostMutation()

  const submitPostHandler = async (data: CreatePostFormValues) => {
    await updatePost({ ...data, authorName, postId }).unwrap()

    await clearCachesByServerAction(routes.post + '/' + postId)
    router.push(routes.post + '/' + postId)
  }

  const errorMessage = getErrorMessage(updatePostError)

  if (userId && authorId && userId !== authorId) {
    router.push(routes.post + '/' + postId)
  }

  return (
    <Page className={classNames.page}>
      <CreatePostForm
        defaultValues={{ post: postData?.post ?? '', title: postData?.title ?? '' }}
        errorMessage={errorMessage}
        onSubmit={submitPostHandler}
      />
    </Page>
  )
}
export default withRedux(EditPost)
