import { Account } from 'node-appwrite'

export const verifyEmail = async (payload: {
  authInstance: Account
  secret: string
  userId: string
}) => {
  const { authInstance, secret, userId } = payload

  await authInstance.updateVerification(userId, secret)
}
