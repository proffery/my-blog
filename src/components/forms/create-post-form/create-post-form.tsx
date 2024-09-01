import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
  CreatePostFormValues,
  createPostFormSchema,
} from '@/components/forms/create-post-form/schema'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { TextEditor } from '@/components/ui/text-editor/text-editor'
import { Typography } from '@/components/ui/typography/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './create-post-form.module.scss'

type Props = {
  defaultValues?: CreatePostFormValues
  disabled?: boolean
  errorMessage?: string
  onSubmit: (data: CreatePostFormValues) => void
}

export const CreatePostForm = ({ defaultValues, disabled, errorMessage, onSubmit }: Props) => {
  const classNames = {
    form: clsx(s.form),
    singUpButton: clsx(s.singUpButton),
    title: clsx(s.title),
  }

  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<CreatePostFormValues>({
    defaultValues: { post: defaultValues?.post, title: defaultValues?.title },
    resolver: zodResolver(createPostFormSchema),
  })

  useEffect(() => {
    if (errorMessage) {
      setError('post', { message: errorMessage, type: 'server' })
    } else {
      clearErrors(['post'])
    }
  }, [errorMessage])

  useEffect(() => {
    defaultValues?.post && setValue('post', defaultValues?.post)
    defaultValues?.title && setValue('title', defaultValues?.title)
  }, [defaultValues?.title, defaultValues?.post])

  const handleFormSubmit = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <form className={classNames.form} onSubmit={handleFormSubmit}>
      {defaultValues ? (
        <Typography.H1 className={classNames.title}>Редактировать пост</Typography.H1>
      ) : (
        <Typography.H1 className={classNames.title}>Написать пост</Typography.H1>
      )}
      <Input
        defaultValue={defaultValues?.title}
        errorMessage={errors.title?.message}
        label={'Заголовок'}
        placeholder={'Как организовать домашний офис'}
        {...register('title')}
      />
      <Controller
        control={control}
        name={'post'}
        render={({ field: { onChange, ref, ...restField } }) => (
          <TextEditor
            defaultValue={defaultValues?.post}
            errorMessage={errors.post?.message}
            label={'Пост'}
            onChange={onChange}
            ref={ref}
            {...restField}
          />
        )}
      />

      <Button
        className={classNames.singUpButton}
        disabled={disabled}
        type={'submit'}
        variant={'secondary'}
      >
        Отправить
      </Button>
    </form>
  )
}
