import { endpoints } from '@/common/constants/endpoints'
import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
import { createAdminUsers } from '@/server/users'
import { getData } from '@/server/utils/get-data'
import { GetUserRequest, GetUserResponse } from '@/services/users/users.types'
import clsx from 'clsx'

import s from './account.module.scss'

export const generateStaticParams = async () => {
  const { users } = await createAdminUsers()
  const usersData = await users.list()

  return usersData.users?.map(user => ({
    userId: user.$id,
  })) as any[]
}

type Props = {
  params: { userId: string }
}

export default async function AccountById(props: Props) {
  const classNames = {
    container: clsx(s.container),
    item: clsx(s.item),
    page: clsx(s.page),
  }
  const {
    params: { userId },
  } = props

  const userData = await getData<GetUserResponse, GetUserRequest>(`${endpoints.users_get_user}`, {
    body: { userId },
    method: 'POST',
  })

  return (
    <Page className={classNames.page}>
      <Typography.H1>Профиль</Typography.H1>
      <div className={classNames.container}>
        <div className={classNames.item}>
          <Typography.Subtitle1>ID:&nbsp;</Typography.Subtitle1>
          <Typography.Body1>{userData?.user?.$id}</Typography.Body1>
        </div>
        <div className={classNames.item}>
          <Typography.Subtitle1>Имя:&nbsp;</Typography.Subtitle1>
          <Typography.Body1>{userData?.user?.name}</Typography.Body1>
        </div>
        <div className={classNames.item}>
          {userData?.user?.labels.length ? (
            <Typography.Subtitle1>Группа:&nbsp;</Typography.Subtitle1>
          ) : null}
          {userData?.user?.labels.map(label => (
            <Typography.Subtitle1 key={label}>{label.toUpperCase()}&nbsp;</Typography.Subtitle1>
          ))}
        </div>
      </div>
    </Page>
  )
}
