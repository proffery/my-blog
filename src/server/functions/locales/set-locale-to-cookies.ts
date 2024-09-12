'use server'
import { cookies } from 'next/headers'

export const setLocaleToCookies = async (payload: { locale: string }) => {
  const { locale } = payload

  cookies().set('current-locale', locale, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: true,
  })
}
