import { routes } from '@/common/constants/routes'
import { createSession } from '@/server/auth'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function POST(request: NextRequest) {
  try {
    const { auth } = await createSession(request)

    await auth.createVerification(`${request.nextUrl.origin}${routes.confirmEmail}`)

    return NextResponse.json({ message: `Verification email sent successfully!` })
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
