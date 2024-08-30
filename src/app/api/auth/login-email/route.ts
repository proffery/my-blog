import { createAuthClient } from '@/server/auth-config'
import { loginEmail } from '@/server/functions/auth/login-email'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { authInstance } = await createAuthClient()
  const { email, password } = await request.json()

  try {
    await loginEmail({ authInstance, email, password })

    return NextResponse.json({ message: 'Sign-in successfully!' })
  } catch (error: unknown) {
    serverErrorHandler(error)
  }
}
