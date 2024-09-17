import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import s from './login-form.module.scss'

export type LoginEmailFormValues = {
  email: string
  password: string
}

type Props = {
  disabled?: boolean
  errorMessage?: string
  onSubmit: (data: LoginEmailFormValues) => void
}

export const LoginForm = ({ disabled, errorMessage, onSubmit }: Props) => {
  const classNames = {
    form: clsx(s.form),
    singUpButton: clsx(s.singUpButton),
  }

  const t = useTranslations('Components.Forms.Login')

  const loginEmailSchema = z.object({
    email: z.string().email({ message: t('Email.ErrorMessage') }),
    password: z.string().min(8, { message: t('Password.ErrorMessage') }),
  })

  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<z.infer<typeof loginEmailSchema>>({
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
      <Input
        autoComplete={'email'}
        errorMessage={errors.email?.message}
        label={t('Email.label')}
        placeholder={t('Email.placeholder')}
        {...register('email')}
      />
      <Input
        autoComplete={'current-password webauthn'}
        errorMessage={errors.password?.message}
        label={t('Password.label')}
        placeholder={t('Password.placeholder')}
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
        {t('SubmitButton')}
      </Button>
    </form>
  )
}
