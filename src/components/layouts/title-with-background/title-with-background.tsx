'use client'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Parallax } from 'react-scroll-parallax'

import { useIsMobile } from '@/common/hooks/use-is-mobile'
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
} & ComponentPropsWithoutRef<typeof Parallax>

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

  const isMobile = useIsMobile()

  return (
    <Parallax
      className={classNames.titleWithBackgroundWrapper}
      easing={'easeInQuad'}
      scale={[1, 0.96]}
      style={{
        height: `${height}px`,
        justifyContent: position,
      }}
      translateY={isMobile ? [-10, 10] : [-18, 24]}
    >
      {children}

      <Image
        alt={imageAlt}
        className={classNames.titleWithBackgroundImage}
        height={height}
        src={src}
        width={width}
      />
    </Parallax>
  )
}
