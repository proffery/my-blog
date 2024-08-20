import { createAdminClient } from '@/server/config'
import { NextRequest, NextResponse } from 'next/server'
import { AppwriteException, ID } from 'node-appwrite'

export async function POST(request: NextRequest) {
  try {
    const { account } = await createAdminClient()
    const { email, name, password } = await request.json()

    await account.create(ID.unique(), email, password, name)

    return NextResponse.json({ message: 'Registration complete!' })
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.error(error)

      return NextResponse.json({ message: error.message }, { status: error.code })
    }

    return NextResponse.json({ message: 'An unknown error!' }, { status: 400 })
  }
}
