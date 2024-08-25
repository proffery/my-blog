import { Models } from 'appwrite'

type User = Models.User<Models.Preferences>

export type GetUserResponse = { user?: User }
export type GetUserRequest = { userId: string }
export type GetUsersListResponse = { total: number; users: Array<User> }
