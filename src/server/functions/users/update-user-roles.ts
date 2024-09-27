import { Users } from 'node-appwrite'

export const updateUserRoles = async (payload: {
  roles: string[]
  userId: string
  usersInstance: Users
}) => {
  const { roles, userId, usersInstance } = payload

  return await usersInstance.updateLabels(userId, roles)
}
