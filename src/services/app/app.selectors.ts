import { RootState } from '@/services/store'

export const selectAppIsLoading = (state: RootState) => state.app.isLoading
export const selectAppIsInitialized = (state: RootState) => state.app.isInitialized
