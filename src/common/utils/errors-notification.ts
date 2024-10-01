import { toast } from 'react-toastify'

export const errorNotification = (errorObj: unknown) => {
  if (
    typeof errorObj === 'object' &&
    errorObj !== null &&
    'error' in errorObj &&
    typeof errorObj.error === 'object' &&
    errorObj.error !== null &&
    'data' in errorObj.error &&
    typeof errorObj.error.data === 'object' &&
    errorObj.error.data !== null
  ) {
    if (
      'status' in errorObj.error &&
      typeof errorObj.error.status === 'number' &&
      'message' in errorObj.error.data &&
      typeof errorObj.error.data.message === 'string'
    ) {
      toast.error(errorObj.error.data.message)
    }
  } else if (
    typeof errorObj === 'object' &&
    errorObj !== null &&
    'error' in errorObj &&
    typeof errorObj.error === 'object' &&
    errorObj.error !== null &&
    'status' in errorObj.error &&
    typeof errorObj.error.status === 'string' &&
    'error' in errorObj.error &&
    typeof errorObj.error.error === 'string'
  ) {
    toast.error(errorObj.error.error)
  } else if (
    errorObj !== null &&
    errorObj !== undefined &&
    typeof errorObj === 'object' &&
    'message' in errorObj &&
    typeof errorObj.message === 'string'
  ) {
    toast.error(errorObj.message)
  } else {
    toast.error(JSON.stringify(errorObj))
  }
}
