import { RootState } from '@/services/store'

export const selectUserRole = (state: RootState) => state.user.userRole
export const selectUserId = (state: RootState) => state.user.userId
export const selectUserAvatarUrl = (state: RootState) => state.user.userAvatarUrl
