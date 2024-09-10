import { Storage } from 'node-appwrite'

export const createAvatar = async (payload: {
  file: File
  storageInstance: Storage
  userId: string
}) => {
  const { file, storageInstance, userId } = payload
  const avatarMeta = await storageInstance.createFile(
    `${process.env.NEXT_PUBLIC_APPWRITE_AVATARS}`,
    userId,
    file
  )
  const avatarUrl = `https://cloud.appwrite.io/v1/storage/buckets/${avatarMeta.bucketId}/files/${userId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}&name=${avatarMeta.name}`

  return { avatarMeta, avatarUrl }
}
