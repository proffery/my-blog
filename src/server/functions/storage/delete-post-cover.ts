import { Storage } from 'node-appwrite'

export const deletePostCover = async (payload: { postId: string; storageInstance: Storage }) => {
  const { postId, storageInstance } = payload

  return await storageInstance.deleteFile(`${process.env.NEXT_PUBLIC_APPWRITE_COVERS}`, postId)
}
