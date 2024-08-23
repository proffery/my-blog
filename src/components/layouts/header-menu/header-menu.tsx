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
  email?: string
  logout: () => void
  name?: string
}

export const HeaderMenu = ({ email, logout, name }: Props) => {
  return (
    <DropdownMenu
      align={'start'}
      triangleRight={'60%'}
      trigger={<Typography.Overline>{email}</Typography.Overline>}
    >
      <DropdownLabel>
        <Typography.Caption>{name}</Typography.Caption>
      </DropdownLabel>
      <DropdownSeparator />
      <DropdownItem>
        <ActiveLink href={routes.account}>Профиль</ActiveLink>
      </DropdownItem>
      <DropdownItem>
        <ActiveLink href={routes.createPost}>Написать пост</ActiveLink>
      </DropdownItem>
      <DropdownItem>
        <Button onClick={() => logout()} variant={'text'}>
          Выход
        </Button>
      </DropdownItem>
    </DropdownMenu>
  )
}
