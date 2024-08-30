import { Account } from 'node-appwrite'

export const me = async (payload: { authInstance: Account }) => {
  const { authInstance } = payload

  return await authInstance.get()
}
