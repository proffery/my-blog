import { z } from 'zod'

export const editNameSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Имя не должно быть короче 3 символов!' })
    .max(32, { message: 'Имя не должно быть длиннее 32 символов!' }),
})

export type EditNameValues = z.infer<typeof editNameSchema>
