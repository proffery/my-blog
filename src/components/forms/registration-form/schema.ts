import { z } from 'zod'

export type RegistrationFormValues = z.infer<typeof registrationSchema>

export const registrationSchema = z.object({
  email: z.string().email({ message: 'Почта указана не верно!' }),
  name: z.string().min(3, { message: 'Имя не должно быть короче 3 символов!' }),
  password: z.string().min(8, { message: 'Пароль должен иметь не менее 8 символов!' }),
})
