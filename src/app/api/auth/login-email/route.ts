import { createAdminAuth } from '@/server/auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function POST(request: NextRequest) {
  try {
    const { auth } = await createAdminAuth()
    const { email, password } = await request.json()

    const session = await auth.createEmailPasswordSession(email, password)

    cookies().set(`${process.env.NEXT_PUBLIC_SESSION_NAME}`, session.secret, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
    })

    return NextResponse.json({ message: 'Sign-in successfully!' })
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
