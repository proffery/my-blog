import { Account } from 'node-appwrite'

export const logout = async (payload: { authInstance: Account }) => {
  const { authInstance } = payload

  await authInstance.deleteSession('current')
}
