import { Models } from 'appwrite'

export type User = Models.User<Models.Preferences>
export type AvatarMeta = Models.File

export type GetUserRequest = { params: { userId: string } }
export type GetAvatarMetaRequest = { params: { date: string; userId: string } }
export type GetAvatarMetaResponse = { avatarMeta: AvatarMeta; avatarUrl: string }
export type GetUserResponse = { user: User }
export type GetUsersListResponse = { total: number; users: Array<User> }
