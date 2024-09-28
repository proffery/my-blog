import { SortDirection } from '@/app/api/posts/posts.types'
import { Models } from 'appwrite'

export type UserModel = Models.User<Models.Preferences>
export type AvatarMeta = Models.File

export type UsersSortBy = '$createdAt' | 'email' | 'name'

export type GetUserRequest = { params: { userId: string } }
export type GetUserResponse = { user: UserModel }

export type GetAvatarMetaRequest = { params: { date: string; userId: string } }
export type GetAvatarMetaResponse = { avatarMeta: AvatarMeta; avatarUrl: string }

export type GetUsersListRequest = {
  sort?: SortDirection
  sortBy: UsersSortBy
}
export type GetUsersListResponse = { total: number; users: Array<UserModel> }

export type UpdateUserRolesRequest = {
  roles: string[]
  userId: string
}
export type UpdateUserRolesResponse = {
  roles: string[]
}

export type DeleteUserRequest = {
  userId: string
}
