import { ImageFormat, ImageGravity, Storage } from 'node-appwrite'

export const getPostCover = async (payload: { postId: string; storageInstance: Storage }) => {
  const { postId, storageInstance } = payload

  return await storageInstance.getFilePreview(
    `${process.env.NEXT_PUBLIC_APPWRITE_AVATARS}`,
    postId,
    0, // width (optional)
    0, // height (optional)
    ImageGravity.Center, // gravity (optional)
    50, // quality (optional)
    0, // borderWidth (optional)
    '', // borderColor (optional)
    0, // borderRadius (optional)
    0, // opacity (optional)
    0, // rotation (optional)
    '', // background (optional)
    ImageFormat.Webp // output (optional)
  )
}
