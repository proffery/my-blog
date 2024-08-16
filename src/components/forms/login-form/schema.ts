import { z } from 'zod'

export type LoginEmailFormValues = z.infer<typeof loginEmailSchema>

export const loginEmailSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
