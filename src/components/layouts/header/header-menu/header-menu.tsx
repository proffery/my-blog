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
import { useTranslations } from 'next-intl'

import s from './header-menu.module.scss'

type Props = {
  avatarUrl?: string
  logout: () => void
  userData?: MeResponse
}

export const HeaderMenu = ({ avatarUrl, logout, userData }: Props) => {
  const classNames = {
    trigger: clsx(s.trigger),
  }
  const t = useTranslations('Components.Header.Menu')
  const userRoles = userData?.user?.labels

  return (
    <DropdownMenu
      align={'end'}
      triangleRight={'4%'}
      trigger={
        <div className={classNames.trigger}>
          <Avatar url={avatarUrl} />
        </div>
      }
    >
      <DropdownLabel>
        <Typography.Body1>{userData?.user?.name}</Typography.Body1>
      </DropdownLabel>
      <DropdownSeparator />
      <DropdownItem>
        <ActiveLink href={routes.account}>{t('Account')}</ActiveLink>
      </DropdownItem>
      {isRole(userRoles, 'Administrator') && (
        <DropdownItem>
          <ActiveLink href={routes.administrator}>{t('Administrator')}</ActiveLink>
        </DropdownItem>
      )}
      {isRole(userRoles, 'Moderator') && (
        <DropdownItem>
          <ActiveLink href={routes.moderator}>{t('Moderator')}</ActiveLink>
        </DropdownItem>
      )}
      {userData && (
        <DropdownItem>
          <ActiveLink href={routes.createPost}>{t('WritePost')}</ActiveLink>
        </DropdownItem>
      )}
      <DropdownItem>
        <Button onClick={() => logout()} variant={'text'}>
          {t('Logout')}
        </Button>
      </DropdownItem>
    </DropdownMenu>
  )
}
