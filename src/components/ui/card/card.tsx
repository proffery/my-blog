import { ComponentPropsWithoutRef, ElementRef, ElementType, Ref, forwardRef } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

type Props<T extends ElementType> = {
  as?: T
} & ComponentPropsWithoutRef<T>

export const Card = forwardRef(
  <T extends ElementType = 'div'>(
    { as, className, ...restProps }: Props<T>,
    ref: Ref<ElementRef<T>>
  ) => {
    const Component: ElementType = as || 'div'

    const classNames = clsx(s.card, className)

    return <Component className={classNames} ref={ref} {...restProps} />
  }
) as <T extends ElementType = 'div'>(props: { ref?: Ref<ElementRef<T>> } & Props<T>) => JSX.Element
