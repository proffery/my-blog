import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Avatar } from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button/button'
import { FieldError } from '@/components/ui/field-error/field-error'
import { Label } from '@/components/ui/label/label'
import { Typography } from '@/components/ui/typography/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import s from './upload-avatar-form.module.scss'

const MAX_FILE_SIZE = 1000000 // 1MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export type UploadAvatarFormValues = { image: File }

type Props = {
  disabled?: boolean
  errorMessage?: string
  onSubmit: (data: UploadAvatarFormValues) => void
}
export const UploadAvatarForm = ({ disabled, errorMessage, onSubmit }: Props) => {
  const classNames = {
    avatarInput: clsx(s.avatarInput),
    avatarLabel: clsx(s.avatarLabel),
    buttonsContainer: clsx(s.buttonsContainer),
    centeredContainer: clsx(s.centeredContainer),
    form: clsx(s.form),
    listHeader: clsx(s.listHeader),
  }
  const t = useTranslations('Components.Forms.UploadAvatar')

  const uploadAvatarSchema = z.object({
    image: z
      .any()
      .refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
        message: `${t('ErrorMessage1')} ${ACCEPTED_IMAGE_TYPES.toString().replaceAll(
          'image/',
          ' '
        )}`,
      })
      // To not allow files larger than 1MB
      .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, {
        message: `${t('ErrorMessage2')} ${MAX_FILE_SIZE / 1000000}MB.`,
      }),
  })

  const [image, setImage] = useState<File | null>(null)

  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<z.infer<typeof uploadAvatarSchema>>({
    resolver: zodResolver(uploadAvatarSchema),
  })

  useEffect(() => {
    if (errorMessage) {
      setError('image', { message: errorMessage, type: 'server' })
    } else {
      clearErrors(['image'])
    }
  }, [errorMessage, clearErrors, setError])

  const handleFormSubmit = handleSubmit(data => {
    onSubmit(data.image[0])
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
    <FieldError errorMessage={errors.image?.message?.toString()}>
      <form className={classNames.form} onSubmit={handleFormSubmit}>
        {image && (
          <div className={classNames.centeredContainer}>
            <Typography.Subtitle1 as={'h3'} className={classNames.listHeader}>
              {t('NewAvatar')}
            </Typography.Subtitle1>
            <Avatar size={'large'} url={URL.createObjectURL(image)} />
          </div>
        )}
        <div className={classNames.buttonsContainer}>
          <Button as={Label} className={classNames.avatarLabel} htmlFor={'avatar'}>
            <input
              accept={ACCEPTED_IMAGE_TYPES.toString().replaceAll(',', ', ')}
              className={classNames.avatarInput}
              id={'avatar'}
              type={'file'}
              {...register('image')}
              onChange={handlePhotoChange}
            />
            {image ? t('SelectAnotherButton') : t('SelectPhotoButton')}
          </Button>
          {image && (
            <>
              <Button disabled={disabled} type={'submit'}>
                {t('SubmitButton')}
              </Button>
              <Button onClick={handlePhotoDelete} variant={'primary'}>
                {t('CancelButton')}
              </Button>
            </>
          )}
        </div>
      </form>
    </FieldError>
  )
}
