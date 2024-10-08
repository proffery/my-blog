import { appReducer } from '@/services/app/app.slice'
import { baseApi } from '@/services/base-api'
import { userReducer } from '@/services/user/user.slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: {
    [appReducer.name]: appReducer.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [userReducer.name]: userReducer.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
