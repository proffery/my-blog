import { z } from 'zod'

export const addLinkSchema = z.object({
  link: z
    .string()
    .min(1, { message: 'Нужно указать ссылку' })
    .refine(
      value =>
        /^(http|https|ftp|mailto):\/\/[a-zA-Z0-9\-\.]+(?:\.[a-zA-Z]{2,6})+(?:\/\S*)?$/.test(
          value ?? ''
        ),
      'Ссылка должна начинаться с http|https|ftp|mailto'
    ),
})

export type AddLinkValues = z.infer<typeof addLinkSchema>
