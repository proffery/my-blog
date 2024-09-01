import { RootState } from '@/services/store'

export const selectUserRole = (state: RootState) => state.user.userRole
export const selectUserId = (state: RootState) => state.user.userId
