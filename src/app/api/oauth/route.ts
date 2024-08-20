import { routes } from '@/common/constants/routes'
import { createAdminClient } from '@/server/config'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')
  const secret = request.nextUrl.searchParams.get('secret')

  const { account } = await createAdminClient()

  try {
    const session = await account.createSession(userId ?? '', secret ?? '')

    cookies().set(`${process.env.NEXT_PUBLIC_SESSION_NAME}`, session.secret, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
    })

    return NextResponse.redirect(`${request.nextUrl.origin}${routes.account}`)
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
