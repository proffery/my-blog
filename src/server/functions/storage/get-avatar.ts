import { ImageFormat, ImageGravity, Storage } from 'node-appwrite'

export const getAvatar = async (payload: { storageInstance: Storage; userId: string }) => {
  const { storageInstance, userId } = payload

  return await storageInstance.getFilePreview(
    `${process.env.NEXT_PUBLIC_APPWRITE_AVATARS}`,
    userId,
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
