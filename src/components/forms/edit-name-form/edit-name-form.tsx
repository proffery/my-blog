import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { CloseIcon } from '@/assets/icons/components/close-icon'
import { EditIcon } from '@/assets/icons/components/edit-icon'
import { Button } from '@/components/ui/button/button'
import { FieldError } from '@/components/ui/field-error/field-error'
import { Input, InputProps } from '@/components/ui/input/input'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import s from './edit-name-form.module.scss'

export type EditNameValues = { name: string }

type Props = {
  defaultValue?: string
  disabled?: boolean
  errorMessage?: string
  onSubmit?: (data: EditNameValues) => void
} & Omit<InputProps, 'defaultValue' | 'disabled' | 'errorMessage' | 'onSubmit'>

export const EditNameForm = ({ defaultValue, disabled, errorMessage, onSubmit }: Props) => {
  const classNames = {
    closeButton: clsx(s.closeButton),
    closeIcon: clsx(s.closeIcon),
    editIcon: clsx(s.editIcon),
    form: clsx(s.form),
    input: clsx(s.input),
    span: clsx(s.span),
  }

  const t = useTranslations('Components.Forms.EditName')

  const editNameSchema = z.object({
    name: z
      .string()
      .min(3, { message: t('ErrorMessage1') })
      .max(32, { message: t('ErrorMessage2') }),
  })

  const [editMode, setEditMode] = useState(false)

  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<z.infer<typeof editNameSchema>>({
    defaultValues: {
      name: defaultValue,
    },
    resolver: zodResolver(editNameSchema),
  })

  useEffect(() => {
    defaultValue && setValue('name', defaultValue)
  }, [defaultValue, setValue])

  useEffect(() => {
    if (errorMessage) {
      setError('name', { message: errorMessage, type: 'server' })
    } else {
      clearErrors(['name'])
    }
  }, [errorMessage, editMode, clearErrors, setError])

  const handleToggleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleBlur = handleSubmit(data => {
    onSubmit?.(data)
    handleToggleEditMode()
  })

  const handleFormSubmit = handleSubmit(data => {
    onSubmit?.(data)
    handleToggleEditMode()
  })

  return !editMode ? (
    <FieldError errorMessage={errors.name?.message}>
      <span className={classNames.span}>
        {defaultValue}
        &nbsp;
        <Button disabled={disabled} onClick={handleToggleEditMode} padding={false} type={'button'}>
          <EditIcon className={classNames.editIcon} />
        </Button>
      </span>
    </FieldError>
  ) : (
    <form className={classNames.form} onBlur={handleBlur} onSubmit={handleFormSubmit}>
      <Input
        as={'input'}
        autoComplete={'name'}
        className={classNames.input}
        disabled={disabled}
        errorMessage={errors.name?.message}
        {...register('name')}
      />
      &nbsp;
      <Button
        className={classNames.closeButton}
        disabled={disabled}
        onClick={handleToggleEditMode}
        padding={false}
        type={'button'}
      >
        <CloseIcon className={classNames.closeIcon} />
      </Button>
    </form>
  )
}
