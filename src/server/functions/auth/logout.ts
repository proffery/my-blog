import { cookies } from 'next/headers'
import { Account } from 'node-appwrite'

export const logout = async (payload: { authInstance: Account }) => {
  const { authInstance } = payload

  cookies().delete(`${process.env.NEXT_PUBLIC_SESSION_NAME}`)
  await authInstance.deleteSession('current')
}
