import React, { ReactNode, useRef } from 'react'

import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import clsx from 'clsx'
import { FreeMode, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4 as uuidv4 } from 'uuid'

import 'swiper/swiper-bundle.css'

import s from '@/components/ui/swiper/swiper.module.scss'

type SwiperProps = {
  children: ReactNode
  onSliderMove?: (value: boolean) => void
  showNavigation?: boolean
  showPagination?: boolean
}
export const SwiperComponent = (props: SwiperProps) => {
  const { children, onSliderMove, showNavigation = true, showPagination = true } = props
  const swiperRef = useRef<any>()
  const classNames = {
    arrowIcon: clsx(s.arrowIcon),
    container: clsx(s.container),
    navButtonLeft: clsx(s.navButtonLeft),
    navButtonRight: clsx(s.navButtonRight),
    slide: clsx(s.slide),
    slideContent: clsx(s.slideContent),
    swiper: clsx(s.swiper),
  }
  const pagination = {
    clickable: true,
  }

  const onPrevHandler = () => {
    swiperRef.current.slidePrev()
  }

  const onNextHandler = () => {
    swiperRef.current.slideNext()
  }

  return (
    <div className={classNames.container}>
      {showNavigation && (
        <button className={classNames.navButtonLeft} onClick={onPrevHandler} type={'button'}>
          <RightBracketIcon className={classNames.arrowIcon} />
        </button>
      )}
      <Swiper
        className={classNames.swiper}
        loop
        modules={[Navigation, Pagination, FreeMode]}
        onSlideChangeTransitionEnd={() => onSliderMove?.(false)}
        onSlideChangeTransitionStart={() => onSliderMove?.(true)}
        onSwiper={swiper => {
          swiperRef.current = swiper
        }}
        {...(showPagination ? { pagination } : {})}
      >
        {React.Children.map(children, child => (
          <SwiperSlide className={classNames.slide} key={uuidv4()}>
            <div className={classNames.slideContent}>{child}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      {showNavigation && (
        <button className={classNames.navButtonRight} onClick={onNextHandler} type={'button'}>
          <RightBracketIcon className={classNames.arrowIcon} />
        </button>
      )}
    </div>
  )
}
