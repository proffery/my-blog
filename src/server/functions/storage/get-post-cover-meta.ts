import { Storage } from 'node-appwrite'

export const getPostCoverMeta = async (payload: { postId: string; storageInstance: Storage }) => {
  const { postId, storageInstance } = payload

  return await storageInstance.getFile(`${process.env.NEXT_PUBLIC_APPWRITE_AVATARS}`, postId)
}
