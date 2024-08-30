import { createAuthClient } from '@/server/auth-config'
import { registration } from '@/server/functions/auth/registration'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'
import { ID } from 'node-appwrite'

export async function POST(request: NextRequest) {
  const { authInstance } = await createAuthClient()
  const { email, name, password } = await request.json()
  const id = ID.unique()

  try {
    await registration({ authInstance, email, id, name, password })

    return NextResponse.json({ message: 'Registration complete!' })
  } catch (error: unknown) {
    serverErrorHandler(error)
  }
}
