'use client'
import { useSelector } from 'react-redux'

import { breakpoints } from '@/common/constants/breakpoints'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { useWidth } from '@/common/hooks/use-width'
import { NavbarDesktop } from '@/components/layouts/navbar/navbar-desktop/navbar-desktop'
import { NavbarMobile } from '@/components/layouts/navbar/navbar-mobile/navbar-mobile'
import { Button } from '@/components/ui/button/button'
import { Loader } from '@/components/ui/loader/loader'
import { Logo } from '@/components/ui/logo/logo'
import { selectAppIsLoading, selectIsAuthenticated } from '@/services/app/app.selectors'
import { useLogoutMutation, useMeQuery } from '@/services/auth/auth.service'
import clsx from 'clsx'
import Link from 'next/link'

import s from './header.module.scss'
const Header = () => {
  const classNames = {
    container: clsx(s.container),
    navWrapper: clsx(s.navWrapper),
    root: clsx(s.root),
  }

  const { data: meData } = useMeQuery()
  const [logout] = useLogoutMutation()

  const isLoading = useSelector(selectAppIsLoading)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const width = useWidth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className={classNames.root}>
      {isLoading && <Loader />}
      <div className={classNames.container}>
        <Logo />
        <div className={classNames.navWrapper}>
          {width > breakpoints.mobile ? (
            <NavbarDesktop />
          ) : (
            <NavbarMobile isAuthenticated={isAuthenticated} logout={handleLogout} />
          )}
          {!isAuthenticated && (
            <Button as={Link} href={routes.login}>
              Sign in
            </Button>
          )}
          {isAuthenticated && width > breakpoints.mobile && (
            <Button onClick={handleLogout}>Log Out</Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default withRedux(Header)
