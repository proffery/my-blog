import { Models } from 'appwrite'

export type User = Models.User<Models.Preferences>
export type AvatarMeta = Models.File

export type GetUserRequest = { params: { userId: string } }
export type GetAvatarRequest = { params: { userId: string } }
export type GetAvatarMetaRequest = { params: { userId: string } }
export type GetAvatarMetaResponse = { avatar: AvatarMeta }
export type GetAvatarResponse = { avatar: ArrayBuffer }
export type GetUserResponse = { user: User }
export type GetUsersListResponse = { total: number; users: Array<User> }
