import { endpoints } from '@/common/constants/endpoints'
import { routes } from '@/common/constants/routes'
import { Account } from 'node-appwrite'

export const sendVerifyEmail = async (payload: { authInstance: Account }) => {
  const { authInstance } = payload

  await authInstance.createVerification(`${endpoints._base}${routes.confirmEmail}`)
}
