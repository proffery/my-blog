'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { isRole } from '@/common/utils/is-role'
import { FeedbacksTab } from '@/components/layouts/administrator-page/feedbacks-tab/feedbacks-tab'
import { useFeedbacksFilters } from '@/components/layouts/administrator-page/use-feedbacks-filters'
import { UsersTab } from '@/components/layouts/administrator-page/users-tab/users-tab'
import { Page } from '@/components/layouts/page/page'
import {
  TabContentItem,
  TabGroup,
  TabItem,
  TabList,
} from '@/components/ui/tab-switcher/tab-switcher'
import { Typography } from '@/components/ui/typography/typography'
import { selectUserRole } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import s from './administrator.module.scss'

function Administrator() {
  const classNames = {
    page: clsx(s.page),
    tabList: clsx(s.tabList),
  }
  const userRoles = useSelector(selectUserRole)
  const router = useRouter()

  const [tabValue, setTabValue] = useState('feedbacks')
  const { setSortBy } = useFeedbacksFilters()
  const t = useTranslations('AdministratorPage')

  useEffect(() => {
    if (!isRole(userRoles, 'Administrator')) {
      router.push(routes.base)
    }
  }, [userRoles, router])

  useEffect(() => {
    setSortBy(null)
  }, [tabValue, setSortBy])

  return (
    <Page className={classNames.page}>
      <Typography.H1>{t('title')}</Typography.H1>
      <TabGroup defaultValue={'feedbacks'} onValueChange={value => setTabValue(value)}>
        <TabList className={classNames.tabList}>
          <TabItem selected={tabValue === 'feedbacks'} value={'feedbacks'}>
            {t('AdminTabs.Feedbacks.button')}
          </TabItem>
          <TabItem selected={tabValue === 'users'} value={'users'}>
            {t('AdminTabs.Users.button')}
          </TabItem>
        </TabList>
        <TabContentItem value={'feedbacks'}>
          <FeedbacksTab />
        </TabContentItem>
        <TabContentItem value={'users'}>
          <UsersTab />
        </TabContentItem>
      </TabGroup>
    </Page>
  )
}
export default withRedux(Administrator)
