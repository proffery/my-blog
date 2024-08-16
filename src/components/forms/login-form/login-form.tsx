import { useForm } from 'react-hook-form'

import { LoginEmailFormValues, loginEmailSchema } from '@/components/forms/login-form/schema'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './login-form.module.scss'

type Props = {
  disabled?: boolean
  onSubmit: (data: LoginEmailFormValues) => void
}

export const LoginForm = ({ disabled, onSubmit }: Props) => {
  const classNames = {
    form: clsx(s.form),
    singUpButton: clsx(s.singUpButton),
  }

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginEmailFormValues>({
    resolver: zodResolver(loginEmailSchema),
  })

  const handleFormSubmit = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <form className={classNames.form} onSubmit={handleFormSubmit}>
      <Input
        errorMessage={errors.email?.message}
        label={'Email'}
        placeholder={'Email'}
        {...register('email')}
      />
      <Input
        errorMessage={errors.password?.message}
        label={'Password'}
        placeholder={'Password'}
        type={'password'}
        {...register('password')}
      />
      <Button
        className={classNames.singUpButton}
        disabled={disabled}
        type={'submit'}
        variant={'secondary'}
      >
        Sign in
      </Button>
    </form>
  )
}
