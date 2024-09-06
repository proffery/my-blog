import { z } from 'zod'

export type UploadAvatarFormValues = z.infer<typeof uploadAvatarSchema>

export const uploadAvatarSchema = z.object({
  file: z.any(),
})
