import { ReactNode } from 'react'

import { BackButton } from '@/components/layouts/back-button-layout/back-button'

export default function AccountLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <BackButton />
      {children}
    </>
  )
}
