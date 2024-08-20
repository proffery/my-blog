import { Models } from 'appwrite'

type ResponseWithMessage = { message?: string }

export type MeResponse = { user?: Models.User<Models.Preferences> }
export type LogoutResponse = ResponseWithMessage
export type LoginEmailRequest = { email: string; password: string }
export type LoginEmailResponse = ResponseWithMessage
export type RegistrationRequest = { email: string; name: string; password: string }
export type RegistrationResponse = ResponseWithMessage
export type VerifyEmailRequest = { secret: string; userId: string }
export type VerifyEmailResponse = ResponseWithMessage
export type SendVerifyEmailResponse = ResponseWithMessage
