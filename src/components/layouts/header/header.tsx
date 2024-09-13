'use client'
import { useSelector } from 'react-redux'

import { projectConstants } from '@/common/constants/project-constants'
import { routes } from '@/common/constants/routes'
import withRedux from '@/common/hocs/with-redux'
import { useWidth } from '@/common/hooks/use-width'
import { Logo } from '@/components/layouts/logo/logo'
import { NavbarDesktop } from '@/components/layouts/navbar/navbar-desktop/navbar-desktop'
import { NavbarMobile } from '@/components/layouts/navbar/navbar-mobile/navbar-mobile'
import { Button } from '@/components/ui/button/button'
import { InitializationLoader } from '@/components/ui/initialization-loader/initialization-loader'
import { LinearLoader } from '@/components/ui/linear-loader/linear-loader'
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
  const t = useTranslations('Header')

  const { data: meData } = useMeQuery()

  useGetMyAvatarMetaQuery({
    params: { date: meData?.user?.$createdAt ?? '', userId: meData?.user?.$id ?? '' },
  })

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
