import { MeResponse } from '@/app/api/auth/auth.types'
import { routes } from '@/common/constants/routes'
import { isRole } from '@/common/utils/is-role'
import { ActiveLink } from '@/components/ui/active-link/active-link'
import { Avatar } from '@/components/ui/avatar/avatar'
import { Button } from '@/components/ui/button/button'
import {
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownSeparator,
} from '@/components/ui/drop-down/drop-down'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'

import s from './header-menu.module.scss'

type Props = {
  avatarUrl?: string
  logout: () => void
  userData?: MeResponse
}

export const HeaderMenu = ({ logout, userData }: Props) => {
  const classNames = {
    trigger: clsx(s.trigger),
  }

  const userRoles = userData?.user?.labels

  return (
    <DropdownMenu
      align={'start'}
      triangleRight={'60%'}
      trigger={
        <div className={classNames.trigger}>
          <Avatar />
          <Typography.Overline as={'span'}>{userData?.user?.email}</Typography.Overline>
        </div>
      }
    >
      <DropdownLabel>
        <Typography.Caption>{userData?.user?.name}</Typography.Caption>
      </DropdownLabel>
      <DropdownSeparator />
      <DropdownItem>
        <ActiveLink href={routes.account}>Профиль</ActiveLink>
      </DropdownItem>
      {isRole(userRoles, 'Moderator') && (
        <DropdownItem>
          <ActiveLink href={routes.moderator}>Модерировать</ActiveLink>
        </DropdownItem>
      )}
      {userData && (
        <DropdownItem>
          <ActiveLink href={routes.createPost}>Написать пост</ActiveLink>
        </DropdownItem>
      )}
      <DropdownItem>
        <Button onClick={() => logout()} variant={'text'}>
          Выход
        </Button>
      </DropdownItem>
    </DropdownMenu>
  )
}
