import { useUsersFilters } from '@/components/layouts/administrator-page/use-users-filters'
import { AdminFeedbacksTable } from '@/components/tables/admin-feedbacks-table/admin-feedbacks-table'
import { AdminUsersTable } from '@/components/tables/admin-users-table/admin-users-table'
import { Typography } from '@/components/ui/typography/typography'
import { useGetUsersListQuery } from '@/services/users/users.service'
import { useLocale, useTranslations } from 'next-intl'

export const UsersTab = () => {
  const locale = useLocale()

  const { setSort, setSortBy, sort, sortBy } = useUsersFilters()

  const { data: usersData, isLoading: isUsersLoading } = useGetUsersListQuery({
    sort: sort ?? 'desc',
    sortBy: sortBy ?? '$createdAt',
  })

  const t = useTranslations('AdministratorPage.AdminTabs.Feedbacks')

  return usersData && usersData.users.length > 0 ? (
    <AdminUsersTable
      disabled={isUsersLoading}
      onSortByChange={setSortBy}
      onSortChange={setSort}
      onUserRolesChange={() => {}}
      sort={sort ?? 'desc'}
      sortBy={sortBy ?? '$createdAt'}
      users={usersData?.users}
    />
  ) : (
    <Typography.Caption>{t('Description')}</Typography.Caption>
  )
}
