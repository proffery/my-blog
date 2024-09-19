'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'

import { MeResponse } from '@/app/api/auth/auth.types'
import { routes } from '@/common/constants/routes'
import { HeaderMenu } from '@/components/layouts/header/header-menu/header-menu'
import { ActiveLink } from '@/components/ui/active-link/active-link'
import { useLogoutMutation } from '@/services/auth/auth.service'
import { selectUserAvatarUrl, selectUserRole } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import s from './navbar-mobile.module.scss'

type Props = {
  meData?: MeResponse
}

export const NavbarMobile = ({ meData }: Props) => {
  const isAuthenticated = useSelector(selectUserRole)
  const userAvatarUrl = useSelector(selectUserAvatarUrl)
  const router = useRouter()

  const [logout] = useLogoutMutation()

  const [isOpened, setIsOpened] = useState(false)
  const classNames = {
    burgerButton: clsx(s.burgerButton),
    burgerMenu: clsx(s.burgerMenu, isOpened && s.burgerMenuOpened),
    logoutIcon: clsx(s.logoutIcon),
    navbar: clsx(s.navbar, isOpened ? s.navbarOpened : s.navbarClosed),
    navbarContainer: clsx(
      s.navbarContainer,
      !isOpened ? s.navbarContainerClosed : s.navbarContainerOpened
    ),
    navbarLeft: clsx(s.navbarLeft, isOpened ? s.navbarLeftOpened : s.navbarLeftClosed),
  }

  const t = useTranslations('Components.Header.Navbar')

  const handleToggle = () => {
    setIsOpened(!isOpened)
  }

  const handleClose = () => {
    setIsOpened(false)
  }

  const handleLogout = async () => {
    await logout().unwrap()
    router.push(routes.login)
  }

  return (
    <>
      {isAuthenticated && (
        <HeaderMenu avatarUrl={userAvatarUrl ?? ''} logout={handleLogout} userData={meData} />
      )}
      <button className={classNames.burgerButton} onClick={handleToggle} type={'button'}>
        <span className={classNames.burgerMenu}></span>
      </button>
      <div className={classNames.navbarContainer}>
        <div className={classNames.navbarLeft} onClick={handleClose} />
        <nav className={classNames.navbar}>
          <ActiveLink href={routes.base} onClick={handleClose}>
            {t('Home')}
          </ActiveLink>
          <ActiveLink href={routes.posts} onClick={handleClose}>
            {t('Posts')}
          </ActiveLink>
          <ActiveLink href={routes.contacts} onClick={handleClose}>
            {t('Contacts')}
          </ActiveLink>
        </nav>
      </div>
    </>
  )
}
