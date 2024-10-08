'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { getErrorMessage } from '@/common/utils/get-error-message'
import { isRole } from '@/common/utils/is-role'
import {
  CreatePostForm,
  CreatePostFormValues,
} from '@/components/forms/create-post-form/create-post-form'
import { Page } from '@/components/layouts/page/page'
import { Button } from '@/components/ui/button/button'
import { Modal } from '@/components/ui/modal/modal'
import { Typography } from '@/components/ui/typography/typography'
import clearCachesByServerAction from '@/server/utils/clear-caches-by-server-action'
import { useMeQuery } from '@/services/auth/auth.service'
import { useGetPostQuery, useUpdatePostMutation } from '@/services/posts/posts.service'
import { selectUserRole } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

import s from './edit-post.module.scss'

type Props = {
  params: { postId: string }
}

function EditPostPage(props: Props) {
  const classNames = {
    confirmButton: clsx(s.confirmButton),
    page: clsx(s.page),
  }
  const [showModerationModal, setShowModerationModal] = useState(false)
  const userRoles = useSelector(selectUserRole)

  const locale = useLocale()
  const t = useTranslations('UpdatePostPage')

  const router = useRouter()

  const { data: meData } = useMeQuery()
  const userId = meData?.user?.$id ?? ''
  const authorName = meData?.user?.name ?? ''

  const postId = props.params.postId
  const { data: postData } = useGetPostQuery({ params: { postId } })

  const authorId = postData?.authorId

  const [updatePost, { error: updatePostError, isLoading }] = useUpdatePostMutation()

  const submitPostHandler = async (data: CreatePostFormValues) => {
    try {
      await updatePost({
        ...data,
        authorName,
        isPublished: isRole(userRoles, 'Writer'),
        locale,
        postId,
      }).unwrap()
      await clearCachesByServerAction(routes.post + '/' + postId)
      await clearCachesByServerAction(routes.account + '/' + authorId)
      await clearCachesByServerAction(routes.base)

      if (isRole(userRoles, 'Writer')) {
        router.push(routes.post + postId)
      } else {
        setShowModerationModal(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const errorMessage = getErrorMessage(updatePostError)

  const moderationMessageHandler = () => {
    router.push(routes.base)
  }

  useEffect(() => {
    if (userId && authorId && userId !== authorId) {
      router.push(routes.post + postId)
    }
  }, [userId, authorId, postId, router])

  return (
    <Page className={classNames.page}>
      <Typography.H1>{t('title')}</Typography.H1>
      <Modal
        onOpenChange={moderationMessageHandler}
        open={showModerationModal}
        title={t('Dialogs.Attention.title')}
      >
        <Typography.Body1>{t('Dialogs.Attention.description')}</Typography.Body1>
        <Button className={classNames.confirmButton} onClick={moderationMessageHandler}>
          {t('Dialogs.Attention.Confirm')}
        </Button>
      </Modal>
      <CreatePostForm
        defaultValues={{
          cover: postData?.cover ?? '',
          post: postData?.post ?? '',
          title: postData?.title ?? '',
        }}
        disabled={isLoading}
        errorMessage={errorMessage}
        onSubmit={submitPostHandler}
      />
    </Page>
  )
}
export default withRedux(EditPostPage)
