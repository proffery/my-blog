import { Account } from 'node-appwrite'

export const registration = async (payload: {
  authInstance: Account
  email: string
  id: string
  name: string
  password: string
}) => {
  const { authInstance, email, id, name, password } = payload

  await authInstance.create(id, email, password, name)
}
