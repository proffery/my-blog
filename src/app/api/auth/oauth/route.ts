import { routes } from '@/common/constants/routes'
import { createAuthClient } from '@/server/auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')
  const secret = request.nextUrl.searchParams.get('secret')

  const { auth } = await createAuthClient()

  try {
    const session = await auth.createSession(userId ?? '', secret ?? '')

    cookies().set(`${process.env.NEXT_PUBLIC_SESSION_NAME}`, session.secret, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
    })

    return NextResponse.redirect(`${request.nextUrl.origin}${routes.base}`)
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
