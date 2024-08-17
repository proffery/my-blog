import { useForm } from 'react-hook-form'

import {
  RegistrationFormValues,
  registrationSchema,
} from '@/components/forms/registration-form/schema'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Typography } from '@/components/ui/typography/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './registration-form.module.scss'

type Props = {
  disabled?: boolean
  onSubmit: (data: RegistrationFormValues) => void
}

export const RegistrationForm = ({ disabled, onSubmit }: Props) => {
  const classNames = {
    form: clsx(s.form),
    singUpButton: clsx(s.singUpButton),
    title: clsx(s.title),
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  })

  const handleFormSubmit = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <form className={classNames.form} onSubmit={handleFormSubmit}>
      <Typography.H1 className={classNames.title}>Регистрация</Typography.H1>
      <Input
        autoComplete={'name'}
        errorMessage={errors.name?.message}
        label={'Имя'}
        placeholder={'Ваше имя'}
        {...register('name')}
      />
      <Input
        autoComplete={'email'}
        errorMessage={errors.email?.message}
        label={'Почта'}
        placeholder={'mymail@mail.com'}
        {...register('email')}
      />
      <Input
        autoComplete={'billing new-password'}
        errorMessage={errors.password?.message}
        label={'Пароль'}
        placeholder={'Придумайте пароль'}
        type={'password'}
        {...register('password')}
      />
      <Button
        className={classNames.singUpButton}
        disabled={disabled}
        fullWidth
        type={'submit'}
        variant={'secondary'}
      >
        Sign up
      </Button>
    </form>
  )
}
