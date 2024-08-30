import { Models } from 'appwrite'

export type User = Models.User<Models.Preferences>

export type GetUserRequest = { params: { userId: string } }
export type GetUserResponse = { user: User }
export type GetUsersListResponse = { total: number; users: Array<User> }
