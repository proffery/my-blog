'use client'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import withRedux from '@/common/hocs/with-redux'
import { getErrorMessage } from '@/common/utils/get-error-message'
import {
  ContactUsForm,
  ContactUsFormValues,
} from '@/components/forms/contact-us-form/contact-us-form'
import { FeedbackCard } from '@/components/layouts/contacts-page/feedback-card/feedback-card'
import { SwiperDecorationModel } from '@/components/layouts/contacts-page/swiper-decoration-model/swiper-decoration-model'
import { Page } from '@/components/layouts/page/page'
import { SwiperComponent } from '@/components/ui/swiper/swiper'
import { Typography } from '@/components/ui/typography/typography'
import { useMeQuery } from '@/services/auth/auth.service'
import {
  useCreateFeedbackMutation,
  usePublishedFeedbacksQuery,
} from '@/services/feedbacks/feedbacks.service'
import { selectUserId } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { useLocale, useTranslations } from 'next-intl'

import s from './contacts-page.module.scss'

function ContactsPage() {
  const classNames = {
    column: clsx(s.column),
    feedbackWrapper: clsx(s.feedbackWrapper),
    model: clsx(s.model),
    page: clsx(s.page),
    row: clsx(s.row),
    swiper: clsx(s.swiper),
  }
  const locale = useLocale()
  const t = useTranslations('ContactsPage')

  const [isSliderMove, setIsSliderMove] = useState(false)

  const userId = useSelector(selectUserId)
  const { data: meData } = useMeQuery()

  const { data: feedbacksData } = usePublishedFeedbacksQuery({ locale })

  const [
    createFeedback,
    {
      error: createFeedbackError,
      isLoading: isCreateFeedbackLoading,
      isSuccess: createFeedbackSuccess,
    },
  ] = useCreateFeedbackMutation()

  const errorMessage = getErrorMessage(createFeedbackError)

  const contactUsHandler = async (data: ContactUsFormValues) => {
    await createFeedback({ ...data, authorId: userId, locale }).unwrap()
  }

  return (
    <Page className={classNames.page}>
      <div className={classNames.row}>
        <div className={classNames.column}>
          <Typography.H1>{t('title')}</Typography.H1>
          <Typography.Caption>{t('description')}</Typography.Caption>
        </div>
        <div className={classNames.column}>
          <ContactUsForm
            defaultValues={
              userId
                ? { email: meData?.user?.email ?? '', name: meData?.user?.name ?? '' }
                : undefined
            }
            disabled={isCreateFeedbackLoading}
            errorMessage={errorMessage}
            isSubmitSuccess={createFeedbackSuccess}
            onSubmit={contactUsHandler}
          />
        </div>
      </div>
      <div className={classNames.feedbackWrapper}>
        {feedbacksData && feedbacksData.documents.length > 0 && (
          <SwiperComponent onSliderMove={setIsSliderMove}>
            {feedbacksData.documents.map(feedback => (
              <FeedbackCard feedbackData={feedback} key={feedback.$id} />
            ))}
          </SwiperComponent>
        )}
        <SwiperDecorationModel
          className={classNames.model}
          setShowAnimation={setIsSliderMove}
          showAnimation={isSliderMove}
        />
      </div>
    </Page>
  )
}

export default withRedux(ContactsPage)
