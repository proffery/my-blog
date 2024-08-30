import { createSessionClient } from '@/server/auth-config'
import { verifyEmail } from '@/server/functions/auth/verify-email'
import { serverErrorHandler } from '@/server/functions/server-errors-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { authInstance } = await createSessionClient(request)
  const { secret, userId } = await request.json()

  try {
    await verifyEmail({ authInstance, secret, userId })

    return NextResponse.json({ message: `Email confirmed!` })
  } catch (error: unknown) {
    serverErrorHandler(error)
  }
}
