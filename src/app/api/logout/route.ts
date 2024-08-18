import { createSessionClient } from '@/server/config'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function DELETE(request: NextRequest) {
  const { account } = await createSessionClient(request)

  try {
    await account.deleteSession('current')

    return NextResponse.json({ message: 'Successfully logged out!' })
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }
  }
}
