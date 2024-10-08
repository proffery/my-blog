import { useEffect, useState } from 'react'

import { useFeedbacksFilters } from '@/components/layouts/administrator-page/use-feedbacks-filters'
import { AdminFeedbacksTable } from '@/components/tables/admin-feedbacks-table/admin-feedbacks-table'
import { Dialog } from '@/components/ui/dialog/dialog'
import { Typography } from '@/components/ui/typography/typography'
import {
  useAllFeedbacksQuery,
  useDeleteFeedbackMutation,
  usePublishFeedbackMutation,
} from '@/services/feedbacks/feedbacks.service'
import { useLocale, useTranslations } from 'next-intl'

export const FeedbacksTab = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [tempFeedbackData, setTempFeedbackData] = useState({ feedback: '', feedbackId: '' })

  const locale = useLocale()

  const { setSort, setSortBy, sort, sortBy } = useFeedbacksFilters()

  const { data: feedbacks, isLoading: isFeedbacksLoading } = useAllFeedbacksQuery({
    locale,
    sort: sort ?? 'desc',
    sortBy: sortBy ?? '$createdAt',
  })

  const [deleteFeedback, { isLoading: isDeleteLoading }] = useDeleteFeedbackMutation()
  const [changePublish, { isLoading: isPublishLoading }] = usePublishFeedbackMutation()

  const t = useTranslations('AdministratorPage.AdminTabs.Feedbacks')

  const setDeletedFeedbackDataHandler = (data: { feedback: string; feedbackId: string }) => {
    setTempFeedbackData({ feedback: data.feedback, feedbackId: data.feedbackId })
    setShowDeleteModal(true)
  }

  const setOpenFeedbackDataHandler = (data: { feedback: string; feedbackId: string }) => {
    const { feedback, feedbackId } = data

    setTempFeedbackData({ feedback, feedbackId })
    setShowFeedbackModal(true)
  }

  const setPublishPostDataHandler = (data: { feedback: string; feedbackId: string }) => {
    const { feedback, feedbackId } = data

    setTempFeedbackData({ feedback, feedbackId })
    setShowPublishModal(true)
  }

  const confirmDeleteHandler = async () => {
    setShowDeleteModal(false)
    await deleteFeedback({ feedbackId: tempFeedbackData.feedbackId }).unwrap()
    setTempFeedbackData({ feedback: '', feedbackId: '' })
  }

  const cancelOpenFeedbackHandler = () => {
    setShowFeedbackModal(false)
    setTempFeedbackData({ feedback: '', feedbackId: '' })
  }

  const confirmPublishHandler = async () => {
    setShowPublishModal(false)
    const { feedbackId } = tempFeedbackData

    if (feedbacks) {
      const feedbackIndex = feedbacks.documents.findIndex(document => document.$id === feedbackId)

      if (feedbackIndex !== -1) {
        await changePublish({
          feedbackId,
          isPublished: !feedbacks.documents[feedbackIndex].isPublished,
        }).unwrap()
      }
    }

    setTempFeedbackData({ feedback: '', feedbackId: '' })
  }

  return (
    <>
      <Dialog
        cancelText={t('Dialogs.DeleteFeedback.Cancel')}
        confirmText={t('Dialogs.DeleteFeedback.Confirm')}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteHandler}
        onOpenChange={setShowDeleteModal}
        open={showDeleteModal}
        title={t('Dialogs.DeleteFeedback.title')}
      >
        {tempFeedbackData.feedback}
      </Dialog>
      <Dialog
        cancelText={t('Dialogs.ShowFeedback.Cancel')}
        onCancel={cancelOpenFeedbackHandler}
        onOpenChange={setShowFeedbackModal}
        open={showFeedbackModal}
        title={t('Dialogs.ShowFeedback.title')}
      >
        {tempFeedbackData.feedback}
      </Dialog>
      <Dialog
        cancelText={t('Dialogs.PublishFeedback.Cancel')}
        confirmText={t('Dialogs.PublishFeedback.Confirm')}
        onCancel={() => setShowPublishModal(false)}
        onConfirm={confirmPublishHandler}
        onOpenChange={setShowPublishModal}
        open={showPublishModal}
        title={t('Dialogs.PublishFeedback.title')}
      >
        {tempFeedbackData.feedback}
      </Dialog>
      {feedbacks && feedbacks.documents.length > 0 ? (
        <AdminFeedbacksTable
          disabled={isDeleteLoading || isPublishLoading || isFeedbacksLoading}
          feedbacks={feedbacks?.documents}
          onFeedbackDelete={setDeletedFeedbackDataHandler}
          onFeedbackOpen={setOpenFeedbackDataHandler}
          onFeedbackPublish={setPublishPostDataHandler}
          onSortByChange={setSortBy}
          onSortChange={setSort}
          sort={sort ?? 'desc'}
          sortBy={sortBy ?? '$createdAt'}
        />
      ) : (
        <Typography.Caption>{t('Description')}</Typography.Caption>
      )}
    </>
  )
}
