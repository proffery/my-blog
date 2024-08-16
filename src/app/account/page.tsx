'use client'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { Page } from '@/components/layouts/page/page'
import { selectIsAuthenticated } from '@/services/app/app.selectors'
import { useMeQuery } from '@/services/auth/auth.service'
import { redirect } from 'next/navigation'

function Account() {
  const { data: meData } = useMeQuery()
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    redirect(routes.login)
  }

  return (
    <Page>
      <ul>
        <li>
          <strong>Email:</strong> {meData.user.email}
        </li>
        <li>
          <strong>Name:</strong> {meData.user.name}
        </li>
        <li>
          <strong>ID: </strong> {meData.user.$id}
        </li>
      </ul>
    </Page>
  )
}
export default withRedux(Account)
