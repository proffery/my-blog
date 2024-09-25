import { useState } from 'react'

import withRedux from '@/common/hocs/with-redux'
import { useFeedbacksFilters } from '@/components/layouts/administrator-page/use-feedbacks-filters'
import { AdminFeedbacksTable } from '@/components/tables/admin-feedbacks-table/admin-feedbacks-table'
import { Dialog } from '@/components/ui/dialog/dialog'
import {
  useAllFeedbacksQuery,
  useDeleteFeedbackMutation,
  usePublishFeedbackMutation,
} from '@/services/feedbacks/feedbacks.service'
import { useLocale, useTranslations } from 'next-intl'

function FeedbacksTab() {
  const [deleteModal, setDeleteModal] = useState(false)
  const [publishModal, setPublishModal] = useState(false)
  const [tempFeedbackData, setTempFeedbackData] = useState({ feedbackId: '' })

  const currentLocale = useLocale()

  const { isPublished, locale, setIsPublished, setLocale, setSort, setSortBy, sort, sortBy } =
    useFeedbacksFilters()

  const { data: feedbacks } = useAllFeedbacksQuery({
    locale: currentLocale,
    sort: sort ?? 'desc',
    sortBy: sortBy ?? '$createdAt',
  })

  const [deleteFeedback, { isLoading: isDeleteLoading }] = useDeleteFeedbackMutation()
  const [changePublish, { isLoading: isPublishLoading }] = usePublishFeedbackMutation()

  const t = useTranslations('AdministratorPage.AdminTabs.Feedbacks')

  const setDeletedFeedbackDataHandler = (data: { feedbackId: string }) => {
    setTempFeedbackData({ feedbackId: data.feedbackId })
    setDeleteModal(true)
  }

  const setPublishPostDataHandler = (data: { feedbackId: string }) => {
    setTempFeedbackData({ feedbackId: data.feedbackId })
    setPublishModal(true)
  }

  const confirmDeleteHandler = async () => {
    setDeleteModal(false)
    await deleteFeedback({ feedbackId: tempFeedbackData.feedbackId }).unwrap()
    setTempFeedbackData({ feedbackId: '' })
  }

  const confirmPublishHandler = async () => {
    setPublishModal(false)
    await changePublish({ feedbackId: tempFeedbackData.feedbackId, isPublished: true }).unwrap()

    setTempFeedbackData({ feedbackId: '' })
  }

  return (
    <>
      <Dialog
        cancelText={t('Dialogs.DeleteFeedback.Cancel')}
        confirmText={t('Dialogs.DeleteFeedback.Confirm')}
        onCancel={() => setDeleteModal(false)}
        onConfirm={confirmDeleteHandler}
        onOpenChange={setDeleteModal}
        open={deleteModal}
        title={t('Dialogs.DeleteFeedback.title')}
      />
      <Dialog
        cancelText={t('Dialogs.PublishFeedback.Cancel')}
        confirmText={t('Dialogs.PublishFeedback.Confirm')}
        onCancel={() => setPublishModal(false)}
        onConfirm={confirmPublishHandler}
        onOpenChange={setPublishModal}
        open={publishModal}
        title={t('Dialogs.PublishFeedback.title')}
      />
      <AdminFeedbacksTable
        disabled={isDeleteLoading || isPublishLoading}
        feedbacks={feedbacks?.documents}
        onFeedbackDelete={setDeletedFeedbackDataHandler}
        onFeedbackPublish={setPublishPostDataHandler}
        onSortByChange={setSortBy}
        onSortChange={setSort}
        sort={sort ?? 'desc'}
        sortBy={sortBy ?? '$createdAt'}
      />
    </>
  )
}

export default withRedux(FeedbacksTab)
