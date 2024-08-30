import { routes } from '@/common/constants/routes'
import { createAuthClient } from '@/server/auth-config'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')
  const secret = request.nextUrl.searchParams.get('secret')

  const { authInstance } = await createAuthClient()

  try {
    const session = await authInstance.createSession(userId ?? '', secret ?? '')

    cookies().set(`${process.env.NEXT_PUBLIC_SESSION_NAME}`, session.secret, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
    })

    return NextResponse.redirect(`${request.nextUrl.origin}${routes.base}`)
  } catch (error: unknown) {
    serverErrorHandler(error)
  }
}
