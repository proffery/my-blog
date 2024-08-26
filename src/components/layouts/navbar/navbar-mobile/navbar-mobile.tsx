'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import { HeaderMenu } from '@/components/layouts/header-menu/header-menu'
import { ActiveLink } from '@/components/ui/active-link/active-link'
import { useLogoutMutation, useMeQuery } from '@/services/auth/auth.service'
import { selectUserRole } from '@/services/user/user.selectors'
import clsx from 'clsx'

import s from './navbar-mobile.module.scss'

export const NavbarMobile = () => {
  const { data: meData } = useMeQuery()
  const isAuthenticated = useSelector(selectUserRole)
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

  const handleToggle = () => {
    setIsOpened(!isOpened)
  }

  const handleClose = () => {
    setIsOpened(false)
  }

  return (
    <>
      {isAuthenticated && <HeaderMenu logout={logout} userData={meData} />}
      <button className={classNames.burgerButton} onClick={handleToggle} type={'button'}>
        <span className={classNames.burgerMenu}></span>
      </button>
      <div className={classNames.navbarContainer}>
        <div className={classNames.navbarLeft} onClick={handleClose} />
        <nav className={classNames.navbar}>
          <ActiveLink href={routes.base} onClick={handleClose}>
            Главная
          </ActiveLink>
          <ActiveLink href={routes.posts} onClick={handleClose}>
            Посты
          </ActiveLink>
          <ActiveLink href={routes.contacts} onClick={handleClose}>
            Контакты
          </ActiveLink>
        </nav>
      </div>
    </>
  )
}
