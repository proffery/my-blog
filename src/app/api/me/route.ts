import { createSessionClient } from '@/server/config'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function GET(request: NextRequest) {
  const { account } = await createSessionClient(request)

  try {
    const user = await account.get()

    return NextResponse.json({ user })
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }
  }
}
