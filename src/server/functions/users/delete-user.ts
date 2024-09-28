import { Users } from 'node-appwrite'

export const deleteUser = async (payload: { userId: string; usersInstance: Users }) => {
  const { userId, usersInstance } = payload

  return await usersInstance.delete(userId)
}
