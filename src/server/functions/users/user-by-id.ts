import { Users } from 'node-appwrite'

export const userById = async (payload: { userId: string; usersInstance: Users }) => {
  const { userId, usersInstance } = payload

  return await usersInstance.get(userId)
}
