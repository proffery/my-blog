'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import withSuspense from '@/common/hocs/with-suspense'
import { isRole } from '@/common/utils/is-role'
import FeedbacksTab from '@/components/layouts/administrator-page/feedbacks-tab/feedbacks-tab'
import { Page } from '@/components/layouts/page/page'
import { ModeratePostsTable } from '@/components/tables/moderate-posts-table/moderate-posts-table'
import {
  TabContentItem,
  TabGroup,
  TabItem,
  TabList,
} from '@/components/ui/tab-switcher/tab-switcher'
import { Typography } from '@/components/ui/typography/typography'
import { useAllFeedbacksQuery } from '@/services/feedbacks/feedbacks.service'
import { selectUserRole } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'

import s from './administrator.module.scss'

type AdminTabType = 'feedbacks' | 'users'

function Administrator() {
  const classNames = {
    page: clsx(s.page),
  }
  const userRoles = useSelector(selectUserRole)
  const router = useRouter()

  const [tabValue, setTabValue] = useState<AdminTabType>('feedbacks')

  const t = useTranslations('AdministratorPage')
  const locale = useLocale()

  const { data: feedbacks } = useAllFeedbacksQuery({
    locale,
    sortBy: '$createdAt',
  })

  useEffect(() => {
    if (!isRole(userRoles, 'Administrator')) {
      router.push(routes.base)
    }
  }, [userRoles])

  const tabChangeHandler = (value: string) => {
    setTabValue(value as AdminTabType)
  }

  return (
    <Page className={classNames.page}>
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
          {feedbacks && feedbacks.documents.length > 0 ? (
            <FeedbacksTab />
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
