import { User } from '@/app/api/users/users.types'
import { routes } from '@/common/constants/routes'
import { Page } from '@/components/layouts/page/page'
import { Typography } from '@/components/ui/typography/typography'
import { allUsers } from '@/server/functions/users/all-users'
import { userById } from '@/server/functions/users/user-by-id'
import { createUsersClient } from '@/server/users-config'
import clsx from 'clsx'
import { redirect } from 'next/navigation'

import s from './account.module.scss'

type Props = {
  params: { userId: string }
}

export const dynamicParams = true

export const generateStaticParams = async () => {
  const { usersInstance } = await createUsersClient()
  const usersData = await allUsers({ usersInstance })

  return usersData.users?.map((user: User) => ({
    userId: user.$id,
  })) as any[]
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
  const { usersInstance } = await createUsersClient()

  const userData = await userById({ userId, usersInstance }).catch(() => {
    redirect(routes.account)
  })

  return (
    <Page className={classNames.page}>
      <Typography.H1>Профиль</Typography.H1>
      <div className={classNames.container}>
        <div className={classNames.item}>
          <Typography.Subtitle1>ID:&nbsp;</Typography.Subtitle1>
          <Typography.Body1>{userData?.$id}</Typography.Body1>
        </div>
        <div className={classNames.item}>
          <Typography.Subtitle1>Имя:&nbsp;</Typography.Subtitle1>
          <Typography.Body1>{userData?.name}</Typography.Body1>
        </div>
        <div className={classNames.item}>
          {userData?.labels.length ? (
            <Typography.Subtitle1>Роль:&nbsp;</Typography.Subtitle1>
          ) : null}
          {userData?.labels.map((label: string) => (
            <Typography.Subtitle1 key={label}>{label.toUpperCase()}&nbsp;</Typography.Subtitle1>
          ))}
        </div>
      </div>
    </Page>
  )
}
