import { MeResponse } from '@/app/api/auth/auth.types'
import { routes } from '@/common/constants/routes'
import { ActiveLink } from '@/components/ui/active-link/active-link'
import { Button } from '@/components/ui/button/button'
import {
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownSeparator,
} from '@/components/ui/drop-down/drop-down'
import { Typography } from '@/components/ui/typography/typography'

type Props = {
  logout: () => void
  userData?: MeResponse
}

export const HeaderMenu = ({ logout, userData }: Props) => {
  const userRoles = userData?.user?.labels

  return (
    <DropdownMenu
      align={'start'}
      triangleRight={'60%'}
      trigger={<Typography.Overline>{userData?.user?.email}</Typography.Overline>}
    >
      <DropdownLabel>
        <Typography.Caption>{userData?.user?.name}</Typography.Caption>
      </DropdownLabel>
      <DropdownSeparator />
      <DropdownItem>
        <ActiveLink href={routes.account}>Профиль</ActiveLink>
      </DropdownItem>
      {userRoles?.some(role => role === 'Writer') && (
        <>
          <DropdownItem>
            <ActiveLink href={routes.createPost}>Написать пост</ActiveLink>
          </DropdownItem>
        </>
      )}
      <DropdownItem>
        <Button onClick={() => logout()} variant={'text'}>
          Выход
        </Button>
      </DropdownItem>
    </DropdownMenu>
  )
}
