import { Storage } from 'node-appwrite'

export const deleteAvatar = async (payload: { storageInstance: Storage; userId: string }) => {
  const { storageInstance, userId } = payload

  return await storageInstance.deleteFile(`${process.env.NEXT_PUBLIC_APPWRITE_AVATARS}`, userId)
}
