'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { isRole } from '@/common/utils/is-role'
import { Page } from '@/components/layouts/page/page'
import { ModeratorTable } from '@/components/tables/moderator-table/moderator-table'
import { Dialog } from '@/components/ui/dialog/dialog'
import { Typography } from '@/components/ui/typography/typography'
import clearCachesByServerAction from '@/server/utils/clear-caches-by-server-action'
import {
  useDeletePostMutation,
  useGetNotPublishedPostsQuery,
  usePublishPostMutation,
} from '@/services/posts/posts.service'
import { selectUserRole } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import s from './moderator.module.scss'

function Moderator() {
  const classNames = {
    item: clsx(s.item),
    page: clsx(s.page),
  }
  const userRoles = useSelector(selectUserRole)
  const router = useRouter()

  const [deleteModal, setDeleteModal] = useState(false)
  const [publishModal, setPublishModal] = useState(false)
  const [tempPostData, setTempPostData] = useState({ authorId: '', postId: '', postTitle: '' })

  const { data: notPublishedPosts } = useGetNotPublishedPostsQuery()
  const [deletePost] = useDeletePostMutation()
  const [changePublish] = usePublishPostMutation()

  useEffect(() => {
    if (!isRole(userRoles, 'Moderator')) {
      router.push(routes.base)
    }
  }, [userRoles])

  const setDeletedPostDataHandler = (data: {
    authorId: string
    postId: string
    postTitle: string
  }) => {
    const { authorId, postId, postTitle } = data

    setTempPostData({ authorId, postId, postTitle })
    setDeleteModal(true)
  }

  const setPublishPostDataHandler = (data: {
    authorId: string
    postId: string
    postTitle: string
  }) => {
    const { authorId, postId, postTitle } = data

    setTempPostData({ authorId, postId, postTitle })
    setPublishModal(true)
  }

  const confirmPostDeleteHandler = async () => {
    setDeleteModal(false)
    await deletePost({ postId: tempPostData.postId }).unwrap()

    await clearCachesByServerAction(routes.account + '/' + tempPostData.authorId)
    setTempPostData({ authorId: '', postId: '', postTitle: '' })
  }

  const confirmPublishHandler = async () => {
    await changePublish({ isPublished: true, postId: tempPostData.postId })
    setPublishModal(false)
    setTempPostData({ authorId: '', postId: '', postTitle: '' })
  }

  return (
    <Page className={classNames.page}>
      <Typography.H1>Модерация постов</Typography.H1>
      <Dialog
        cancelText={'Отмена'}
        confirmText={'Удалить'}
        onCancel={() => setDeleteModal(false)}
        onConfirm={confirmPostDeleteHandler}
        onOpenChange={setDeleteModal}
        open={deleteModal}
        title={'Удалить этот пост?'}
      >
        <Typography.Body1>{tempPostData.postTitle}</Typography.Body1>
      </Dialog>
      <Dialog
        cancelText={'Отмена'}
        confirmText={'Опубликовать'}
        onCancel={() => setPublishModal(false)}
        onConfirm={confirmPublishHandler}
        onOpenChange={setPublishModal}
        open={publishModal}
        title={'Опубликовать?'}
      >
        <Typography.Body1>{tempPostData.postTitle}</Typography.Body1>
      </Dialog>
      {notPublishedPosts && notPublishedPosts.documents.length > 0 ? (
        <ModeratorTable
          onPostDelete={setDeletedPostDataHandler}
          onPostPublish={setPublishPostDataHandler}
          posts={notPublishedPosts?.documents}
        />
      ) : (
        <Typography.Caption>Пока нет постов для модерации</Typography.Caption>
      )}
    </Page>
  )
}
export default withRedux(Moderator)
