'use client'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { Page } from '@/components/layouts/page/page'
import { useMeQuery } from '@/services/auth/auth.service'
import { selectUserIsAuthenticated } from '@/services/user/user.selectors'
import { redirect } from 'next/navigation'

function Account() {
  const { data: meData } = useMeQuery()
  const isAuthenticated = useSelector(selectUserIsAuthenticated)

  if (!isAuthenticated) {
    redirect(routes.login)
  }

  return (
    <Page>
      <ul>
        <li>
          <strong>ID: </strong> {meData?.user?.$id}
        </li>
        <li>
          <strong>Name:</strong> {meData?.user?.name}
        </li>
        <li>
          <strong>Email:</strong> {meData?.user?.email}
        </li>
        {meData?.user?.labels.length && meData.user.labels.length > 0 && (
          <li>
            <strong>Status:</strong>{' '}
            {meData.user.labels.map(label => (
              <span key={label}>{label}&nbsp;</span>
            ))}
          </li>
        )}
      </ul>
    </Page>
  )
}
export default withRedux(Account)
