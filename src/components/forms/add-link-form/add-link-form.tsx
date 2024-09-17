import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { Input, InputProps } from '@/components/ui/input/input'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import s from './add-link-form.module.scss'

export type AddLinkValues = { link: string }

type Props = {
  defaultValue?: string
  onSubmit?: (data: AddLinkValues) => void
} & Omit<InputProps, 'onSubmit'>

export const AddLinkForm = ({ defaultValue, onSubmit }: Props) => {
  const classNames = {
    form: clsx(s.form),
  }

  const t = useTranslations('Components.Forms.AddLink')

  const addLinkSchema = z.object({
    link: z
      .string()
      .min(1, { message: t('ErrorMessage1') })
      .refine(
        value =>
          /^(http|https|ftp|mailto):\/\/[a-zA-Z0-9\-\\.]+(?:\.[a-zA-Z]{2,6})+(?:\/\S*)?$/.test(
            value ?? ''
          ),
        t('ErrorMessage2')
      ),
  })
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<z.infer<typeof addLinkSchema>>({
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
        placeholder={t('placeholder')}
        {...register('link')}
      />
      &nbsp;
      <Button disabled={!!errors.link?.message} onClick={handleFormSubmit} type={'button'}>
        {t('SubmitButton')}
      </Button>
    </form>
  )
}
