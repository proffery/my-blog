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
      <ActiveLink href={routes.base}>Home</ActiveLink>
      <ActiveLink href={routes.posts}>Posts</ActiveLink>
      <ActiveLink href={routes.contacts}>Contacts</ActiveLink>
    </nav>
  )
}
