import { Account } from 'node-appwrite'

export const changeName = async (payload: { authInstance: Account; name: string }) => {
  const { authInstance, name } = payload

  await authInstance.updateName(name)
}
