import { cookies } from 'next/headers'

export const getLocaleFromCookies = (): null | string => {
  const currentLocale = cookies().get('current-locale')

  if (!currentLocale) {
    return null
  }

  return currentLocale.value
}
