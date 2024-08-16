import { z } from 'zod'

export type RegistrationFormValues = z.infer<typeof registrationSchema>

export const registrationSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(8),
})
