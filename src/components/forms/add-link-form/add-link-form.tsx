import { useForm } from 'react-hook-form'

import { AddLinkValues, addLinkSchema } from '@/components/forms/add-link-form/schema'
import { Button } from '@/components/ui/button/button'
import { Input, InputProps } from '@/components/ui/input/input'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './add-link-form.module.scss'

type Props = {
  defaultValue?: string
  onSubmit?: (data: AddLinkValues) => void
} & Omit<InputProps, 'onSubmit'>

export const AddLinkForm = ({ defaultValue, onSubmit }: Props) => {
  const classNames = {
    form: clsx(s.form),
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<AddLinkValues>({
    defaultValues: {
      link: defaultValue,
    },
    resolver: zodResolver(addLinkSchema),
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
