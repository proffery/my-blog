import type { Meta, StoryObj } from '@storybook/react'

import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import { routes } from '@/common/constants/routes'
import { ActiveLink } from '@/components/ui/active-link/active-link'
import { Button } from '@/components/ui/button/button'
import {
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownSeparator,
  DropdownSubMenu,
} from '@/components/ui/drop-down/drop-down'
import { Typography } from '@/components/ui/typography/typography'

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'Components/DropDown',
}

export default meta

type MenuDeckStory = StoryObj<typeof DropdownMenu>

export const Default = {
  render: () => (
    <DropdownMenu trigger={<Typography.Caption>example@email.com</Typography.Caption>}>
      <DropdownLabel>Джон Смитт</DropdownLabel>
      <DropdownSeparator />
      <DropdownItem>
        <ActiveLink href={routes.account}>Профиль</ActiveLink>
      </DropdownItem>
      <DropdownItem>
        <ActiveLink href={routes.account}>Написать пост</ActiveLink>
      </DropdownItem>
      <DropdownSubMenu
        trigger={
          <Button variant={'text'}>
            Подменю <RightBracketIcon style={{ height: '10px', width: '12px' }} />
          </Button>
        }
      >
        <DropdownItem>
          <ActiveLink href={routes.account}>Профиль</ActiveLink>
        </DropdownItem>
        <DropdownItem>
          <ActiveLink href={routes.account}>Написать пост</ActiveLink>
        </DropdownItem>
      </DropdownSubMenu>
      <DropdownSeparator />
      <DropdownItem>
        <Button variant={'text'}>Выход</Button>
      </DropdownItem>
    </DropdownMenu>
  ),
}
