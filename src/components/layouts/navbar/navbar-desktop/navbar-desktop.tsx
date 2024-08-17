import { routes } from '@/common/constants/routes'
import { ActiveLink } from '@/components/layouts/active-link/active-link'
import clsx from 'clsx'

import s from './navbar-desktop.module.scss'
export const NavbarDesktop = () => {
  const classNames = {
    navbar: clsx(s.navbar),
  }

  return (
    <nav className={classNames.navbar}>
      <ActiveLink href={routes.base}>Главная</ActiveLink>
      <ActiveLink href={routes.posts}>Посты</ActiveLink>
      <ActiveLink href={routes.contacts}>Контакты</ActiveLink>
    </nav>
  )
}
