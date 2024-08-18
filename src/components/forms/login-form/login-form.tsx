import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { LoginEmailFormValues, loginEmailSchema } from '@/components/forms/login-form/schema'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Typography } from '@/components/ui/typography/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './login-form.module.scss'

type Props = {
  disabled?: boolean
  errorMessage?: string
  onSubmit: (data: LoginEmailFormValues) => void
}

export const LoginForm = ({ disabled, errorMessage, onSubmit }: Props) => {
  const classNames = {
    form: clsx(s.form),
    singUpButton: clsx(s.singUpButton),
    title: clsx(s.title),
  }

  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginEmailFormValues>({
    resolver: zodResolver(loginEmailSchema),
  })

  useEffect(() => {
    if (errorMessage) {
      setError('password', { message: errorMessage, type: 'server' })
    } else {
      clearErrors(['password'])
    }
  }, [errorMessage])

  const handleFormSubmit = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <form className={classNames.form} onSubmit={handleFormSubmit}>
      <Typography.H1 className={classNames.title}>Вход</Typography.H1>
      <Input
        autoComplete={'email'}
        errorMessage={errors.email?.message}
        label={'Почта'}
        placeholder={'mymail@mail.com'}
        {...register('email')}
      />
      <Input
        autoComplete={'current-password webauthn'}
        errorMessage={errors.password?.message}
        label={'Пароль'}
        placeholder={'Ваш пароль'}
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
        Войти
      </Button>
    </form>
  )
}
