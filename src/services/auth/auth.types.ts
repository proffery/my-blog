import { Models } from 'appwrite'

export type MeResponse = { user?: Models.User<Models.Preferences> }
export type LogoutResponse = { message?: string }
export type LoginEmailRequest = { email: string; password: string }
export type LoginEmailResponse = { message?: string }
export type RegistrationRequest = { email: string; name: string; password: string }
export type RegistrationResponse = { message?: string }
