import { Storage } from 'node-appwrite'

export const createPostCover = async (payload: {
  file: File
  postId: string
  storageInstance: Storage
}) => {
  const { file, postId, storageInstance } = payload

  return await storageInstance.createFile(
    `${process.env.NEXT_PUBLIC_APPWRITE_COVERS}`,
    postId,
    file
  )
}
