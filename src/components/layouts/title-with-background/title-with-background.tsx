import { ComponentPropsWithoutRef, ReactNode } from 'react'

import clsx from 'clsx'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import s from './title-with-background.module.scss'

type Props = {
  children?: ReactNode
  height: number
  imageAlt: string
  position?: 'center' | 'flex-end' | 'flex-start' | 'space-between'
  src: StaticImport | string
  width: number
} & ComponentPropsWithoutRef<'div'>

export const TitleWithBackground = ({
  children,
  height,
  imageAlt,
  position = 'space-between',
  src,
  width,
}: Props) => {
  const classNames = {
    titleWithBackgroundImage: clsx(s.titleWithBackgroundImage),
    titleWithBackgroundWrapper: clsx(s.titleWithBackgroundWrapper),
  }

  return (
    <div
      className={classNames.titleWithBackgroundWrapper}
      style={{
        height: `${height}px`,
        justifyContent: position,
      }}
    >
      {children}
      <Image
        alt={imageAlt}
        className={classNames.titleWithBackgroundImage}
        height={height}
        src={src}
        width={width}
      />
    </div>
  )
}
