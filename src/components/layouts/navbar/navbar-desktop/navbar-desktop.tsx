import { useSelector } from 'react-redux'

import { MeResponse } from '@/app/api/auth/auth.types'
import { routes } from '@/common/constants/routes'
import { HeaderMenu } from '@/components/layouts/header-menu/header-menu'
import { ActiveLink } from '@/components/ui/active-link/active-link'
import { useLogoutMutation } from '@/services/auth/auth.service'
import { selectUserAvatarUrl, selectUserRole } from '@/services/user/user.selectors'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import s from './navbar-desktop.module.scss'

type Props = {
  meData?: MeResponse
}

export const NavbarDesktop = ({ meData }: Props) => {
  const classNames = {
    navbar: clsx(s.navbar),
  }

  const [logout] = useLogoutMutation()

  const isAuthenticated = useSelector(selectUserRole)
  const userAvatarUrl = useSelector(selectUserAvatarUrl)

  const router = useRouter()

  const handleLogout = async () => {
    await logout().unwrap()
    router.push(routes.login)
  }

  return (
    <nav className={classNames.navbar}>
      <ActiveLink href={routes.base}>Главная</ActiveLink>
      <ActiveLink href={routes.posts}>Посты</ActiveLink>
      <ActiveLink href={routes.contacts}>Контакты</ActiveLink>
      {isAuthenticated && (
        <HeaderMenu avatarUrl={userAvatarUrl ?? ''} logout={handleLogout} userData={meData} />
      )}
    </nav>
  )
}
