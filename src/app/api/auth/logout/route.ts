import { createSession } from '@/server/auth'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function DELETE(request: NextRequest) {
  const { auth } = await createSession(request)

  try {
    await auth.deleteSession('current')

    return NextResponse.json({ message: 'Successfully logged out!' })
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
