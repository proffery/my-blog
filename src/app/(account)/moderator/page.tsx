'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { isRole } from '@/common/utils/is-role'
import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
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

  useEffect(() => {
    if (!isRole(userRoles, 'Moderator')) {
      router.push(routes.base)
    }
  }, [userRoles])

  return (
    <Page className={classNames.page}>
      <Typography.H1>Модерация постов</Typography.H1>
    </Page>
  )
}
export default withRedux(Moderator)
