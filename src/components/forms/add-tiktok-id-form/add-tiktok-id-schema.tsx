import { z } from 'zod'

export const addTiktokIdSchema = z.object({
  link: z
    .string()
    .min(1, { message: 'Нужно указать ссылку' })
    .refine(value => /\d+/.test(value ?? ''), 'Пример: 7407205444709666053'),
})

export type AddTiktokIdValues = z.infer<typeof addTiktokIdSchema>
