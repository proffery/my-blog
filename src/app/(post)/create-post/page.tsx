'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { getErrorMessage } from '@/common/utils/get-error-message'
import { isRole } from '@/common/utils/is-role'
import { CreatePostForm } from '@/components/forms/create-post-form/create-post-form'
import { CreatePostFormValues } from '@/components/forms/create-post-form/schema'
import { Page } from '@/components/layouts/page/page'
import { Button } from '@/components/ui/button/button'
import { Modal } from '@/components/ui/modal/modal'
import { Typography } from '@/components/ui/typography/typography'
import clearCachesByServerAction from '@/server/utils/clear-caches-by-server-action'
import { useMeQuery } from '@/services/auth/auth.service'
import { useCreatePostMutation } from '@/services/posts/posts.service'
import { selectUserRole } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import s from './create-post.module.scss'

function CreatePost() {
  const classNames = {
    confirmButton: clsx(s.confirmButton),
    page: clsx(s.page),
  }
  const [showModerationModal, setShowModerationModal] = useState(false)

  const userRoles = useSelector(selectUserRole)
  const { data: meData } = useMeQuery()
  const authorId = meData?.user?.$id ?? ''
  const authorName = meData?.user?.name ?? ''

  const [createPost, { error: createPostError }] = useCreatePostMutation()
  const router = useRouter()
  const submitPostHandler = async (data: CreatePostFormValues) => {
    const newPost = await createPost({
      authorId,
      ...data,
      authorName,
      isPublished: isRole(userRoles, 'Writer'),
    }).unwrap()

    await clearCachesByServerAction(routes.account + '/' + authorId)

    if (isRole(userRoles, 'Writer')) {
      router.push(routes.post + newPost.$id)
    } else {
      setShowModerationModal(true)
    }
  }

  const errorMessage = getErrorMessage(createPostError)

  const moderationMessageHandler = () => {
    router.push(routes.base)
  }

  return (
    <Page className={classNames.page}>
      <Modal onOpenChange={moderationMessageHandler} open={showModerationModal} title={'Внимание!'}>
        <Typography.Body1>
          Ваш пост отправлен, но будет опубликован после проверки.
        </Typography.Body1>
        <Button className={classNames.confirmButton} onClick={moderationMessageHandler}>
          Хорошо
        </Button>
      </Modal>
      <CreatePostForm errorMessage={errorMessage} onSubmit={submitPostHandler} />
    </Page>
  )
}
export default withRedux(CreatePost)
