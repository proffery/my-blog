'use client'
import { useSelector } from 'react-redux'

import { projectConstants } from '@/common/constants/projectConstants'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { useInitializeApp } from '@/common/hooks/use-initialize-app'
import { useWidth } from '@/common/hooks/use-width'
import { NavbarDesktop } from '@/components/layouts/header/navbar/navbar-desktop/navbar-desktop'
import { NavbarMobile } from '@/components/layouts/header/navbar/navbar-mobile/navbar-mobile'
import { Button } from '@/components/ui/button/button'
import { InitializationLoader } from '@/components/ui/initialization-loader/initialization-loader'
import { LinearLoader } from '@/components/ui/linear-loader/linear-loader'
import { Logo } from '@/components/ui/logo/logo'
import { selectAppIsInitialized, selectAppIsLoading } from '@/services/app/app.selectors'
import { useGetMyAvatarMetaQuery, useMeQuery } from '@/services/auth/auth.service'
import { selectUserRole } from '@/services/user/user.selectors'
import clsx from 'clsx'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import s from './header.module.scss'

const Header = () => {
  const classNames = {
    container: clsx(s.container),
    navWrapper: clsx(s.navWrapper),
    root: clsx(s.root),
  }

  const isLoading = useSelector(selectAppIsLoading)
  const isUserAuthenticated = useSelector(selectUserRole)
  const isAppInitialized = useSelector(selectAppIsInitialized)
  const width = useWidth()
  const t = useTranslations('Components.Header')

  const { meData } = useInitializeApp()

  return (
    <header className={classNames.root}>
      {isLoading && <LinearLoader />}
      {!isAppInitialized && <InitializationLoader />}
      <nav className={classNames.container}>
        <Logo />
        <div className={classNames.navWrapper}>
          {width > projectConstants.mobileWidth ? (
            <NavbarDesktop meData={meData} />
          ) : (
            <NavbarMobile meData={meData} />
          )}
          {!isUserAuthenticated && (
            <Button as={Link} href={routes.login}>
              {t('Login')}
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}

export default withRedux(Header)
