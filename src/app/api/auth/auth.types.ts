import { User } from '@/app/api/users/users.types'

export type MessageResponse = { message?: string }
export type MeResponse = { user?: User }
export type LoginEmailRequest = { email: string; password: string }
export type RegistrationRequest = { email: string; name: string; password: string }
export type VerifyEmailRequest = { secret: string; userId: string }
export type ChangeNameRequest = { name: string }
