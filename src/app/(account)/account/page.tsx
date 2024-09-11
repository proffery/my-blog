'use client'

import { useSelector } from 'react-redux'

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
import { FieldError } from '@/components/ui/field-error/field-error'
import { Typography } from '@/components/ui/typography/typography'
import clearCachesByServerAction from '@/server/utils/clear-caches-by-server-action'
import {
  useChangeNameMutation,
  useCreateAvatarMutation,
  useDeleteAvatarMutation,
  useMeQuery,
  useSendVerifyEmailMutation,
} from '@/services/auth/auth.service'
import { selectUserAvatarUrl, selectUserId } from '@/services/user/user.selectors'
import clsx from 'clsx'
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

  const userAvatarUrl = useSelector(selectUserAvatarUrl)
  const userId = useSelector(selectUserId) ?? ''

  const [createAvatar, { error: createAvatarError }] = useCreateAvatarMutation()
  const [deleteAvatar, { error: deleteAvatarError }] = useDeleteAvatarMutation()

  const createAvatarErrorMessage = getErrorMessage(createAvatarError)
  const deleteAvatarErrorMessage = getErrorMessage(deleteAvatarError)

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
      await clearCachesByServerAction(routes.account + '/' + userId)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCreateAvatarSubmit = async (data: UploadAvatarFormValues) => {
    const formData = new FormData()

    formData.append('file', data.image)
    formData.append('userId', userId)

    try {
      await createAvatar({ image: data, userId }).unwrap()
      await clearCachesByServerAction(routes.account + '/' + userId)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCreateAvatarDelete = async () => {
    try {
      await deleteAvatar({ userId }).unwrap()
      await clearCachesByServerAction(routes.account + '/' + userId)
    } catch (error) {
      console.error(error)
    }
  }

  const nameErrorMessage = getErrorMessage(changeNameError)

  return (
    <Page className={classNames.page}>
      <Typography.H1>Мой профиль</Typography.H1>
      <div className={classNames.container}>
        <div className={classNames.avatarWrapper}>
          <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Typography.Subtitle1 as={'h3'}>Аватар:&nbsp;</Typography.Subtitle1>
            <Avatar size={'large'} url={userAvatarUrl ?? ''} />
          </div>
          {!userAvatarUrl ? (
            <UploadAvatarForm
              errorMessage={createAvatarErrorMessage}
              onSubmit={handleCreateAvatarSubmit}
            />
          ) : (
            <FieldError errorMessage={deleteAvatarErrorMessage}>
              <Button onClick={handleCreateAvatarDelete} type={'button'}>
                Удалить аватар
              </Button>
            </FieldError>
          )}
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
            errorMessage={nameErrorMessage}
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
