import { User } from '@/services/users/users.types'

export type ApiResponse = { message?: string }
export type MeResponse = { user?: User }
export type LoginEmailRequest = { email: string; password: string }
export type RegistrationRequest = { email: string; name: string; password: string }
export type VerifyEmailRequest = { secret: string; userId: string }
export type ChangeNameRequest = { name: string }
