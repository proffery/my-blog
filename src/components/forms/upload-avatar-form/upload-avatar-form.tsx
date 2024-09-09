import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  UploadAvatarFormValues,
  uploadAvatarSchema,
} from '@/components/forms/upload-avatar-form/schema'
import { Avatar } from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button/button'
import { Label } from '@/components/ui/label/label'
import { Typography } from '@/components/ui/typography/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './upload-avatar-form.module.scss'

type Props = {
  disabled?: boolean
  onSubmit: (data: UploadAvatarFormValues) => void
}
export const UploadAvatarForm = ({ disabled, onSubmit }: Props) => {
  const classNames = {
    avatarInput: clsx(s.avatarInput),
    avatarLabel: clsx(s.avatarLabel),
    buttonsContainer: clsx(s.buttonsContainer),
    centeredContainer: clsx(s.centeredContainer),
    deletePhotoButton: clsx(s.deletePhotoButton),
    form: clsx(s.form),
    listHeader: clsx(s.listHeader),
  }

  const [image, setImage] = useState<File | null>(null)

  const { handleSubmit, register } = useForm<UploadAvatarFormValues>({
    resolver: zodResolver(uploadAvatarSchema),
  })
  const handleFormSubmit = handleSubmit(data => {
    onSubmit(data.file[0])
    setImage(null)
  })
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget?.files) {
      setImage(e.currentTarget?.files[0])
    }
  }
  const handlePhotoDelete = () => {
    setImage(null)
  }

  return (
    <form className={classNames.form} onSubmit={handleFormSubmit}>
      {image && (
        <>
          <div className={classNames.centeredContainer}>
            <Typography.Subtitle1 as={'h3'} className={classNames.listHeader}>
              Выбранный аватар:
            </Typography.Subtitle1>
            <Avatar size={'large'} url={URL.createObjectURL(image)} />
            <Typography.Subtitle2
              as={'button'}
              className={classNames.deletePhotoButton}
              onClick={handlePhotoDelete}
            >
              Отмена
            </Typography.Subtitle2>
          </div>
        </>
      )}
      <div className={classNames.buttonsContainer}>
        <Button as={Label} className={classNames.avatarLabel} htmlFor={'avatar'}>
          <input
            accept={'image/png, image/jpeg, image/jpg'}
            className={classNames.avatarInput}
            id={'avatar'}
            type={'file'}
            {...register('file')}
            onChange={handlePhotoChange}
          />
          {image ? 'Выбрать другой' : 'Выбрать аватар'}
        </Button>
        {image && (
          <Button disabled={disabled} type={'submit'}>
            Сохранить
          </Button>
        )}
      </div>
    </form>
  )
}