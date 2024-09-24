'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import withSuspense from '@/common/hocs/with-suspense'
import { isRole } from '@/common/utils/is-role'
import { Page } from '@/components/layouts/page/page'
import { ModeratePostsTable } from '@/components/tables/moderate-posts-table/moderate-posts-table'
import { Dialog } from '@/components/ui/dialog/dialog'
import {
  TabContentItem,
  TabGroup,
  TabItem,
  TabList,
} from '@/components/ui/tab-switcher/tab-switcher'
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
import { useLocale, useTranslations } from 'next-intl'

import s from './administrator.module.scss'

import { useModeratorFilters } from './use-administrator-filters'

type AdminTabType = 'feedbacks' | 'users'

function Administrator() {
  const classNames = {
    page: clsx(s.page),
  }
  const userRoles = useSelector(selectUserRole)
  const router = useRouter()

  const [tabValue, setTabValue] = useState<AdminTabType>('feedbacks')

  const { setSort, setSortBy, sort, sortBy } = useModeratorFilters()

  const [deleteModal, setDeleteModal] = useState(false)
  const [publishModal, setPublishModal] = useState(false)
  const [tempPostData, setTempPostData] = useState({ authorId: '', postId: '', postTitle: '' })

  const locale = useLocale()
  const t = useTranslations('AdministratorPage')

  const { data: notPublishedPosts } = useGetNotPublishedPostsQuery({
    locale,
    sort: sort ?? 'desc',
    sortBy: sortBy ?? '$updatedAt',
  })
  const [deletePost, { isLoading: isDeleteLoading }] = useDeletePostMutation()
  const [changePublish, { isLoading: isPublishLoading }] = usePublishPostMutation()

  useEffect(() => {
    if (!isRole(userRoles, 'Administrator')) {
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

  const confirmDeleteHandler = async () => {
    setDeleteModal(false)
    await deletePost({ postId: tempPostData.postId }).unwrap()
    await clearCachesByServerAction(routes.account + '/' + tempPostData.authorId)
    await clearCachesByServerAction(routes.base)
    setTempPostData({ authorId: '', postId: '', postTitle: '' })
  }

  const confirmPublishHandler = async () => {
    setPublishModal(false)
    await changePublish({ isPublished: true, postId: tempPostData.postId }).unwrap()
    await clearCachesByServerAction(routes.base)

    setTempPostData({ authorId: '', postId: '', postTitle: '' })
  }

  const tabChangeHandler = (value: string) => {
    setTabValue(value as AdminTabType)
  }

  return (
    <Page className={classNames.page}>
      <Dialog
        cancelText={t('Dialogs.DeletePost.Cancel')}
        confirmText={t('Dialogs.DeletePost.Confirm')}
        onCancel={() => setDeleteModal(false)}
        onConfirm={confirmDeleteHandler}
        onOpenChange={setDeleteModal}
        open={deleteModal}
        title={t('Dialogs.DeletePost.title')}
      >
        <Typography.Body1>{tempPostData.postTitle}</Typography.Body1>
      </Dialog>
      <Dialog
        cancelText={t('Dialogs.PublishPost.Cancel')}
        confirmText={t('Dialogs.PublishPost.Confirm')}
        onCancel={() => setPublishModal(false)}
        onConfirm={confirmPublishHandler}
        onOpenChange={setPublishModal}
        open={publishModal}
        title={t('Dialogs.PublishPost.title')}
      >
        <Typography.Body1>{tempPostData.postTitle}</Typography.Body1>
      </Dialog>
      <Typography.H1>{t('title')}</Typography.H1>
      <TabGroup onValueChange={tabChangeHandler}>
        <TabList>
          <TabItem selected={tabValue === 'feedbacks'} value={'feedbacks'}>
            {t('AdminTabs.Feedbacks.button')}
          </TabItem>
          <TabItem selected={tabValue === 'users'} value={'users'}>
            {t('AdminTabs.Users.button')}
          </TabItem>
        </TabList>
        <TabContentItem value={'feedbacks'}>
          {notPublishedPosts && notPublishedPosts.documents.length > 0 ? (
            <ModeratePostsTable
              disabled={isDeleteLoading || isPublishLoading}
              onPostDelete={setDeletedPostDataHandler}
              onPostPublish={setPublishPostDataHandler}
              onSortByChange={setSortBy}
              onSortChange={setSort}
              posts={notPublishedPosts?.documents}
              sort={sort ?? 'desc'}
              sortBy={sortBy ?? '$updatedAt'}
            />
          ) : (
            <Typography.Caption>{t('AdminTabs.Feedbacks.Description')}</Typography.Caption>
          )}
        </TabContentItem>
        <TabContentItem value={'users'}>{t('AdminTabs.Users.Description')}</TabContentItem>
      </TabGroup>
    </Page>
  )
}
export default withSuspense(withRedux(Administrator))
