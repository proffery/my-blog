import { SortDirection } from '@/app/api/posts/posts.types'
import { UserModel, UsersSortBy } from '@/app/api/users/users.types'
import { CheckboxChecked } from '@/assets/icons/components/checkbox-checked'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import { routes } from '@/common/constants/routes'
import { formatDateLong } from '@/common/utils/format-date-long'
import { UserRole, isRole } from '@/common/utils/is-role'
import { Button } from '@/components/ui/button/button'
import { Checkbox } from '@/components/ui/checkbox/checkbox'
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table/table'
import { Typography } from '@/components/ui/typography/typography'
import clsx from 'clsx'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useFormatter, useLocale, useTranslations } from 'next-intl'

import s from './admin-users-table.module.scss'

type AdminUsersTableColumns = {
  key?: UsersSortBy
  title: string
}

type AdminUsers = {
  disabled?: boolean
  onSortByChange: (value: UsersSortBy | null) => void
  onSortChange: (value: SortDirection | null) => void
  onUserDelete: (data: { email: string; userId: string }) => void
  onUserRolesChange: (data: { userId: string; userRoles: string[] }) => void
  sort: SortDirection
  sortBy: UsersSortBy
  users?: UserModel[]
}

export const AdminUsersTable = ({
  disabled = false,
  onSortByChange,
  onSortChange,
  onUserDelete,
  onUserRolesChange,
  sort,
  sortBy,
  users,
}: AdminUsers) => {
  const t = useTranslations('AdministratorPage.AdminTabs.Users.UsersTable')
  const format = useFormatter()
  const locale = useLocale()

  const columns: AdminUsersTableColumns[] = [
    {
      key: 'name',
      title: t('Columns.Name'),
    },
    {
      key: 'email',
      title: t('Columns.Email'),
    },
    {
      key: '$createdAt',
      title: t('Columns.Created'),
    },
    {
      title: t('Columns.Moderator'),
    },
    {
      title: t('Columns.Writer'),
    },
    {
      title: t('Columns.Options'),
    },
  ]

  const classNames = {
    buttonsWrapper: clsx(s.buttonsWrapper),
    cell: clsx(s.cell),
    emailConfirmedIcon: clsx(s.emailConfirmedIcon),
    sortIcon: clsx(s.sortIcon, sort === 'desc' ? s.sortIconDesc : s.sortIconAsc),
    tableContainer: clsx(s.tableContainer),
  }

  const sortToggleHandler = () => {
    sort === 'asc' ? onSortChange('desc') : onSortChange('asc')
  }

  const sortByHandler = (key: UsersSortBy) => {
    key === sortBy ? sortToggleHandler() : onSortByChange(key)
  }

  const roleChangeHandler = (currentRoles: string[], newRole: UserRole, userId: string) => {
    const newRoles = currentRoles.some(role => role === newRole)
      ? currentRoles.filter(role => role !== newRole)
      : [...currentRoles.map(role => role), newRole]

    onUserRolesChange({ userId, userRoles: newRoles })
  }

  const userDeleteHandler = (user: UserModel) => {
    const { $id, email } = user

    onUserDelete({
      email,
      userId: $id,
    })
  }

  return (
    <div className={classNames.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column =>
              column.key ? (
                <TableHeadCell key={column.title}>
                  <Button
                    disabled={disabled}
                    onClick={() => sortByHandler(column.key ?? '$createdAt')}
                    variant={'text'}
                  >
                    <Typography.Subtitle2>{column.title}&nbsp;</Typography.Subtitle2>
                    {column.key === sortBy && <RightBracketIcon className={classNames.sortIcon} />}
                  </Button>
                </TableHeadCell>
              ) : (
                <TableHeadCell key={column.title}>
                  <Typography.Subtitle2>{column.title}</Typography.Subtitle2>
                </TableHeadCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map(user => (
            <TableRow key={user.$id}>
              <TableBodyCell className={classNames.cell}>
                <Typography.Link2 as={Link} href={`${routes.account}/${user.$id}`}>
                  {user.name}
                </Typography.Link2>
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Link2 as={Link} href={`mailto:${user.email}`}>
                  {user.email}&nbsp;
                  {user.emailVerification && (
                    <CheckboxChecked className={classNames.emailConfirmedIcon} />
                  )}
                </Typography.Link2>
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Body2>
                  {formatDateLong(user.$createdAt, locale, format)}
                </Typography.Body2>
              </TableBodyCell>
              <TableBodyCell>
                <div className={classNames.buttonsWrapper}>
                  <Checkbox
                    checked={isRole(user.labels, 'Moderator')}
                    disabled={disabled}
                    onCheckedChange={() => roleChangeHandler(user.labels, 'Moderator', user.$id)}
                  />
                </div>
              </TableBodyCell>
              <TableBodyCell>
                <div className={classNames.buttonsWrapper}>
                  <Checkbox
                    checked={isRole(user.labels, 'Writer')}
                    disabled={disabled}
                    onCheckedChange={() => roleChangeHandler(user.labels, 'Writer', user.$id)}
                  />
                </div>
              </TableBodyCell>
              <TableBodyCell>
                <div className={classNames.buttonsWrapper}>
                  <Button
                    disabled={disabled}
                    onClick={() => userDeleteHandler(user)}
                    padding={false}
                    title={t('OptionsButtons.Delete.title')}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
