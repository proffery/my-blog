import { Storage } from 'node-appwrite'

export const getAvatarMeta = async (payload: { storageInstance: Storage; userId: string }) => {
  const { storageInstance, userId } = payload

  const avatarMeta = await storageInstance.getFile(
    `${process.env.NEXT_PUBLIC_APPWRITE_AVATARS}`,
    userId
  )

  const avatarUrl = `https://cloud.appwrite.io/v1/storage/buckets/${avatarMeta.bucketId}/files/${userId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}&file=${avatarMeta.name}`

  return { avatarMeta, avatarUrl }
}
