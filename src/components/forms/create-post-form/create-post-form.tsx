import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { TextEditor } from '@/components/ui/text-editor/text-editor'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import s from './create-post-form.module.scss'

export type CreatePostFormValues = {
  cover?: string
  post: string
  title: string
}

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

  const t = useTranslations('Components.Forms.CreatePost')

  const createPostFormSchema = z.object({
    cover: z
      .string()
      .optional()
      .refine(
        value => /^((http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|webp|svg)))$|^$/.test(value ?? ''),
        t('Cover.ErrorMessage')
      ),
    post: z.string(),
    title: z.string().min(1, { message: t('Title.ErrorMessage') }),
  })

  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<z.infer<typeof createPostFormSchema>>({
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
        label={t('Title.label')}
        placeholder={t('Title.placeholder')}
        {...register('title')}
      />
      <Input
        defaultValue={defaultValues?.cover}
        errorMessage={errors.cover?.message}
        label={t('Cover.label')}
        placeholder={t('Cover.placeholder')}
        {...register('cover')}
      />
      <Controller
        control={control}
        name={'post'}
        render={({ field: { onChange, ref, ...restField } }) => (
          <TextEditor
            defaultValue={defaultValues?.post}
            label={t('Post.label')}
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
        {t('SubmitButton')}
      </Button>
    </form>
  )
}
