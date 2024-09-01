import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  initialState: {
    userId: null as null | string,
    userRole: null as null | string[],
  },
  name: 'user',
  reducers: {
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
