import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useIsMobile } from '@/common/hooks/use-is-mobile'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import s from './contact-us-form.module.scss'

export type ContactUsFormValues = {
  email: string
  message: string
  name: string
}

type Props = {
  defaultValues?: Omit<ContactUsFormValues, 'message'>
  disabled?: boolean
  errorMessage?: string
  isSubmitSuccess?: boolean
  onSubmit: (data: ContactUsFormValues) => void
}

export const ContactUsForm = ({
  defaultValues,
  disabled,
  errorMessage,
  isSubmitSuccess = false,
  onSubmit,
}: Props) => {
  const classNames = {
    form: clsx(s.form),
  }

  const isMobile = useIsMobile()
  const t = useTranslations('Components.Forms.ContactUs')

  const contactUsSchema = z.object({
    email: z.string().email({ message: t('Email.ErrorMessage') }),
    message: z.string().min(1, { message: t('Message.ErrorMessage') }),
    name: z.string().min(3, { message: t('Name.ErrorMessage') }),
  })

  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<z.infer<typeof contactUsSchema>>({
    defaultValues: {
      email: defaultValues?.email,
      name: defaultValues?.name,
    },
    resolver: zodResolver(contactUsSchema),
  })

  useEffect(() => {
    if (errorMessage) {
      setError('message', { message: errorMessage, type: 'server' })
    } else {
      clearErrors(['message'])
    }
  }, [errorMessage, setError, clearErrors])

  useEffect(() => {
    defaultValues?.name && setValue('name', defaultValues?.name)
    defaultValues?.email && setValue('email', defaultValues?.email)
    isSubmitSuccess && setValue('message', '')
  }, [defaultValues?.name, defaultValues?.email, isSubmitSuccess, setValue])

  const handleFormSubmit = handleSubmit(data => {
    onSubmit(data)
  })

  return (
    <form className={classNames.form} onSubmit={handleFormSubmit}>
      <div>
        <Input
          autoComplete={'name'}
          disabled={!!defaultValues?.name}
          errorMessage={errors.name?.message}
          label={t('Name.label')}
          placeholder={t('Name.placeholder')}
          {...register('name')}
        />
        <Input
          autoComplete={'email'}
          disabled={!!defaultValues?.email}
          errorMessage={errors.email?.message}
          label={t('Email.label')}
          placeholder={t('Email.placeholder')}
          {...register('email')}
        />
        <Input
          as={'textarea'}
          disabled={disabled}
          errorMessage={errors.message?.message}
          label={t('Message.label')}
          placeholder={t('Message.placeholder')}
          resize={false}
          {...register('message')}
        />
      </div>
      <Button fullWidth={isMobile} type={'submit'} variant={'secondary'}>
        {t('SubmitButton')}
      </Button>
    </form>
  )
}
