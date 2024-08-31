import { useForm } from 'react-hook-form'

import {
  AddTiktokIdValues,
  addTiktokIdSchema,
} from '@/components/forms/add-tiktok-id-form/add-tiktok-id-schema'
import { Button } from '@/components/ui/button/button'
import { Input, InputProps } from '@/components/ui/input/input'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './add-tiktok-id-form.module.scss'

type Props = {
  defaultValue?: string
  onSubmit?: (data: AddTiktokIdValues) => void
} & Omit<InputProps, 'onSubmit'>

export const AddTiktokIdForm = ({ defaultValue, onSubmit }: Props) => {
  const classNames = {
    form: clsx(s.form),
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AddTiktokIdValues>({
    defaultValues: {
      link: defaultValue,
    },
    resolver: zodResolver(addTiktokIdSchema),
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
