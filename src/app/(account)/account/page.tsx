'use client'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { getErrorMessage } from '@/common/utils/get-error-message'
import { EditNameForm } from '@/components/forms/edit-name-form/edit-name-form'
import { EditNameValues } from '@/components/forms/edit-name-form/schema'
import { UploadAvatarFormValues } from '@/components/forms/upload-avatar-form/schema'
import { UploadAvatarForm } from '@/components/forms/upload-avatar-form/upload-avatar-form'
import { Page } from '@/components/layouts/page/page'
import { Avatar } from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button/button'
import { Typography } from '@/components/ui/typography/typography'
import clearCachesByServerAction from '@/server/utils/clear-caches-by-server-action'
import {
  useChangeNameMutation,
  useCreateAvatarMutation,
  useMeQuery,
  useSendVerifyEmailMutation,
} from '@/services/auth/auth.service'
import { useGetAvatarMetaQuery, useGetAvatarQuery } from '@/services/users/users.service'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import s from './account.module.scss'

function Account() {
  const classNames = {
    avatarWrapper: clsx(s.avatarWrapper),
    container: clsx(s.container),
    item: clsx(s.item),
    page: clsx(s.page),
  }
  const { data: meData } = useMeQuery()
  const [sendVerifyEmail] = useSendVerifyEmailMutation()
  const [changeName, { error: changeNameError }] = useChangeNameMutation()

  const router = useRouter()

  const userId = meData?.user?.$id ?? ''

  // const { data: avatarMetaData } = useGetAvatarQuery({ params: { userId } })
  //
  // const avatarBuffer = avatarMetaData?.avatar
  // const avatarBlob = new Blob([avatarBuffer], {
  //   type: 'image/webp',
  // })

  const [createAvatar] = useCreateAvatarMutation()

  const sendVerifyEmailHandler = async () => {
    try {
      await sendVerifyEmail().unwrap()
      router.push(routes.confirmEmail)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeNameSubmit = async (data: EditNameValues) => {
    try {
      await changeName(data).unwrap()
      await clearCachesByServerAction(routes.account + '/' + meData?.user?.$id)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCreateAvatarSubmit = async (data: UploadAvatarFormValues) => {
    const { file } = data

    try {
      await createAvatar({ file, userId }).unwrap()
      await clearCachesByServerAction(routes.account + '/' + meData?.user?.$id)
    } catch (error) {
      console.error(error)
    }
  }

  const errorMessage = getErrorMessage(changeNameError)

  return (
    <Page className={classNames.page}>
      <Typography.H1>Мой профиль</Typography.H1>
      <div className={classNames.container}>
        <div className={classNames.avatarWrapper}>
          <UploadAvatarForm currentAvatarUrl={''} onSubmit={handleCreateAvatarSubmit} />
        </div>
        <div className={classNames.item}>
          <Typography.Subtitle1>Почта:&nbsp;</Typography.Subtitle1>{' '}
          <Typography.Body1>{meData?.user?.email} &nbsp;</Typography.Body1>
          {meData?.user?.emailVerification ? (
            <Typography.Subtitle2>(подтверждена)</Typography.Subtitle2>
          ) : (
            <Typography.Subtitle2>(не подтверждена)</Typography.Subtitle2>
          )}
        </div>
        <div className={classNames.item}>
          <Typography.Subtitle1>Имя:&nbsp;</Typography.Subtitle1>
          <EditNameForm
            defaultValue={meData?.user?.name}
            errorMessage={errorMessage}
            onSubmit={handleChangeNameSubmit}
          />
        </div>
        <div className={classNames.item}>
          {meData?.user?.labels.length ? (
            <Typography.Subtitle1>Роль:&nbsp;</Typography.Subtitle1>
          ) : null}
          {meData?.user?.labels.map(label => (
            <Typography.Body1 key={label}>{label.toUpperCase()}&nbsp;</Typography.Body1>
          ))}
        </div>
      </div>
      {!meData?.user?.emailVerification && (
        <Button onClick={sendVerifyEmailHandler} type={'submit'}>
          Подтвердить почту
        </Button>
      )}
    </Page>
  )
}
export default withRedux(Account)
