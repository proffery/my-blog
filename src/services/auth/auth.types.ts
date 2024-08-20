import { Models } from 'appwrite'

export type ApiResponse = { message?: string }
export type MeResponse = { user?: Models.User<Models.Preferences> }
export type LoginEmailRequest = { email: string; password: string }
export type RegistrationRequest = { email: string; name: string; password: string }
export type VerifyEmailRequest = { secret: string; userId: string }
export type ChangeNameRequest = { name: string }
