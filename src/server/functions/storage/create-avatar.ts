import { Storage } from 'node-appwrite'

export const createAvatar = async (payload: {
  file: File
  storageInstance: Storage
  userId: string
}) => {
  const { file, storageInstance, userId } = payload

  return await storageInstance.createFile(
    `${process.env.NEXT_PUBLIC_APPWRITE_AVATARS}`,
    userId,
    file
  )
}
