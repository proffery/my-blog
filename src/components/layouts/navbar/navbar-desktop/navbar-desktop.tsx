import { useSelector } from 'react-redux'

import { routes } from '@/common/constants/routes'
import { HeaderMenu } from '@/components/layouts/header-menu/header-menu'
import { ActiveLink } from '@/components/ui/active-link/active-link'
import { useLogoutMutation, useMeQuery } from '@/services/auth/auth.service'
import { selectUserIsAuthenticated } from '@/services/user/user.selectors'
import clsx from 'clsx'

import s from './navbar-desktop.module.scss'
export const NavbarDesktop = () => {
  const classNames = {
    navbar: clsx(s.navbar),
  }

  const { data: meData } = useMeQuery()
  const [logout] = useLogoutMutation()
  const isUserAuthenticated = useSelector(selectUserIsAuthenticated)

  return (
    <nav className={classNames.navbar}>
      <ActiveLink href={routes.base}>Главная</ActiveLink>
      <ActiveLink href={routes.posts}>Посты</ActiveLink>
      <ActiveLink href={routes.contacts}>Контакты</ActiveLink>
      {isUserAuthenticated && (
        <HeaderMenu email={meData?.user?.email} logout={logout} name={meData?.user?.name} />
      )}
    </nav>
  )
}
