import { Storage } from 'node-appwrite'

export const getAvatarMeta = async (payload: { storageInstance: Storage; userId: string }) => {
  const { storageInstance, userId } = payload

  return await storageInstance.getFile(`${process.env.NEXT_PUBLIC_APPWRITE_AVATARS}`, userId)
}
