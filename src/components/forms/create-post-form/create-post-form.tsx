import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
  CreatePostFormValues,
  createPostFormSchema,
} from '@/components/forms/create-post-form/schema'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { TextEditor } from '@/components/ui/text-editor/text-editor'
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
    defaultValues: {
      cover: defaultValues?.cover,
      post: defaultValues?.post,
      title: defaultValues?.title,
    },
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
    defaultValues?.cover && setValue('cover', defaultValues?.cover)
  }, [defaultValues?.title, defaultValues?.post, defaultValues?.cover])

  const handleFormSubmit = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <form className={classNames.form} onSubmit={handleFormSubmit}>
      <Input
        defaultValue={defaultValues?.title}
        errorMessage={errors.title?.message}
        label={'Заголовок'}
        placeholder={'Как организовать домашний офис'}
        {...register('title')}
      />
      <Input
        defaultValue={defaultValues?.cover}
        errorMessage={errors.cover?.message}
        label={'Обложка'}
        placeholder={'https://sub.domain.com/files/11-11-2011/example.jpg'}
        {...register('cover')}
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
