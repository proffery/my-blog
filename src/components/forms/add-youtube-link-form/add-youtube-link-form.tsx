import { useForm } from 'react-hook-form'

import {
  AddYoutubeValues,
  addYoutubeLinkSchema,
} from '@/components/forms/add-youtube-link-form/add-youtube-link-schema'
import { Button } from '@/components/ui/button/button'
import { Input, InputProps } from '@/components/ui/input/input'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './add-youtube-link-form.module.scss'

type Props = {
  defaultValue?: string
  onSubmit?: (data: AddYoutubeValues) => void
} & Omit<InputProps, 'onSubmit'>

export const AddYoutubeLinkForm = ({ defaultValue, onSubmit }: Props) => {
  const classNames = {
    form: clsx(s.form),
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AddYoutubeValues>({
    defaultValues: {
      link: defaultValue,
    },
    resolver: zodResolver(addYoutubeLinkSchema),
  })

  const handleFormSubmit = handleSubmit(data => {
    onSubmit?.(data)
  })

  return (
    <form className={classNames.form}>
      <Input
        as={'input'}
        autoComplete={'name'}
        errorMessage={errors.link?.message}
        {...register('link')}
      />
      &nbsp;
      <Button disabled={!!errors.link?.message} onClick={handleFormSubmit} type={'button'}>
        Добавить
      </Button>
    </form>
  )
}
