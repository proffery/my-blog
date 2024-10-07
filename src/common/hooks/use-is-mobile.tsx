'use client'
import { useEffect, useState } from 'react'

import { constants } from '@/common/constants/constants'

export const useIsMobile = () => {
  const [width, setWidth] = useState<number>(1000)
  const handleWindowResize = () => setWidth(window.innerWidth)

  useEffect(() => {
    handleWindowResize()

    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return width <= constants.mobileWidth
}
