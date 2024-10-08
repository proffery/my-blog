import { ComponentPropsWithoutRef, ElementType, FC, ReactNode } from 'react'

import clsx from 'clsx'

import s from './typography.module.scss'

export type TypographyProps<T extends ElementType = 'span'> = {
  as?: T
  children?: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>

const createTypographyComponent = <T extends ElementType>(
  basicClassName: Component
): FC<TypographyProps<T>> => {
  return ({ as, children, className, ...rest }) => {
    const Component = as || COMPONENTS[basicClassName] || 'span'

    const classNames = {
      component: clsx(s.typography, s[basicClassName], className),
    }

    return (
      <Component className={classNames.component} {...rest}>
        {children}
      </Component>
    )
  }
}

export const Typography = {
  Body1: createTypographyComponent('body1'),
  Body2: createTypographyComponent('body2'),
  Caption: createTypographyComponent('caption'),
  H1: createTypographyComponent('h1'),
  H2: createTypographyComponent('h2'),
  H3: createTypographyComponent('h3'),
  H4: createTypographyComponent('h4'),
  H5: createTypographyComponent('h5'),
  H6: createTypographyComponent('h6'),
  Link1: createTypographyComponent('link1'),
  Link2: createTypographyComponent('link2'),
  Overline: createTypographyComponent('overline'),
  Subtitle1: createTypographyComponent('subtitle1'),
  Subtitle2: createTypographyComponent('subtitle2'),
}

const COMPONENTS = {
  body1: 'p',
  body2: 'p',
  caption: 'span',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  link1: 'a',
  link2: 'a',
  overline: 'p',
  subtitle1: 'p',
  subtitle2: 'p',
} as const

type Component = keyof typeof COMPONENTS
