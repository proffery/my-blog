import { MessageResponse } from '@/app/api/auth/auth.types'
import { NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export const serverErrorHandler = (error: unknown): NextResponse<MessageResponse> => {
  if (error instanceof AppwriteException) {
    console.error(error)

    return NextResponse.json({ message: error.message }, { status: error.code })
  }

  return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
}
