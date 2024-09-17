import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import s from './registration-form.module.scss'

export type RegistrationFormValues = {
  email: string
  name: string
  password: string
}

type Props = {
  disabled?: boolean
  errorMessage?: string
  onSubmit: (data: RegistrationFormValues) => void
}

export const RegistrationForm = ({ disabled, errorMessage, onSubmit }: Props) => {
  const classNames = {
    form: clsx(s.form),
    singUpButton: clsx(s.singUpButton),
  }

  const t = useTranslations('Components.Forms.Registration')

  const registrationSchema = z
    .object({
      confirmPassword: z.string().min(8, { message: t('ConfirmPassword.ErrorMessage') }),
      email: z.string().email({ message: t('Email.ErrorMessage') }),
      name: z.string().min(3, { message: t('Name.ErrorMessage') }),
      password: z.string().min(8, { message: t('Password.ErrorMessage') }),
    })
    .refine(schema => schema.password === schema.confirmPassword, {
      message: t('ErrorMessage'),
      path: ['confirmPassword'],
    })

  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
  })

  useEffect(() => {
    if (errorMessage) {
      setError('confirmPassword', { message: errorMessage, type: 'server' })
    } else {
      clearErrors(['confirmPassword'])
    }
  }, [errorMessage])

  const handleFormSubmit = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <form className={classNames.form} onSubmit={handleFormSubmit}>
      <Input
        autoComplete={'name'}
        errorMessage={errors.name?.message}
        label={t('Name.label')}
        placeholder={t('Name.placeholder')}
        {...register('name')}
      />
      <Input
        autoComplete={'email'}
        errorMessage={errors.email?.message}
        label={t('Email.label')}
        placeholder={t('Email.placeholder')}
        {...register('email')}
      />
      <Input
        autoComplete={'password'}
        errorMessage={errors.password?.message}
        label={t('Password.label')}
        placeholder={t('Password.placeholder')}
        type={'password'}
        {...register('password')}
      />
      <Input
        autoComplete={'confirmPassword'}
        errorMessage={errors.confirmPassword?.message}
        placeholder={t('ConfirmPassword.placeholder')}
        type={'password'}
        {...register('confirmPassword')}
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
