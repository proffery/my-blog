'use client'

import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { getErrorMessage } from '@/common/utils/get-error-message'
import { EditNameForm, EditNameValues } from '@/components/forms/edit-name-form/edit-name-form'
import {
  UploadAvatarForm,
  UploadAvatarFormValues,
} from '@/components/forms/upload-avatar-form/upload-avatar-form'
import { LangSelect } from '@/components/layouts/lang-select/lang-select'
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
import { useTranslations } from 'next-intl'

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

  const t = useTranslations('MyAccountPage')

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
      <Typography.H1>{t('title')}</Typography.H1>
      <div className={classNames.container}>
        <div className={classNames.avatarWrapper}>
          <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Typography.Subtitle1 as={'h3'}>{t('Avatar.title')}</Typography.Subtitle1>
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
                {t('Avatar.DeleteButton')}
              </Button>
            </FieldError>
          )}
        </div>
        <div className={classNames.item}>
          <Typography.Subtitle1>{t('Name.title')}&nbsp;</Typography.Subtitle1>
          <EditNameForm
            defaultValue={meData?.user?.name}
            errorMessage={nameErrorMessage}
            onSubmit={handleChangeNameSubmit}
          />
        </div>
        <div className={classNames.item}>
          <Typography.Subtitle1 as={'span'}>{t('Language.title')}&nbsp;</Typography.Subtitle1>
          <LangSelect />
        </div>
        <div className={classNames.item}>
          <Typography.Subtitle1>{t('Status.title')}&nbsp;</Typography.Subtitle1>
          {meData?.user?.labels.length ? (
            meData.user.labels.map(label => (
              <Typography.Body1 key={label}>{label}&nbsp;</Typography.Body1>
            ))
          ) : (
            <Typography.Body1>User</Typography.Body1>
          )}
        </div>
        <div className={classNames.item}>
          <Typography.Subtitle1>{t('Email.title')}&nbsp;</Typography.Subtitle1>{' '}
          <Typography.Body1>{meData?.user?.email} &nbsp;</Typography.Body1>
          {meData?.user?.emailVerification ? (
            <Typography.Subtitle2>{t('Email.Confirmed')}</Typography.Subtitle2>
          ) : (
            <Typography.Subtitle2>{t('Email.NotConfirmed')}</Typography.Subtitle2>
          )}
        </div>
        {!meData?.user?.emailVerification && (
          <Button onClick={sendVerifyEmailHandler} style={{ alignSelf: 'center' }} type={'submit'}>
            {t('Email.ConfirmButton')}
          </Button>
        )}
      </div>
    </Page>
  )
}
export default withRedux(Account)
