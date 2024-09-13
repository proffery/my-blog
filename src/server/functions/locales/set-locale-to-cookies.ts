'use server'
import { cookies } from 'next/headers'

export const setLocaleToCookies = async (payload: { locale: string }) => {
  const { locale } = payload

  cookies().set(`${process.env.NEXT_PUBLIC_LOCALE_COOKIE}`, locale, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: true,
  })
}
