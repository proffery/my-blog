import { ReactNode } from 'react'

import { BackButton } from '@/components/ui/back-button/back-button'

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
