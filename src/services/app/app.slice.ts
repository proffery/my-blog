import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  extraReducers: builder => {
    builder.addMatcher(
      action => action.type.endsWith('pending'),
      state => {
        state.isLoading = true
      }
    )
    builder.addMatcher(
      action => action.type.endsWith('fulfilled'),
      state => {
        state.isLoading = false
      }
    )
    builder.addMatcher(
      action => action.type.endsWith('rejected'),
      state => {
        state.isLoading = false
      }
    )
  },
  initialState: {
    error: null as null | string,
    isInitialized: false as boolean,
    isLoading: false as boolean,
    success: null as null | string,
  },
  name: 'app',
  reducers: {
    setAppError: (state, action: PayloadAction<null | string>) => {
      state.error = action.payload
    },
    setAppIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload
    },
    setAppSuccess: (state, action: PayloadAction<null | string>) => {
      state.success = action.payload
    },
  },
})

export const appActions = slice.actions
export const appReducer = slice
