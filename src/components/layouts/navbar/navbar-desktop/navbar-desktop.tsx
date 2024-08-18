import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import { ActiveLink } from '@/components/layouts/active-link/active-link'
import { selectUserIsAuthenticated } from '@/services/user/user.selectors'
import clsx from 'clsx'

import s from './navbar-desktop.module.scss'
export const NavbarDesktop = () => {
  const classNames = {
    navbar: clsx(s.navbar),
  }

  const isUserAuthenticated = useSelector(selectUserIsAuthenticated)

  return (
    <nav className={classNames.navbar}>
      <ActiveLink href={routes.base}>Главная</ActiveLink>
      <ActiveLink href={routes.posts}>Посты</ActiveLink>
      <ActiveLink href={routes.contacts}>Контакты</ActiveLink>
      {isUserAuthenticated && <ActiveLink href={routes.account}>Профиль</ActiveLink>}
    </nav>
  )
}
