import { AvatarMeta, UserModel } from '@/app/api/users/users.types'

export type MessageResponse = { message?: string }
export type MeResponse = { user?: UserModel }
export type LoginEmailRequest = { email: string; password: string }
export type DeleteAvatarRequest = { userId: string }
export type GetMyAvatarMetaRequest = { params: { date: string; userId: string } }
export type GetMyAvatarMetaResponse = { avatarMeta: AvatarMeta; avatarUrl: string }
export type CreateAvatarRequest = { image: any; userId: string }
export type CreateAvatarResponse = { avatarMeta: AvatarMeta; avatarUrl: string }
export type RegistrationRequest = { email: string; name: string; password: string }
export type VerifyEmailRequest = { secret: string; userId: string }
export type ChangeNameRequest = { name: string }
