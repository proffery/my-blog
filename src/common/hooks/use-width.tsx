'use client'
import { useEffect, useState } from 'react'

export const useWidth = () => {
  const [width, setWidth] = useState<number>(1000)
  const handleWindowResize = () => setWidth(window.innerWidth)

  useEffect(() => {
    handleWindowResize()

    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return width
}
