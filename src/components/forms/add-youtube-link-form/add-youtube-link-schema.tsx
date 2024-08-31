import { z } from 'zod'

export const addYoutubeLinkSchema = z.object({
  link: z
    .string()
    .min(1, { message: 'Нужно указать ссылку на youtube ролик' })
    .refine(
      value =>
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi.test(
          value ?? ''
        ),
      'Ссылка не правильная!'
    ),
})

export type AddYoutubeValues = z.infer<typeof addYoutubeLinkSchema>
