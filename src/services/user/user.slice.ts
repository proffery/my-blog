import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  initialState: {
    userAvatarUrl: null as null | string,
    userId: null as null | string,
    userRole: null as null | string[],
  },
  name: 'user',
  reducers: {
    setAvatarUrl: (state, action: PayloadAction<null | string>) => {
      state.userAvatarUrl = action.payload
    },
    setUserId: (state, action: PayloadAction<null | string>) => {
      state.userId = action.payload
    },
    setUserRole: (state, action: PayloadAction<null | string[]>) => {
      state.userRole = action.payload
    },
  },
})

export const userActions = slice.actions
export const userReducer = slice
