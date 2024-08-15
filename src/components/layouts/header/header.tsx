'use client'
import { breakpoints } from '@/common/constants/breakpoints'
import { routes } from '@/common/constants/routes'
import { useWidth } from '@/common/hooks/use-width'
import { NavbarDesktop } from '@/components/layouts/navbar/navbar-desktop/navbar-desktop'
import { NavbarMobile } from '@/components/layouts/navbar/navbar-mobile/navbar-mobile'
import { Button } from '@/components/ui/button/button'
import { Logo } from '@/components/ui/logo/logo'
import clsx from 'clsx'
import Link from 'next/link'

import s from './header.module.scss'
export const Header = () => {
  const classNames = {
    container: clsx(s.container),
    navWrapper: clsx(s.navWrapper),
    root: clsx(s.root),
  }

  const isAuthenticated = true
  const width = useWidth()

  return (
    <header className={classNames.root}>
      <div className={classNames.container}>
        <Logo />
        <div className={classNames.navWrapper}>
          {width > breakpoints.mobile ? (
            <NavbarDesktop />
          ) : (
            <NavbarMobile isAuthenticated={isAuthenticated} />
          )}
          {!isAuthenticated && (
            <Button as={Link} href={routes.login}>
              Log in
            </Button>
          )}
          {isAuthenticated && width > breakpoints.mobile && <Button>Log Out</Button>}
        </div>
      </div>
    </header>
  )
}
