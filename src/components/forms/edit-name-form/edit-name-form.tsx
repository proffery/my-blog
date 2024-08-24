import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { CloseIcon } from '@/assets/icons/components/close-icon'
import { EditIcon } from '@/assets/icons/components/edit-icon'
import { EditNameValues, editNameSchema } from '@/components/forms/edit-name-form/schema'
import { Button } from '@/components/ui/button/button'
import { FieldError } from '@/components/ui/field-error/field-error'
import { Input, InputProps } from '@/components/ui/input/input'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import s from './edit-name-form.module.scss'

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
    editButton: clsx(s.editButton),
    editIcon: clsx(s.editIcon),
    form: clsx(s.form),
    input: clsx(s.input),
    span: clsx(s.span),
  }
  const [editMode, setEditMode] = useState(false)

  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<EditNameValues>({
    defaultValues: {
      name: defaultValue,
    },
    resolver: zodResolver(editNameSchema),
  })

  useEffect(() => {
    if (errorMessage) {
      setError('name', { message: errorMessage, type: 'server' })
    } else {
      clearErrors(['name'])
    }
  }, [errorMessage, editMode])

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
        <Button
          className={classNames.editButton}
          disabled={disabled}
          onClick={handleToggleEditMode}
          type={'button'}
        >
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
        type={'button'}
      >
        <CloseIcon className={classNames.closeIcon} />
      </Button>
    </form>
  )
}
