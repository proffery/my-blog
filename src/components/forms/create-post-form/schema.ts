import { z } from 'zod'

export type CreatePostFormValues = z.infer<typeof createPostFormSchema>

export const createPostFormSchema = z.object({
  cover: z
    .string()
    .optional()
    .refine(
      value => /^((http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|webp|svg)))$|^$/.test(value ?? ''),
      'Поддерживаемые форматы: .png, .jpg, .jpeg, .gif, .webp, .svg'
    ),
  post: z.string({ errorMap: () => ({ message: 'Пост не должен быть пустым!' }) }),
  title: z.string().min(1, { message: 'Нужно придумать заголовок!' }),
})
