import { ReactNode } from 'react'

import { BackButtonLayout } from '@/components/layouts/back-button-layout/back-button-layout'

export default function AccountLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <BackButtonLayout />
      {children}
    </>
  )
}
