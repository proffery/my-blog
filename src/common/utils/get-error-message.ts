import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined) => {
  let errorMessage = ''

  if (error && 'status' in error) {
    errorMessage = (error.data as any)?.message
      ? (error.data as any).message
      : JSON.stringify(error)
  }

  return errorMessage
}
