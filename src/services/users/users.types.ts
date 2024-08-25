import { Models } from 'appwrite'

export type GetUserResponse = { user?: Models.User<Models.Preferences> }
export type GetUserRequest = { userId: string }
export type GetUsersListResponse = {
  usersList: { total: number; users: Models.User<Models.Preferences>[] }
}
