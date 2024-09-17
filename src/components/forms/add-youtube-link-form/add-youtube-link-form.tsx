import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/button'
import { Input, InputProps } from '@/components/ui/input/input'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import s from './add-youtube-link-form.module.scss'

export type AddYoutubeValues = { link: string }

type Props = {
  defaultValue?: string
  onSubmit?: (data: AddYoutubeValues) => void
} & Omit<InputProps, 'onSubmit'>

export const AddYoutubeLinkForm = ({ defaultValue, onSubmit }: Props) => {
  const classNames = {
    form: clsx(s.form),
  }
  const t = useTranslations('Components.Forms.AddYoutubeLink')

  const addYoutubeLinkSchema = z.object({
    link: z
      .string()
      .min(1, { message: t('ErrorMessage1') })
      .refine(
        value =>
          /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi.test(
            value ?? ''
          ),
        t('ErrorMessage2')
      ),
  })

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<z.infer<typeof addYoutubeLinkSchema>>({
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
