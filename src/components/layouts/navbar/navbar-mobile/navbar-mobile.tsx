'use client'

import { useState } from 'react'

import { Logout } from '@/assets/icons/components/logout'
import { routes } from '@/common/constants/routes'
import { ActiveLink } from '@/components/layouts/active-link/active-link'
import { Button } from '@/components/ui/button/button'
import clsx from 'clsx'

import s from './navbar-mobile.module.scss'

type Props = {
  isAuthenticated: boolean
  logout: () => void
}
export const NavbarMobile = ({ isAuthenticated, logout }: Props) => {
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

  const handleLogout = () => {
    logout()
    setIsOpened(false)
  }

  return (
    <>
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
          {isAuthenticated && (
            <>
              <ActiveLink href={routes.account} onClick={handleClose}>
                Профиль
              </ActiveLink>
              <Button onClick={handleLogout} variant={'text'}>
                Выйти <Logout className={classNames.logoutIcon} />
              </Button>
            </>
          )}
        </nav>
      </div>
    </>
  )
}
