import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  initialState: {
    isAuthenticated: false as boolean,
  },
  name: 'user',
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
  },
})

export const userActions = slice.actions
export const userReducer = slice
