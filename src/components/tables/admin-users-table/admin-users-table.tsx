import { SortDirection } from '@/app/api/posts/posts.types'
import { UserModel, UsersSortBy } from '@/app/api/users/users.types'
import { RightBracketIcon } from '@/assets/icons/components/right-bracket-icon'
import { routes } from '@/common/constants/routes'
import { formatDateLong } from '@/common/utils/format-date-long'
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
  onUserRolesChange: (data: { userRoles: string[] }) => void
  sort: SortDirection
  sortBy: UsersSortBy
  users?: UserModel[]
}

export const AdminUsersTable = ({
  disabled = false,
  onSortByChange,
  onSortChange,
  onUserRolesChange,
  sort,
  sortBy,
  users,
}: AdminUsers) => {
  const t = useTranslations('AdministratorPage.AdminTabs.Feedbacks')
  const format = useFormatter()
  const locale = useLocale()

  const columns: AdminUsersTableColumns[] = [
    {
      key: 'name',
      title: t('FeedbacksTable.Columns.Author'),
    },
    {
      key: 'email',
      title: t('FeedbacksTable.Columns.Email'),
    },
    {
      key: '$createdAt',
      title: t('FeedbacksTable.Columns.Created'),
    },
    {
      title: t('FeedbacksTable.Columns.Options'),
    },
  ]

  const classNames = {
    buttonsWrapper: clsx(s.buttonsWrapper),
    sortIcon: clsx(s.sortIcon, sort === 'desc' ? s.sortIconDesc : s.sortIconAsc),
    tableContainer: clsx(s.tableContainer),
  }

  const sortToggleHandler = () => {
    sort === 'asc' ? onSortChange('desc') : onSortChange('asc')
  }

  const sortByHandler = (key: UsersSortBy) => {
    key === sortBy ? sortToggleHandler() : onSortByChange(key)
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
              <TableBodyCell>
                <Typography.Link2 as={Link} href={`${routes.account}/${user.$id}`}>
                  {user.name}
                </Typography.Link2>
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Link2 as={Link} href={`mailto:${user.email}`}>
                  {user.email}
                </Typography.Link2>
              </TableBodyCell>
              <TableBodyCell>
                <Typography.Body2>
                  {formatDateLong(user.$createdAt, locale, format)}
                </Typography.Body2>
              </TableBodyCell>
              <TableBodyCell>
                <div className={classNames.buttonsWrapper}>
                  <Checkbox />
                  <Checkbox />
                  <Checkbox />
                </div>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
