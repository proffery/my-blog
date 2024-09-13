import { cookies } from 'next/headers'

export const getLocaleFromCookies = (): null | string => {
  const currentLocale = cookies().get(`${process.env.NEXT_PUBLIC_LOCALE_COOKIE}`)

  if (!currentLocale) {
    return null
  }

  return currentLocale.value
}
