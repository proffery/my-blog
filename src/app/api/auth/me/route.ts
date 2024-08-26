import { createSession } from '@/server/auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function GET(request: NextRequest) {
  const { auth } = await createSession(request)

  try {
    const user = await auth.get()

    return NextResponse.json({ user })
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      cookies().delete(`${process.env.NEXT_PUBLIC_SESSION_NAME}`)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
