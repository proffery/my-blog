import { z } from 'zod'

export type LoginEmailFormValues = z.infer<typeof loginEmailSchema>

export const loginEmailSchema = z.object({
  email: z.string().email({ message: 'Почта указана не верно!' }),
  password: z.string().min(8, { message: 'Пароль должен иметь не менее 8 символов!' }),
})
