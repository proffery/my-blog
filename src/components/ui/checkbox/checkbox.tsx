import { ComponentPropsWithoutRef, ElementRef, forwardRef, useId } from 'react'

import { CheckboxChecked } from '@/assets/icons/components/checkbox-checked'
import { Label } from '@/components/ui/label/label'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import clsx from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  label?: string
  position?: 'left' | 'right'
} & ComponentPropsWithoutRef<typeof RadixCheckbox.Root>

export const Checkbox = forwardRef<ElementRef<typeof RadixCheckbox.Root>, CheckboxProps>(
  (
    { checked, className, disabled, label, position = 'left', required, ...rest }: CheckboxProps,
    ref
  ) => {
    const classNames = {
      checkbox: clsx(s.checkbox, disabled && s.disabled, checked && s.checked),
      container: clsx(s.container, className),
      icon: clsx(s.icon),
      indicator: clsx(s.indicator, disabled && s.disabled),
      label: clsx(s.label, disabled && s.disabled, position === 'right' && s.reverse),
    }

    const new_id = useId()

    return (
      <div className={classNames.container}>
        <Label className={classNames.label} htmlFor={rest.id ?? new_id}>
          <RadixCheckbox.Root
            checked={checked}
            className={classNames.checkbox}
            disabled={disabled}
            id={rest.id ?? new_id}
            ref={ref}
            required={required}
            {...rest}
          >
            <RadixCheckbox.Indicator className={classNames.indicator}>
              {checked && <CheckboxChecked className={classNames.icon} />}
            </RadixCheckbox.Indicator>
          </RadixCheckbox.Root>
          {label}
        </Label>
      </div>
    )
  }
)
