import { AvatarMeta, User } from '@/app/api/users/users.types'
import { Models } from 'appwrite'

export type MessageResponse = { message?: string }
export type MeResponse = { user?: User }
export type LoginEmailRequest = { email: string; password: string }
export type DeleteAvatarRequest = { userId: string }
export type GetMyAvatarMetaRequest = { params: { userId: string } }
export type GetMyAvatarMetaResponse = { avatarMeta: AvatarMeta; avatarUrl: string }
export type CreateAvatarRequest = { image: any; userId: string }
export type CreateAvatarResponse = { avatar: Models.File }
export type RegistrationRequest = { email: string; name: string; password: string }
export type VerifyEmailRequest = { secret: string; userId: string }
export type ChangeNameRequest = { name: string }
