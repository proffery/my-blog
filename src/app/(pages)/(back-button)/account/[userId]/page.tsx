import { UserModel } from '@/app/api/users/users.types'
import { routes } from '@/common/constants/routes'
import { Page } from '@/components/layouts/page/page'
import { Avatar } from '@/components/ui/avatar/avatar'
import { Typography } from '@/components/ui/typography/typography'
import { createDatabaseClient } from '@/server/database-config'
import { paginatedPosts } from '@/server/functions/database/posts/paginated-posts'
import { getAvatarMeta } from '@/server/functions/storage/get-avatar-meta'
import { allUsers } from '@/server/functions/users/all-users'
import { userById } from '@/server/functions/users/user-by-id'
import { createStorageClient } from '@/server/storage-config'
import { createUsersClient } from '@/server/users-config'
import clsx from 'clsx'
import { notFound, redirect } from 'next/navigation'
import { getLocale, getTranslations } from 'next-intl/server'

import s from './account.module.scss'

export const dynamicParams = true

export const generateStaticParams = async () => {
  const { usersInstance } = await createUsersClient()
  const usersData = await allUsers({ sort: 'asc', sortBy: '$createdAt', usersInstance })

  return usersData.users?.map((user: UserModel) => ({
    userId: user.$id,
  })) as any[]
}

export async function generateMetadata({ params: { userId } }: Props) {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'AccountPage' })

  const { usersInstance } = await createUsersClient()
  const userData = await userById({ userId, usersInstance }).catch(() => {
    notFound()
  })

  const { storageInstance } = await createStorageClient()

  const avatarMeta = await getAvatarMeta({ storageInstance, userId })

  return {
    alternates: { canonical: routes.account + '/' + userId },
    openGraph: {
      images: [
        {
          height: 600,
          url: avatarMeta.avatarUrl,
          width: 400,
        },
      ],
      title: `${t('title')} | ${userData.name}`,
      url: process.env.NEXT_PUBLIC_HOST_BASE + routes.account + '/' + userId,
    },
    title: { absolute: `${t('title')} | ${userData.name}` },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} | ${userData.name}`,
    },
  }
}

type Props = {
  params: { userId: string }
}

export default async function AccountById(props: Props) {
  const classNames = {
    avatarWrapper: clsx(s.avatarWrapper),
    container: clsx(s.container),
    item: clsx(s.item),
    page: clsx(s.page),
  }

  const t = await getTranslations('AccountPage')
  const locale = await getLocale()

  const {
    params: { userId },
  } = props
  const { usersInstance } = await createUsersClient()
  const { databasesInstance } = await createDatabaseClient()
  const { storageInstance } = await createStorageClient()

  const userData = await userById({ userId, usersInstance }).catch(() => {
    notFound()
  })

  const userPosts = await paginatedPosts({
    authorId: userId,
    databasesInstance,
    limit: 9999999,
    locale,
    offset: 0,
    search: '',
    sort: null,
    sortBy: null,
  })

  let userAvatarUrl

  try {
    const userAvatarMeta = await getAvatarMeta({ storageInstance, userId })

    userAvatarUrl = userAvatarMeta.avatarUrl
  } catch {
    userAvatarUrl = ''
  }

  return (
    <Page className={classNames.page}>
      <Typography.H1>{t('title')}</Typography.H1>
      <div className={classNames.container}>
        <div className={classNames.avatarWrapper}>
          <Avatar size={'large'} url={userAvatarUrl} />
        </div>
        <div className={classNames.item}>
          <Typography.Subtitle1>{t('Name.title')}&nbsp;</Typography.Subtitle1>
          <Typography.Body1>{userData?.name}</Typography.Body1>
        </div>
        <div className={classNames.item}>
          <Typography.Subtitle1>{t('Status.title')}&nbsp;</Typography.Subtitle1>
          {userData?.labels.length ? (
            userData.labels.map(label => (
              <Typography.Body1 key={label}>{label}&nbsp;</Typography.Body1>
            ))
          ) : (
            <Typography.Body1>User</Typography.Body1>
          )}
        </div>
        <div className={classNames.item}>
          <Typography.Subtitle1>{t('PostsCount.title')}&nbsp;</Typography.Subtitle1>
          <Typography.Body1>{userPosts.total}</Typography.Body1>
        </div>
      </div>
    </Page>
  )
}
