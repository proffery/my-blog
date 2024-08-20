import { createSessionClient } from '@/server/config'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException } from 'node-appwrite'

export async function POST(request: NextRequest) {
  try {
    const { account } = await createSessionClient(request)
    const { name } = await request.json()

    await account.updateName(name)

    return NextResponse.json({ message: `Name updated successfully!` })
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
