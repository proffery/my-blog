import { z } from 'zod'

export type CreatePostFormValues = z.infer<typeof createPostFormSchema>

export const createPostFormSchema = z.object({
  post: z.string({ errorMap: () => ({ message: 'Пост не должен быть пустым!' }) }),
  title: z.string().min(1, { message: 'Нужно придумать заголовок!' }),
})
