import { FormEvent, useEffect, useRef, useState } from 'react'

import { EditIcon } from '@/assets/icons/components/edit-icon'
import { Button } from '@/components/ui/button/button'
import { Input, InputProps } from '@/components/ui/input/input'
import clsx from 'clsx'

import s from './editable-span.module.scss'

type Props = { onSubmit?: () => void } & InputProps

export const EditableSpan = ({ defaultValue, onSubmit, ...rest }: Props) => {
  const classNames = {
    editButton: clsx(s.editButton),
    editIcon: clsx(s.editIcon),
    span: clsx(s.span),
  }

  const [editMode, setEditMode] = useState(false)
  const ref = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    ref?.current?.focus()
  }, [editMode])

  const editModeHandler = () => {
    setEditMode(!editMode)
  }

  const onBlurHandler = () => {
    editModeHandler()
    onSubmit?.()
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    editModeHandler()
    onSubmit?.()
  }

  return !editMode ? (
    <span className={classNames.span}>
      {defaultValue}
      &nbsp;
      <Button className={classNames.editButton} onClick={editModeHandler} type={'submit'}>
        <EditIcon className={classNames.editIcon} />
      </Button>
    </span>
  ) : (
    <form onSubmit={submitHandler}>
      <Input defaultValue={defaultValue} onBlur={onBlurHandler} {...rest} ref={ref} />
    </form>
  )
}
