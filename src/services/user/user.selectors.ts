import { RootState } from '@/services/store'

export const selectUserIsAuthenticated = (state: RootState) => state.user.isAuthenticated
