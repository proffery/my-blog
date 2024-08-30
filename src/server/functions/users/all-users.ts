import { Users } from 'node-appwrite'

export const allUsers = async (payload: { usersInstance: Users }) => {
  const { usersInstance } = payload

  return await usersInstance.list()
}
