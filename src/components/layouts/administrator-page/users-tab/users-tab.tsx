import { useState } from 'react'

import { useUsersFilters } from '@/components/layouts/administrator-page/use-users-filters'
import { AdminUsersTable } from '@/components/tables/admin-users-table/admin-users-table'
import { Dialog } from '@/components/ui/dialog/dialog'
import { Typography } from '@/components/ui/typography/typography'
import {
  useDeleteUserMutation,
  useGetUsersListQuery,
  useUpdateUsersRolesMutation,
} from '@/services/users/users.service'
import { useLocale, useTranslations } from 'next-intl'

export const UsersTab = () => {
  const locale = useLocale()

  const { setSort, setSortBy, sort, sortBy } = useUsersFilters()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [tempUserData, setTempUserData] = useState({ email: '', userId: '' })

  const { data: usersData, isLoading: isUsersLoading } = useGetUsersListQuery({
    sort: sort ?? 'desc',
    sortBy: sortBy ?? '$createdAt',
  })

  const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation()
  const [changeUserRoles, { isLoading: isChangeUserRolesLoading }] = useUpdateUsersRolesMutation()

  const t = useTranslations('AdministratorPage.AdminTabs.Users')

  const setDeletedFeedbackDataHandler = (data: { email: string; userId: string }) => {
    setTempUserData({ email: data.email, userId: data.userId })
    setShowDeleteModal(true)
  }

  const confirmDeleteHandler = async () => {
    setShowDeleteModal(false)
    await deleteUser({ userId: tempUserData.userId }).unwrap()
    setTempUserData({ email: '', userId: '' })
  }

  const changeUserRolesHandler = (data: { userId: string; userRoles: string[] }) => {
    changeUserRoles({ roles: data.userRoles, userId: data.userId })
  }

  return (
    <>
      <Dialog
        cancelText={t('Dialogs.DeleteUser.Cancel')}
        confirmText={t('Dialogs.DeleteUser.Confirm')}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteHandler}
        onOpenChange={setShowDeleteModal}
        open={showDeleteModal}
        title={t('Dialogs.DeleteUser.title')}
      >
        {tempUserData.email}
      </Dialog>
      {usersData && usersData.users.length > 0 ? (
        <AdminUsersTable
          disabled={isUsersLoading || isDeleteLoading || isChangeUserRolesLoading}
          onSortByChange={setSortBy}
          onSortChange={setSort}
          onUserDelete={setDeletedFeedbackDataHandler}
          onUserRolesChange={changeUserRolesHandler}
          sort={sort ?? 'desc'}
          sortBy={sortBy ?? '$createdAt'}
          users={usersData?.users}
        />
      ) : (
        <Typography.Caption>{t('Description')}</Typography.Caption>
      )}
    </>
  )
}
