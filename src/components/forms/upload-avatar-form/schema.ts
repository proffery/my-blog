import { z } from 'zod'

const MAX_FILE_SIZE = 1000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export type UploadAvatarFormValues = z.infer<typeof uploadAvatarSchema>

export const uploadAvatarSchema = z.object({
  image: z
    .any()

    .refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: 'Разрешенные форматы: .jpg, .jpeg, .png и .webp',
    })
    // To not allow files larger than 1MB
    .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Максимальный размер: 1MB.`,
    }),
})
