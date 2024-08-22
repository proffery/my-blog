'use client'
import { useSelector } from 'react-redux'

import { breakpoints } from '@/common/constants/breakpoints'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { useWidth } from '@/common/hooks/use-width'
import { NavbarDesktop } from '@/components/layouts/navbar/navbar-desktop/navbar-desktop'
import { NavbarMobile } from '@/components/layouts/navbar/navbar-mobile/navbar-mobile'
import { Button } from '@/components/ui/button/button'
import { InitializationLoader } from '@/components/ui/initialization-loader/initialization-loader'
import { LinearLoader } from '@/components/ui/linear-loader/linear-loader'
import { Logo } from '@/components/ui/logo/logo'
import { selectAppIsInitialized, selectAppIsLoading } from '@/services/app/app.selectors'
import { selectUserIsAuthenticated } from '@/services/user/user.selectors'
import clsx from 'clsx'
import Link from 'next/link'

import s from './header.module.scss'
const Header = () => {
  const classNames = {
    container: clsx(s.container),
    navWrapper: clsx(s.navWrapper),
    root: clsx(s.root),
  }

  const isLoading = useSelector(selectAppIsLoading)
  const isUserAuthenticated = useSelector(selectUserIsAuthenticated)
  const isAppInitialized = useSelector(selectAppIsInitialized)
  const width = useWidth()

  return (
    <header className={classNames.root}>
      {isLoading && <LinearLoader />}
      {!isAppInitialized && <InitializationLoader />}
      <div className={classNames.container}>
        <Logo />
        <div className={classNames.navWrapper}>
          {width > breakpoints.mobile ? <NavbarDesktop /> : <NavbarMobile />}
          {!isUserAuthenticated && (
            <Button as={Link} href={routes.login}>
              Войти
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default withRedux(Header)
