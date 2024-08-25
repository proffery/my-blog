import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  initialState: {
    userRole: null as null | string[],
  },
  name: 'user',
  reducers: {
    setUserRole: (state, action: PayloadAction<null | string[]>) => {
      state.userRole = action.payload
    },
  },
})

export const userActions = slice.actions
export const userReducer = slice
